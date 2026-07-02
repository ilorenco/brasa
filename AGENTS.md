# Git workflow

- **Never commit without explicit permission.** Even when a commit was discussed, make the changes and stop — ask before running `git commit`. Wait for a clear go-ahead each time.

# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# Code style

- Write clean, minimal code. No dead code, no premature abstraction — solve the problem in front of you.
- Descriptive names: variables/functions say what they hold/do (`isLoading`, `fetchHabits`), no `data`, `temp`, `x`.
- Name the subject, not just the state/type. If the name leaves "…of what?" open, make it specific: `isActiveTab` not `isActive`, `tab` not `meta`, `fetchedHabits` not `result`.
- Event handlers are named `handle<Subject><Event>` (`handleTabPress`), even though the prop stays `on<Event>` (`onPress={handleTabPress}`).
- File names in **kebab-case** (`habit-card.tsx`, `mock-habits.ts`), even for components — the exported symbol stays PascalCase/camelCase.
- Code identifiers (functions, variables, components, types) in **English** (`TodayScreen`, `doneCount`). Only user-facing copy stays in Portuguese.
- Import internal modules via the `@/` alias (`@/components/bottom-tab-bar`), not relative `../../` paths. Configured in `tsconfig.json` (`@/*` → `./src/*`).
- Omit braces for single-statement `if`/`for`/`while` (`if (!tab) return null;`), not a 3-line braced block. Use braces only for blocks with multiple statements. Enforced (with autofix) by ESLint `curly: ['error', 'multi']`.
- Small, single-purpose functions and components. Extract when a block earns a name, not before.
- Once a hook or pure helper earns a name, it gets its own file — even with a single consumer: custom hooks in `src/hooks/` (`use-now.ts`), pure functions in `src/lib/` (`date-labels.ts`). Screens keep only state, handlers and JSX.
- Prefer declarative code: extract presentational pieces (e.g. a list-item component) so the parent reads as a mapping over data, not a wall of inline JSX + logic.
- Only name a function `use*` if it actually calls React hooks. Logic that just transforms its inputs stays a plain pure function — clearer intent and easier to test than a "fake hook".
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
