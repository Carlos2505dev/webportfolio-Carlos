const portfolio = [
    {
        id: 1,
        slug: 'meu-mana',
        image: '/images/portfolio/meumana_cover.webp',
        gallery: [
            { image: '/images/portfolio/meumana/biblia.webp', title: 'portfolio.projects.1.gallery.0' },
            { image: '/images/portfolio/meumana/dashboard.webp', title: 'portfolio.projects.1.gallery.1' },
            { image: '/images/portfolio/meumana/jejuns.webp', title: 'portfolio.projects.1.gallery.2' },
            { image: '/images/portfolio/meumana/menu.webp', title: 'portfolio.projects.1.gallery.3' }
        ],
        name: 'portfolio.projects.1.name',
        client: 'portfolio.projects.1.client',
        description: 'portfolio.projects.1.description',
        stacks: [
            { logo: 'devicon:react', name: 'React.js / React Native' },
            { logo: 'simple-icons:expo', name: 'Expo' },
            { logo: 'logos:supabase-icon', name: 'Supabase' },
            { logo: 'carlos-icon:postgresql', name: 'PostgreSQL' },
            { logo: 'carlos-icon:app-store-white', name: 'Apple Store' },
            { logo: 'carlos-icon:google-play', name: 'Play Store' },
            { logo: 'carlos-icon:revenuecat', name: 'RevenueCat' }
        ],
        tags: [
            'portfolio.tags.mobile_application',
            'portfolio.tags.ux_ui',
            'portfolio.tags.digital_bible',
            'portfolio.tags.christian'
        ],
        app_store_url: 'https://apps.apple.com/br/app/meu-man%C3%A1-sua-b%C3%ADblia-de-bolso/id6756574963',
        play_store_url: 'https://play.google.com/store/apps/details?id=com.inovetech.meumana&hl=pt'
    },
    {
        id: 2,
        slug: 'vector-learn',
        image: '/images/portfolio/vectorlearn_cover.webp',
        gallery: [
            { image: '/images/portfolio/vectorlearn/principal.webp', title: 'portfolio.projects.2.gallery.0' },
            { image: '/images/portfolio/vectorlearn/simulador.webp', title: 'portfolio.projects.2.gallery.1' },
            { image: '/images/portfolio/vectorlearn/aplicacoes.webp', title: 'portfolio.projects.2.gallery.2' },
            { image: '/images/portfolio/vectorlearn/operacoes.webp', title: 'portfolio.projects.2.gallery.3' }
        ],
        name: 'portfolio.projects.2.name',
        client: 'portfolio.projects.2.client',
        description: 'portfolio.projects.2.description',
        github_url: 'https://github.com/Carlos2505dev/Vector-Learn',
        stacks: [
            { logo: 'devicon:html5', name: 'HTML' },
            { logo: 'devicon:css3', name: 'CSS' },
            { logo: 'devicon:javascript', name: 'JavaScript' },
            { logo: 'devicon:react', name: 'React.js' },
            { logo: 'carlos-icon:vitejs', name: 'Vite' },
            { logo: 'devicon:tailwindcss', name: 'Tailwind CSS' },
            { logo: 'simple-icons:vercel', name: 'Vercel' }
        ],
        tags: [
            'portfolio.tags.ux_ui',
            'portfolio.tags.educational_platform',
            'portfolio.tags.e_learning',
            'portfolio.tags.web_application'
        ],
        live_url: 'https://vectorslearn.vercel.app/'
    },
    {
        id: 3,
        slug: 'enjoy-brasil',
        image: '/images/portfolio/enjoybrasil_cover.webp',
        gallery: [
            { image: '/images/portfolio/enjoybrasil/homepage.webp', title: 'portfolio.projects.3.gallery.0' },
            { image: '/images/portfolio/enjoybrasil/felicitometro.webp', title: 'portfolio.projects.3.gallery.1' },
            { image: '/images/portfolio/enjoybrasil/dica_do_dia.webp', title: 'portfolio.projects.3.gallery.2' },
            { image: '/images/portfolio/enjoybrasil/planejamento_de_viagem.webp', title: 'portfolio.projects.3.gallery.3' }
        ],
        name: 'portfolio.projects.3.name',
        client: 'portfolio.projects.3.client',
        description: 'portfolio.projects.3.description',
        stacks: [
            { logo: 'devicon:react', name: 'React.js / React Native' },
            { logo: 'simple-icons:expo', name: 'Expo' },
            { logo: 'logos:supabase-icon', name: 'Supabase' },
            { logo: 'carlos-icon:postgresql', name: 'PostgreSQL' },
            { logo: 'carlos-icon:app-store-white', name: 'Apple Store' },
            { logo: 'carlos-icon:google-play', name: 'Play Store' },
            { logo: 'carlos-icon:revenuecat', name: 'RevenueCat' }
        ],
        tags: [
            'portfolio.tags.ux_ui',
            'portfolio.tags.mobile_application',
            'portfolio.tags.tourism',
            'portfolio.tags.travel'
        ],
        app_store_url: 'https://apps.apple.com/br/app/enjoy-brasil/id6759268803',
        play_store_url: 'https://play.google.com/store/apps/details?id=com.inovetechh.enjoybrasil&hl=pt_BR'
    },
    {
        id: 4,
        slug: 'inovetech',
        image: '/images/portfolio/inovetech_lp_cover.webp',
        gallery: [
            { image: '/images/portfolio/inovetech/lp_desktop.webp', title: 'portfolio.projects.4.gallery.0' },
            { image: '/images/portfolio/inovetech/lp_mobile.webp', title: 'portfolio.projects.4.gallery.1' }
        ],
        name: 'portfolio.projects.4.name',
        client: 'portfolio.projects.4.client',
        description: 'portfolio.projects.4.description',
        stacks: [
            { logo: 'devicon:html5', name: 'HTML' },
            { logo: 'devicon:css3', name: 'CSS' },
            { logo: 'devicon:javascript', name: 'JavaScript' },
            { logo: 'devicon:react', name: 'React.js' },
            { logo: 'carlos-icon:vitejs', name: 'Vite' },
            { logo: 'devicon:tailwindcss', name: 'Tailwind CSS' },
            { logo: 'carlos-icon:antigravity', name: 'Antigravity' }
        ],
        tags: [
            'portfolio.tags.institutional_website',
            'portfolio.tags.ux_ui',
            'portfolio.tags.web_design',
            'portfolio.tags.landing_page'
        ],
        live_url: '#'
    },
    {
        id: 5,
        slug: 'dolce-amore',
        image: '/images/portfolio/dolceamore_card_cover.webp',
        gallery: [
            { image: '/images/portfolio/dolceamore/inicio.webp' },
            { image: '/images/portfolio/dolceamore/segunda.webp' },
            { image: '/images/portfolio/dolceamore/terceira.webp' },
            { image: '/images/portfolio/dolceamore/quarta.webp' },
            { image: '/images/portfolio/dolceamore/quinta.webp' }
        ],
        name: 'portfolio.projects.5.name',
        client: 'portfolio.projects.5.client',
        description: 'portfolio.projects.5.description',
        stacks: [
            { logo: 'devicon:canva', name: 'Canva' },
            { logo: 'carlos-icon:codex', name: 'ChatGPT' }
        ],
        tags: [
            'portfolio.tags.ux_ui',
            'portfolio.tags.menu_design',
            'portfolio.tags.branding',
            'portfolio.tags.cakes_and_sweets'
        ],
        live_url: '',
        github_url: '',
        download_url: '/Cardápio_Dolce Amore.pdf'
    },
    {
        id: 6,
        slug: 'gorango-admin',
        image: '/images/portfolio/mvpgorango_cover.webp',
        gallery: [
            { image: '/images/portfolio/gorango_mvp/visao_geral.webp', title: 'portfolio.projects.6.gallery.0' },
            { image: '/images/portfolio/gorango_mvp/pedidos.webp', title: 'portfolio.projects.6.gallery.1' },
            { image: '/images/portfolio/gorango_mvp/landing_page.webp', title: 'portfolio.projects.6.gallery.2' },
            { image: '/images/portfolio/gorango_mvp/docs.webp', title: 'portfolio.projects.6.gallery.3' },
            { image: '/images/portfolio/gorango_mvp/autenticacao.webp', title: 'portfolio.projects.6.gallery.4' }
        ],
        name: 'portfolio.projects.6.name',
        client: 'portfolio.projects.6.client',
        description: 'portfolio.projects.6.description',
        stacks: [
            { logo: 'devicon:html5', name: 'HTML' },
            { logo: 'devicon:css3', name: 'CSS' },
            { logo: 'devicon:javascript', name: 'JavaScript' },
            { logo: 'devicon:react', name: 'React.js' },
            { logo: 'carlos-icon:vitejs', name: 'Vite' },
            { logo: 'devicon:tailwindcss', name: 'Tailwind CSS' },
            { logo: 'carlos-icon:lovable', name: 'Lovable' }
        ],
        tags: [
            'portfolio.tags.ux_ui',
            'portfolio.tags.web_application',
            'portfolio.tags.mvp',
            'portfolio.tags.admin_panel',
            'portfolio.tags.dashboard'
        ]
    },
    {
        id: 7,
        slug: 'cre-2026',
        image: '/images/portfolio/cre_lp_cover.webp',
        gallery: [
            { image: '/images/portfolio/cre/hero_section-lp.webp', title: 'portfolio.projects.7.gallery.0' },
            { image: '/images/portfolio/cre/ministros_section-lp.webp', title: 'portfolio.projects.7.gallery.1' },
            { image: '/images/portfolio/cre/midia_section-participantes.webp', title: 'portfolio.projects.7.gallery.2' },
            { image: '/images/portfolio/cre/hashtag_section-participantes.webp', title: 'portfolio.projects.7.gallery.3' }
        ],
        name: 'portfolio.projects.7.name',
        client: 'portfolio.projects.7.client',
        description: 'portfolio.projects.7.description',
        github_url: '',
        multi_github: [
            { label: 'portfolio.projects.7.link.landing_page', url: 'https://github.com/Carlos2505dev/rios-do-espirito-lp', icon: 'ph:github-logo-bold' },
            { label: 'portfolio.projects.7.link.restricted_site', url: 'https://github.com/Carlos2505dev/rios-do-espirito-2026', icon: 'ph:github-logo-bold' }
        ],
        multi_live: [
            { label: 'portfolio.projects.7.link.landing_page', url: 'https://conferenciariosdoespirito.vercel.app/', icon: 'ph:globe-bold' },
            { label: 'portfolio.projects.7.link.restricted_site', url: 'https://cre2026.vercel.app/', icon: 'ph:lock-key-bold' }
        ],
        stacks: [
            { logo: 'devicon:html5', name: 'HTML' },
            { logo: 'devicon:css3', name: 'CSS' },
            { logo: 'devicon:javascript', name: 'JavaScript' },
            { logo: 'devicon:react', name: 'React.js' },
            { logo: 'carlos-icon:vitejs', name: 'Vite' },
            { logo: 'devicon:tailwindcss', name: 'Tailwind CSS' },
            { logo: 'simple-icons:vercel', name: 'Vercel' }
        ],
        tags: [
            'portfolio.tags.landing_page',
            'portfolio.tags.members_area',
            'portfolio.tags.web_application',
            'portfolio.tags.church'
        ],
        live_url: ''
    }
]

export default portfolio
