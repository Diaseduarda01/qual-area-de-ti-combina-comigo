# Análise

Scripts que medem propriedades da matriz que os testes não pegam — os testes
dizem se a lógica está certa, estes dizem se ela é **justa**.

```
npx vite-node analise/vies.ts     # viés estrutural entre as 13 áreas
npx vite-node analise/perfis.ts   # distribuição de perfis e áreas em 4000 respondentes
npx vite-node analise/pontes.ts   # quanto a ponte de transição cai no texto genérico
npx vite-node analise/escala.ts   # perguntas que não encaixam na escala
npx vite-node analise/tabela.ts   # regenera as tabelas do documento
```

Importam os dados reais de `src/data/`, então nunca ficam desatualizados em
relação ao quiz. Rode depois de mexer em peso ou adicionar pergunta.
