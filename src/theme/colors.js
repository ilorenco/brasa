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
    },

    // Slate (âncoras / elementos estruturais de destaque)
    slate: {
        DEFAULT: '#3D5A80',
        soft: '#E7ECF2',
    },

    danger: '#B23B3B', // ações destrutivas
};

module.exports = { colors };
