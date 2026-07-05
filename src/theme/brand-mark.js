// Desenho da marca — fonte única de verdade do brandmark (tela 06 do esboço):
// grade 5×3 onde cada número é um nível da rampa de constância. Consumido pelo
// componente (brand-mark.tsx) e pela geração do SVG (scripts/generate-brand-mark-svg.js).
/** @type {import('@/types/habit').HeatLevel[]} */
const emberLevels = [0, 2, 3, 0, 2, 2, 4, 3, 2, 0, 3, 2, 4, 3, 2];

module.exports = { emberLevels };
