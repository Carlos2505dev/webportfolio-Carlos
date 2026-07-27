/**
 * Chatbot Service — single file, zero dependencies
 *
 * Carrega a base de conhecimento do about-me.md, encontra respostas
 * por palavras-chave e já deixa o esqueleto pronto para integrar
 * com a API do Groq quando você quiser.
 */

import aboutMeMd from '@/assets/knowledge/about-me.md?raw'

// ─── Utilitários ──────────────────────────────────────────

const normalize = (str) =>
  str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

// ─── Limpeza de texto (converte markdown seguro para HTML) ──
// Remove caracteres especiais, mas preserva negrito/itálico/links como HTML

function cleanMarkdown(text) {
  return text
    // **negrito** → <strong>negrito</strong>
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // *itálico* → <em>itálico</em>
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // [texto](url) → <a href="url">texto</a>
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // ### Título → Título
    .replace(/^#{1,6}\s+/gm, '')
    // --- (separadores)
    .replace(/^---+$/gm, '')
    // | tabelas | (remove linhas de tabela)
    .replace(/^\|.+\|$/gm, '')
    // Linhas que só têm :---  | ---:  etc
    .replace(/^[\s|:|-]+$/gm, '')
    // Múltiplas quebras de linha → no máximo duas
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// ─── Parsing do markdown ──────────────────────────────────

function parseSections(md) {
  const lines = md.split('\n')
  const sections = []
  let current = null
  let buffer = []

  for (const line of lines) {
    const m = line.match(/^##\s+(.+)/)
    if (m) {
      if (current) sections.push({ title: current, content: buffer.join('\n').trim() })
      current = m[1].trim()
      buffer = []
    } else if (current) {
      buffer.push(line)
    }
  }
  if (current) sections.push({ title: current, content: buffer.join('\n').trim() })
  return sections.filter(s => s.content.length > 0)
}

function extractKeywords(title, content) {
  const fromTitle = normalize(title).split(/\s+/).filter(w => w.length > 2)
  const fromContent = (content.match(/[A-Z][a-zà-ü]{2,}/g) || []).map(w => w.toLowerCase())
  return [...new Set([...fromTitle, ...fromContent])]
}

// ─── Mapeamento bilíngue ──────────────────────────────────

const TITLE_MAP = {
  'Informações Pessoais':        { pt: 'Sobre Mim',               en: 'About Me',              pri: 3 },
  'Filosofia de Trabalho':       { pt: 'Filosofia de Trabalho',   en: 'Work Philosophy',       pri: 2 },
  'Formação Acadêmica':          { pt: 'Formação Acadêmica',      en: 'Education',             pri: 3 },
  'Experiência Profissional':    { pt: 'Experiência Profissional', en: 'Experience',            pri: 3 },
  'Serviços Oferecidos':         { pt: 'Serviços',                 en: 'Services',              pri: 3 },
  'Projetos':                    { pt: 'Projetos',                 en: 'Projects',              pri: 3 },
  'Habilidades Técnicas':        { pt: 'Habilidades Técnicas',    en: 'Technical Skills',      pri: 3 },
  'Competências':                { pt: 'Competências',             en: 'Skills',                pri: 2 },
  'Diferenciais Competitivos':   { pt: 'Diferenciais',             en: 'Differential',          pri: 2 },
  'Cursos Realizados':           { pt: 'Cursos',                   en: 'Courses',               pri: 2 },
  'Idiomas':                     { pt: 'Idiomas',                  en: 'Languages',             pri: 2 },
  'Contato':                     { pt: 'Contato',                  en: 'Contact',               pri: 3 },
  'LinkedIn & Presença Digital': { pt: 'LinkedIn',                 en: 'LinkedIn',              pri: 2 },
}

// Keywords extras para melhorar o匹配
const EXTRA_KW = {
  'Informações Pessoais':        { pt: 'quem,voce,biografia,idade,salvador'.split(','),   en: 'who,you,bio,age,salvador'.split(',') },
  'Formação Acadêmica':          { pt: 'faculdade,universidade,curso,engenharia,unijorge'.split(','), en: 'college,university,degree,engineering'.split(',') },
  'Experiência Profissional':    { pt: 'trabalho,empresa,carreira,inovetech,freelance'.split(','), en: 'work,company,job,freelance,inovetech'.split(',') },
  'Projetos':                    { pt: 'portfolio,aplicativo,site,meu mana,enjoy brasil'.split(','), en: 'portfolio,app,website,meu mana,enjoy brasil'.split(',') },
  'Habilidades Técnicas':        { pt: 'stack,ferramenta,linguagem,framework,programacao'.split(','), en: 'stack,tool,language,framework,programming'.split(',') },
  'Contato':                     { pt: 'email,telefone,whatsapp,linkedin,github'.split(','),         en: 'email,phone,whatsapp,linkedin,github'.split(',') },
  'Serviços Oferecidos':         { pt: 'oferece,contratar,design,grafico,aplicativo,mobile'.split(','), en: 'offer,hire,design,graphic,app,mobile'.split(',') },
}

function buildKnowledge() {
  const raw = parseSections(aboutMeMd)
  const pt = [], en = []

  for (const s of raw) {
    const map = TITLE_MAP[s.title]
    if (!map) continue

    const clean = cleanMarkdown(s.content)
    if (!clean) continue

    const ekw = EXTRA_KW[s.title] || { pt: [], en: [] }

    pt.push({
      keywords: [...new Set([...extractKeywords(map.pt, s.content), ...ekw.pt])],
      title: map.pt,
      content: clean,
      priority: map.pri,
    })

    en.push({
      keywords: [...new Set([...extractKeywords(map.en, s.content), ...ekw.en])],
      title: map.en,
      content: clean,
      priority: map.pri,
    })
  }

  return { pt, en }
}

const KNOWLEDGE = buildKnowledge()

// ─── Matching ─────────────────────────────────────────────

function findBest(question, sections) {
  const words = normalize(question).split(/\s+/).filter(w => w.length > 2)
  let best = null, bestScore = 0

  for (const sec of sections) {
    let score = 0
    for (const w of words) {
      for (const kw of sec.keywords) {
        const nkw = normalize(kw)
        if (nkw.includes(w) || w.includes(nkw)) score += sec.priority
      }
    }
    if (score > bestScore) { bestScore = score; best = sec }
  }
  return bestScore >= 2 ? best : null
}

// ─── Mensagens fixas ─────────────────────────────────────

const FALLBACK = {
  pt: {
    noInfo:    'Ainda não preenchi essa informação. Tente perguntar de outra forma ou entre em contato!',
    notFound:  'Não entendi sua pergunta. Tente perguntar sobre: quem sou, formação, experiência, habilidades, projetos ou contato.',
  },
  en: {
    noInfo:    "I haven't filled this info yet. Try asking differently or reach out!",
    notFound:  "I didn't understand. Try asking about: who I am, education, experience, skills, projects, or contact.",
  },
}

const SUGGESTED = {
  pt: ['Quem é você?', 'Quais tecnologias você domina?', 'Qual sua experiência?', 'Como entro em contato?', 'O que você já desenvolveu?', 'Quais serviços oferece?'],
  en: ['Who are you?', 'What technologies?', 'What is your experience?', 'How to contact?', 'What have you built?', 'What services?'],
}

const GREETINGS = {
  pt: [
    'Olá! Sou o assistente virtual do Carlos. Pergunte sobre a carreira, habilidades e projetos dele!',
    'Oi! Pode perguntar sobre formação, experiência, tecnologias que ele usa…',
  ],
  en: [
    'Hello! I\'m Carlos\' virtual assistant. Ask about his career, skills, and projects!',
    'Hi! Ask about his education, experience, tech stack…',
  ],
}

// ─── API pública ──────────────────────────────────────────

function getAnswer(question, lang = 'pt') {
  const data = KNOWLEDGE[lang] || KNOWLEDGE.pt
  const fb = FALLBACK[lang] || FALLBACK.pt
  const match = findBest(question, data)

  if (!match) return { found: false, title: null, content: `${fb.notFound}` }
  if (!match.content) return { found: true, title: match.title, content: fb.noInfo }

  return { found: true, title: match.title, content: match.content }
}

/**
 * Tenta usar a API do Groq (precisa de um backend).
 * Enquanto não houver backend, cai no fallback local.
 *
 * Para ativar: descomente as linhas abaixo e aponte para seu endpoint.
 */
async function getAnswerWithAI(question, lang = 'pt') {
  // ── Descomente quando tiver o backend Groq pronto ──
  //
  // try {
  //   const res = await fetch('https://seu-endpoint-groq.com/chat', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ question, lang }),
  //   })
  //   if (res.ok) {
  //     const data = await res.json()
  //     return { found: true, title: null, content: data.content }
  //   }
  // } catch (_) { /* fallback */ }

  return getAnswer(question, lang)
}

function getSuggestedQuestions(lang = 'pt') { return SUGGESTED[lang] || SUGGESTED.pt }
function getGreeting(lang = 'pt') { return pick(GREETINGS[lang] || GREETINGS.pt) }

export const chatbotService = { getAnswer, getAnswerWithAI, getSuggestedQuestions, getGreeting }
