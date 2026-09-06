import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    preview: {
        allowedHosts: [
            "threew-social-app-1-179c.onrender.com"
        ]
    }
});