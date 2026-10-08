import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({ base: "/qr-code-studio/", build: { sourcemap: false }, plugins: [react()] });
