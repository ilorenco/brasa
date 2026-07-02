import { addHours, differenceInMilliseconds, startOfHour } from 'date-fns';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export function useNow() {
    const [now, setNow] = useState(() => new Date());

    // Cobre a virada de dia/hora enquanto o app esteve em background.
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (appState) => {
            if (appState === 'active') setNow(new Date());
        });
        return () => subscription.remove();
    }, []);

    // Cobre o app aberto em foreground atravessando uma virada de hora (ex.: meia-noite).
    useEffect(() => {
        const nextHour = addHours(startOfHour(now), 1);
        const timer = setTimeout(() => setNow(new Date()), differenceInMilliseconds(nextHour, now));
        return () => clearTimeout(timer);
    }, [now]);

    return now;
}
