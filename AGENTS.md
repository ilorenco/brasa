# Product context

Brasa is a habit-building app grounded in **"The Power of Habit" (Charles Duhigg)** and the research the book draws on — BJ Fogg (Tiny Habits), Self-Determination Theory, Wendy Wood (Good Habits, Bad Habits). Product and UX decisions should map back to that framework:

- **Habit loop (cue → routine → reward):** the anchor ("depois de tomar meu café") is the cue, the minimal habit ("ler 1 página") is the routine, and the immediate reward moment closes the loop. Never ship a check-in flow without its reward.
- **Forgiving model:** constancy heat cools gradually on missed days instead of resetting — a miss must never read as punishment (no broken streaks, no zeroed grids).
- **Visual concept — "campo frio, calor que se acumula":** the interface is a calm, cool space; daily effort is what brings amber warmth into it.
- The 9 MVP screens (each tagged with its functional requirement) are specced in `esboco-telas-completo.html` — treat it as the design source of truth.

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
- Once a hook or pure helper earns a name, it gets its own file — even with a single consumer: custom hooks in `src/hooks/` (`use-now.ts`), pure functions in `src/lib/` (`date-labels.ts`), React contexts (provider + consumer hook together) in `src/contexts/` (`habits-context.tsx`). Screens keep only state, handlers and JSX.
- Domain types in `src/types/` (`habit.ts`); mock data + seed generators in `src/mocks/` — that folder is disposable, so permanent code must only import it at the data entry point (`habits-context`), never from components or `src/lib/`.
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
- Forms: **react-hook-form + zod** (`zodResolver` from `@hookform/resolvers/zod`), fields wired via `Controller`. Zod schemas live in `src/lib/` (`habit-form-schema.ts`), value types derived with `z.infer`. No hand-rolled `useState` forms.
- Component style variants: **cva** (class-variance-authority) — declare variants in a `cva()` map (registered in `tailwindFunctions` so Prettier sorts the classes), derive prop types with `VariantProps`. No conditional className concatenation.
- Native UI/effects: `@expo/ui`, `expo-symbols`, `expo-glass-effect` when they fit the design.
- Avatars: **DiceBear** (`@dicebear/core` + `@dicebear/collection`) rendered via `SvgXml` (react-native-svg) — generated locally from a seed, no photo upload or personal images (privacy by design / LGPD). Brand palette + style live in `src/lib/avatar-svg.ts`.
- Modern JS/TS: `async/await` over `.then()` chains, optional chaining `?.`, nullish coalescing `??`, destructuring.
- Respect safe areas via `react-native-safe-area-context`.
- Code must pass `expo lint` + Prettier (enforced by lint-staged/husky) — don't fight the formatter.
