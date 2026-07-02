import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateLabel(date: Date) {
    return format(date, 'EEEEEE · d MMM', { locale: ptBR });
}

export function getGreeting(hour: number) {
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
}
