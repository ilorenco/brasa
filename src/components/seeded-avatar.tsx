import { useMemo } from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { avatarSvg } from '@/lib/avatar-svg';

type SeededAvatarProps = {
    seed: string;
    size: number;
};

export function SeededAvatar({ seed, size }: SeededAvatarProps) {
    const svgMarkup = useMemo(() => avatarSvg(seed), [seed]);

    // O corte circular é feito no layout: o <mask> de raio gerado pelo
    // DiceBear não renderiza de forma confiável no react-native-svg.
    return (
        <View style={{ width: size, height: size }} className="overflow-hidden rounded-full">
            <SvgXml xml={svgMarkup} width={size} height={size} />
        </View>
    );
}
