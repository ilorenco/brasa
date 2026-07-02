import { Ionicons } from '@expo/vector-icons';
import { cssInterop } from 'nativewind';

// Registra componentes de terceiros para aceitarem className do Tailwind.
// Importado uma vez no layout raiz, antes de qualquer render.

// Ícones: mapeia a cor resolvida (ex.: text-warm-3) para a prop `color`.
cssInterop(Ionicons, {
    className: { target: 'style', nativeStyleToProp: { color: true } },
});
