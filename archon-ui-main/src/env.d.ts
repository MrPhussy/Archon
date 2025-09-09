/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_ARCHON_SERVER_PORT?: string
  readonly VITE_ALLOWED_HOSTS?: string
  readonly VITE_SHOW_DEVTOOLS?: string
  readonly VITE_MCP_API_URL?: string // Added this line for the new MCP API URL
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
