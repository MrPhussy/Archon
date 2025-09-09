import { API_FULL_URL, MCP_FULL_URL } from '../../../config/api';
import { callAPIWithETag } from "../../projects/shared/apiWithEtag";
import type {
  McpServerStatus,
  McpServerConfig,
  McpSessionInfo,
  McpClient
} from "../types";

export const mcpApi = {
  async getStatus(): Promise<McpServerStatus> {
    try {
      const response =
        await callAPIWithETag<McpServerStatus>(`${MCP_FULL_URL}/mcp/status`);
      return response;
    } catch (error) {
      console.error("Failed to get MCP status:", error);
      throw error;
    }
  },

  async getConfig(): Promise<McpServerConfig> {
    try {
      const response =
        await callAPIWithETag<McpServerConfig>(`${MCP_FULL_URL}/mcp/config`);
      return response;
    } catch (error) {
      console.error("Failed to get MCP config:", error);
      throw error;
    }
  },

  async getSessionInfo(): Promise<McpSessionInfo> {
    try {
      const response =
        await callAPIWithETag<McpSessionInfo>(`${MCP_FULL_URL}/mcp/sessions`);
      return response;
    } catch (error) {
      console.error("Failed to get session info:", error);
      throw error;
    }
  },

  async getClients(): Promise<McpClient[]> {
    try {
      const response = await callAPIWithETag<{ clients: McpClient[] }>(
        `${MCP_FULL_URL}/mcp/clients`,
      );
      return response.clients || [];
    } catch (error) {
      console.error("Failed to get MCP clients:", error);
      throw error;
    }
  },
};
