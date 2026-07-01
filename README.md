# brasa

App em [React Native](https://reactnative.dev) + [Expo](https://expo.dev) (SDK 57) com roteamento por arquivos via [Expo Router](https://docs.expo.dev/router/introduction).

## Começando

1. Instalar dependências

    ```bash
    npm install
    ```

2. Rodar o app

    ```bash
    npm start
    ```

    No terminal, escolha onde abrir: emulador Android, simulador iOS, navegador (`w`) ou [Expo Go](https://expo.dev/go) no celular (via QR code).

## Estrutura

- `src/app/` — **rotas** (telas e layouts). Roteamento por arquivo, como o App Router do Next.js.
- `src/` — todo o resto: componentes, hooks, libs, utils, etc.
- `assets/` — ícone do app, splash e favicon (referenciados em `app.json`).

Aliases de import já configurados no `tsconfig.json`: `@/*` → `src/*` e `@/assets/*` → `assets/*`.

## Scripts

| Comando           | O que faz                            |
| ----------------- | ------------------------------------ |
| `npm start`       | Inicia o servidor de desenvolvimento |
| `npm run android` | Abre no emulador Android             |
| `npm run ios`     | Abre no simulador iOS                |
| `npm run web`     | Abre no navegador                    |
| `npm run lint`    | Roda o ESLint                        |

## Documentação

Este projeto usa o **Expo SDK 57**. Consulte sempre a doc da versão: <https://docs.expo.dev/versions/v57.0.0/>.
