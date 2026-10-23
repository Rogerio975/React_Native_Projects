# VIVA FIT

Aplicativo mobile demonstrativo para academia, desenvolvido com Expo, React Native e Expo Router. A interface está em português e funciona em Android, iOS e web.

## Funcionalidades

- Painel inicial com treino do dia, frequência e indicadores.
- Ficha de treino com marcação de exercícios concluídos.
- Agenda de aulas com seleção de dia e reservas demonstrativas.
- Consulta, busca, filtro e cadastro local de alunos.
- Visualização e seleção demonstrativa de planos.

Os dados desta versão são de exemplo e existem apenas em memória; eles são reiniciados ao fechar ou recarregar o aplicativo. Não há autenticação, persistência, pagamentos ou integração com uma API nesta etapa.

## Executar

```bash
npm install
npx expo start
```

Use `a` para abrir no emulador Android, `i` no simulador iOS ou `w` para iniciar a versão web.

## Verificar

```bash
npx tsc --noEmit
npx expo export --platform web
```

Os arquivos da aplicação também podem ser verificados com ESLint. O comando `npx expo lint` depende da compatibilidade da versão do ESLint instalada com a CLI do Expo; no template atual, use `npx eslint src --max-warnings=0`.
