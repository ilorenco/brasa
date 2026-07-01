# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# Code style

- Write clean, minimal code. No dead code, no premature abstraction — solve the problem in front of you.
- Descriptive names: variables/functions say what they hold/do (`isLoading`, `fetchHabits`), no `data`, `temp`, `x`.
- Small, single-purpose functions and components. Extract when a block earns a name, not before.
- Match the surrounding code's style, naming and patterns before introducing new ones.
- Comments explain _why_, not _what_. Prefer self-explanatory code over comments.

# React Native + Expo conventions

- Function components + hooks only. No class components.
- TypeScript everywhere; type props explicitly, avoid `any`.
- Styling via NativeWind (Tailwind classes), consistent with the existing design system (cores/fontes).
- Use Expo SDK APIs and modules over bare React Native / third-party libs when an equivalent exists.
- Follow the Expo v57 docs (already referenced above) — don't rely on outdated APIs.

# Modern stack (use these, not the old way)

- Routing: **Expo Router** (file-based, `app/` dir). No manual React Navigation setup.
- React 19: use the modern APIs (Suspense, `use`, Actions) where they fit; no legacy lifecycle patterns.
- Animations: **Reanimated 4** + `react-native-worklets`. Prefer Reanimated over the Animated API.
- Gestures: `react-native-gesture-handler`, not the legacy PanResponder.
- Images: **expo-image** (`Image` from `expo-image`), not RN's `Image`.
- Native UI/effects: `@expo/ui`, `expo-symbols`, `expo-glass-effect` when they fit the design.
- Modern JS/TS: `async/await` over `.then()` chains, optional chaining `?.`, nullish coalescing `??`, destructuring.
- Respect safe areas via `react-native-safe-area-context`.
- Code must pass `expo lint` + Prettier (enforced by lint-staged/husky) — don't fight the formatter.
