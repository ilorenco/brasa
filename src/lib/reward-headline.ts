// Celebra o check-in (RF05) — fecha o loop com um reforço imediato. Marcos de
// constância ganham uma frase própria; os demais dias rotacionam por um pool de
// afagos — determinístico pela constância, então varia dia a dia sem sortear.
const milestoneHeadlines: Record<number, string> = {
    1: 'O primeiro dia.',
    7: 'Uma semana inteira.',
    21: 'Três semanas de brasa.',
    30: 'Um mês mantido.',
    60: 'Dois meses. Você mudou.',
    100: 'Cem dias. Isso é quem você é.',
};

const rotatingHeadlines = [
    'Você voltou.',
    'Feito de novo.',
    'O campo esquenta.',
    'Você apareceu.',
    'Isso conta.',
    'Nem foi difícil.',
    'Mais uma brasa.',
    'O calor fica.',
    'Segue aceso.',
    'Pequeno, de novo.',
    'Fica mais fácil.',
    'Você se manteve.',
    'Você escolheu.',
    'Do seu jeito.',
    'Não esfriou.',
    'Mais quente.',
    'Aquece devagar.',
    'Você cuidou.',
    'Segue de pé.',
    'Mais um dia seu.',
];

export function rewardHeadline(constancyDays: number): string {
    return (
        milestoneHeadlines[constancyDays] ??
        rotatingHeadlines[constancyDays % rotatingHeadlines.length]
    );
}
