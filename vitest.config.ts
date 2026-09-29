import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    globals: true,
    // jsdom pra todos: os testes de lógica não usam DOM, mas separar ambientes
    // custava um aviso de deprecação a cada execução
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // percorrer as 35 perguntas na tela leva ~10s: cada resposta espera os
    // 240 ms de confirmação antes de a próxima aparecer
    testTimeout: 30000,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
