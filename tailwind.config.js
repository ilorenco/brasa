const { colors } = require('./src/theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors,
            fontFamily: {
                // Display — Bricolage Grotesque (títulos)
                display: ['BricolageGrotesque_800ExtraBold'],
                'display-semibold': ['BricolageGrotesque_600SemiBold'],
                'display-regular': ['BricolageGrotesque_400Regular'],

                // Interface — Inter (corpo / UI)
                body: ['Inter_400Regular'],
                'body-medium': ['Inter_500Medium'],
                'body-semibold': ['Inter_600SemiBold'],

                // Dados — JetBrains Mono (números / labels técnicos)
                mono: ['JetBrainsMono_400Regular'],
                'mono-medium': ['JetBrainsMono_500Medium'],
                'mono-bold': ['JetBrainsMono_700Bold'],
            },
        },
    },
    plugins: [],
};
