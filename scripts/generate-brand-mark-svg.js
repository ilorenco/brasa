// Gera assets/brand/brasa-mark.svg a partir do desenho (src/theme/brand-mark.js)
// e da paleta (src/theme/colors.js). Rode com: npm run generate:brand
const { writeFileSync } = require('node:fs');
const { join } = require('node:path');

const { emberLevels } = require('../src/theme/brand-mark');
const { colors } = require('../src/theme/colors');

// Geometria do esboço (tela 06): célula 10, gap 4, raio 3.
const COLUMNS = 5;
const CELL_SIZE = 10;
const CELL_GAP = 4;
const CELL_RADIUS = 3;

const rectMarkup = emberLevels
    .map((emberLevel, cellIndex) => {
        const x = (cellIndex % COLUMNS) * (CELL_SIZE + CELL_GAP);
        const y = Math.floor(cellIndex / COLUMNS) * (CELL_SIZE + CELL_GAP);
        const fill = colors.warm[emberLevel];
        return `    <rect x="${x}" y="${y}" width="${CELL_SIZE}" height="${CELL_SIZE}" rx="${CELL_RADIUS}" fill="${fill}" />`;
    })
    .join('\n');

const rowCount = Math.ceil(emberLevels.length / COLUMNS);
const markWidth = COLUMNS * CELL_SIZE + (COLUMNS - 1) * CELL_GAP;
const markHeight = rowCount * CELL_SIZE + (rowCount - 1) * CELL_GAP;

const svgMarkup = `<!-- Gerado por scripts/generate-brand-mark-svg.js a partir de src/theme/brand-mark.js —
     não edite à mão: mude o desenho lá e rode \`npm run generate:brand\`. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${markWidth} ${markHeight}">
${rectMarkup}
</svg>
`;

const svgPath = join(__dirname, '..', 'assets', 'brand', 'brasa-mark.svg');
writeFileSync(svgPath, svgMarkup);
console.log(`wrote ${svgPath}`);
