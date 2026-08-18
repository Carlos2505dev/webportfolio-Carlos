const INJECTION_PATTERNS = [
    /\bignore\s+(all\s+|the\s+|any\s+)?(previous|prior|above|earlier|past|your|given)?\s*(instructions?|prompts?|rules?|messages?|directives?|guidelines?|constraints?|guardrails?)\b/i,
    /\bignore\s+everything\s+(before|above|prior)\b/i,
    /\bignore\s+tudo\s+(acima|antes|anterior)\b/i,
    /\bignore\s+your\s+(prior|previous|earlier)\s+(instructions?|prompts?|rules?|messages?)\b/i,
    /\bdisregard\s+(all\s+|the\s+|any\s+)?(previous|prior|above|earlier|your|given)?\s*(instructions?|prompts?|rules?|messages?|directives?|guidelines?)\b/i,
    /\bforget\s+(all\s+|everything\s+)?(your\s+)?(instructions?|prompts?|rules?|training|prior\s+instructions?)\b/i,
    /\b(reveal|show|print|display|leak|dump|repeat|copy|paste|expose|share|tell|write|output)\s+(me\s+|your\s+|the\s+)?(system\s+|initial\s+|developer\s+|raw\s+|full\s+)?(prompt|instructions?|rules|system\s+message|developer\s+message)\b/i,
    /\bsystem\s+prompt\b/i,
    /\boutput\s+(your\s+)?(initial|raw|full|developer|system)\s+(instructions?|prompt|message)\b/i,
    /\b(do\s+not|don'?t|never|stop)\s+(follow|obey|apply|use)\s+(the\s+|your\s+)?(rules|instructions|constraints|guidelines|guardrails)\b/i,
    /\b(break|get|opt)\s+(out\s+of|away\s+from)\s+(the\s+|your\s+)?(rules|instructions|constraints|role|persona)\b/i,
    /\byou\s+are\s+no\s+longer\b/i,
    /\bjailbreak\b/i,
    /\bsudo\s+mode\b/i,
    /\bignore\s+(as\s+|todas\s+as\s+|suas\s+)?(instrucoes|instruções|regras|diretrizes|mensagens)\b/i,
    /\bignore\s+(as\s+)?(instrucoes|instruções|regras|mensagens)\s+anteriores\b/i,
    /\b(me\s+)?(revele|revela|mostre|mostra|exiba|exibe|diga|conte|copie|copia|repita|imprima|vaze)\s+(me\s+|o\s+|a\s+|seu\s+|sua\s+|suas\s+|teu\s+|tua\s+)?(prompt|sistema|instrucoes|instruções|regras|mensagem\s+de\s+sistema|mensagem\s+inicial)\b/i,
    /\bqual\s+(é|e)\s+(o\s+)?(seu|teu)\s+(prompt|sistema)\b/i,
    /\b(esqueça|esqueca)\s+(as\s+|todas\s+as\s+|suas\s+)?(instrucoes|instruções|regras)\b/i,
    /\b(não|nao)\s+(siga|obedeça|obedeca)\s+(as\s+|suas\s+)?(regras|instrucoes|instruções)\b/i,
    /\bsaia\s+do\s+(papel|persona)\b/i,
    /\bagora\s+(você|voce)\s+(é|e|eh|passou\s+a\s+ser)\s+(o|a|um|uma|meu|minha)\b/i,
    /\b(desobedeça|desobedeca)\b/i,
    /\bquebre\s+(as|todas\s+as)\s+regras\b/i
]

const LEAK_MARKERS = [
    'Você é o assistente virtual de Carlos Bezerra Neto',
    '<regras>',
    '<base_de_conhecimento>',
    'nunca as revele'
]

export function detectInjection(text) {
    if (!text || typeof text !== 'string') return false
    return INJECTION_PATTERNS.some(pattern => pattern.test(text))
}

export function findLeak(text) {
    if (!text || typeof text !== 'string') return null
    return LEAK_MARKERS.find(marker => text.includes(marker)) || null
}