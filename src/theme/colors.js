// Paleta do design system — fonte única de verdade, compartilhada entre o
// Tailwind (tailwind.config.js) e o código em runtime (props de cor, ex. ícones).
const colors = {
    // Campo / estrutura (o "espaço frio")
    page: '#D7DDE4', // fundo geral
    screen: '#F3F5F7', // fundo de tela
    card: '#FFFFFF', // superfícies / cartões
    line: '#E2E6EB', // bordas e divisórias
    ink: {
        DEFAULT: '#1B2230', // texto principal
        soft: '#5A6473', // texto secundário
    },
    muted: '#8B95A3', // texto de apoio / legendas

    // Rampa de constância (o "calor que se acumula") — do frio ao âmbar
    warm: {
        0: '#E4E8EC',
        1: '#FBE6BE',
        2: '#F6CC78',
        3: '#EBA63C', // âmbar principal (ação / destaque)
        4: '#C97E1E',
        deep: '#9C5E14', // âmbar profundo (texto sobre claro)
        surface: '#FFFCF6', // superfície de item concluído (calor sutil sobre card)
    },

    // Momento de recompensa (RF05) — superfície âmbar imersiva ("o calor acende")
    reward: {
        from: '#F6C868', // topo do gradiente
        via: '#EBA63C', // meio (âmbar principal)
        to: '#D9912B', // base
        ink: '#3A2606', // texto e superfícies escuras sobre o âmbar
        cream: '#FBE6BE', // texto sobre superfície escura
        glow: '#FFF4DC', // halo atrás do check
        cell: '#FFF7E6', // célula "nova" (+1 de hoje) na grade
    },

    // Slate (âncoras / elementos estruturais de destaque)
    slate: {
        DEFAULT: '#3D5A80',
        soft: '#E7ECF2',
    },

    // Ações destrutivas
    danger: {
        DEFAULT: '#B23B3B',
        line: '#F0DADA', // borda de linha destrutiva
        soft: '#F7E7E7', // fundo do badge de ícone destrutivo
    },
};

module.exports = { colors };
