import { createAvatar } from '@dicebear/core';
import * as thumbs from '@dicebear/thumbs';

import { colors } from '@/theme/colors';

// DiceBear recebe hex sem '#'.
const asDicebearHex = (color: string) => color.replace('#', '');

// Cores fixas (âmbar + slate): a variedade entre avatares vem só das
// feições sorteadas pela seed.
const backgroundPalette = [asDicebearHex(colors.warm[3])];
const shapePalette = [asDicebearHex(colors.slate.DEFAULT)];

// Opções fixas do picker — sempre as mesmas seis, determinísticas por seed.
export const AVATAR_SEEDS = [
    'brasa-av-1',
    'brasa-av-2',
    'brasa-av-3',
    'brasa-av-4',
    'brasa-av-5',
    'brasa-av-6',
];

export function avatarSvg(seed: string): string {
    const avatar = createAvatar(thumbs, {
        seed,
        backgroundColor: backgroundPalette,
        shapeColor: shapePalette,
    });
    // O bloco <metadata> (licença) não é renderizável pelo react-native-svg.
    return avatar.toString().replace(/<metadata.*?<\/metadata>/s, '');
}
