# Archon Render Deployment Guide

This guide will help you deploy Archon to Render.com for cloud hosting, enabling you to use the RAG search within your AI voice agent applications.

## Prerequisites

- Render account
- GitHub account (for connecting your repository to Render)
- Supabase project (you should already have this configured from your local setup)

## Deployment Steps

### 1. Create Services on Render

You'll need to create four separate services on Render, one for each component of Archon.

#### 1.1 Create Web Service for archon-server

1. Go to [Render Dashboard](https://dashboard.render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your Archon repository (fork this repo if you haven't already)
4. Service Name: `archon-server`
5. Region: Select your preferred region (e.g., Oregon)
6. Branch: main (or your preferred branch)
7. Runtime: Docker
8. Dockerfile Path: `python/Dockerfile.server`
9. Advanced Settings:
   - Auto Deploy: Enable
   - Health Check Path: `/health`
   - Environment Variables:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_SERVICE_KEY`: Your Supabase service role key
     - `HOST`: `0.0.0.0`
     - `ARCHON_SERVER_PORT`: `8181`
     - `ARCHON_MCP_PORT`: `8051`
     - `ARCHON_AGENTS_PORT`: `8052`
     - `LOG_LEVEL`: `INFO`

#### 1.2 Create Web Service for archon-mcp

1. Click "New +" and select "Web Service"
2. Connect your Archon repository
3. Service Name: `archon-mcp`
4. Region: Same as archon-server
5. Branch: main
6. Runtime: Docker
7. Dockerfile Path: `python/Dockerfile.mcp`
8. Advanced Settings:
   - Auto Deploy: Enable
   - Health Check Path: `/health` (if available)
   - Environment Variables:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_SERVICE_KEY`: Your Supabase service role key
     - `HOST`: `0.0.0.0`
     - `ARCHON_MCP_PORT`: `8051`
     - `ARCHON_SERVER_PORT`: `8181`
     - `ARCHON_AGENTS_PORT`: `8052`
     - `TRANSPORT`: `sse`
     - `API_SERVICE_URL`: Use the URL provided by Render for archon-server service
     - `AGENTS_SERVICE_URL`: Use the URL provided by Render for archon-agents service
     - `LOG_LEVEL`: `INFO`

#### 1.3 Create Web Service for archon-agents

1. Click "New +" and select "Web Service"
2. Connect your Archon repository
3. Service Name: `archon-agents`
4. Region: Same as archon-server
5. Branch: main
6. Runtime: Docker
7. Dockerfile Path: `python/Dockerfile.agents`
8. Advanced Settings:
   - Auto Deploy: Enable
   - Health Check Path: `/health`
   - Environment Variables:
     - `SUPABASE_URL`: Your Supabase project URL
     - `SUPABASE_SERVICE_KEY`: Your Supabase service role key
     - `HOST`: `0.0.0.0`
     - `ARCHON_AGENTS_PORT`: `8052`
     - `LOG_LEVEL`: `INFO`

#### 1.4 Create Web Service for archon-frontend

1. Click "New +" and select "Web Service"
2. Connect your Archon repository
3. Service Name: `archon-frontend`
4. Region: Same as archon-server
5. Branch: main
6. Runtime: Docker
7. Dockerfile Path: `archon-ui-main/Dockerfile`
8. Advanced Settings:
   - Auto Deploy: Enable
   - Environment Variables:
     - `HOST`: `0.0.0.0`
     - `ARCHON_UI_PORT`: `3737`
     - `VITE_API_URL`: Use the URL provided by Render for archon-server service
     - `VITE_ARCHON_SERVER_PORT`: `8181`
     - `ARCHON_SERVER_PORT`: `8181`

### 2. Set Up Service Dependencies

Render doesn't have built-in service dependencies like Railway, so you'll need to:

1. Deploy services in order: archon-server, archon-agents, archon-mcp, archon-frontend
2. After deploying archon-server and archon-agents, update the environment variables in archon-mcp with their URLs
3. After deploying archon-server, update the environment variables in archon-frontend with its URL

### 3. Deploy

1. Deploy each service in the order mentioned above
2. Wait for each service to build and deploy successfully before moving to the next
3. Render will provide URLs for each service

### 4. Access Your Deployed Archon

Once deployed, you can access:
- **UI**: https://archon-frontend-xxxx.onrender.com (port 3737)
- **API**: https://archon-server-xxxx.onrender.com (port 8181)
- **MCP**: https://archon-mcp-xxxx.onrender.com (port 8051)
- **Agents**: https://archon-agents-xxxx.onrender.com (port 8052)

### 5. Configure API Keys

After deployment, access the UI and go to the Settings page to configure:
- OPENAI_API_KEY (if you want to use OpenAI models)
- Other model choices and RAG strategy flags

## Using RAG Search in Your AI Voice Agent

Once deployed, your AI voice agent can access the RAG search functionality through the Archon API endpoints. The base URL for API calls will be:

```
https://archon-server-xxxx.onrender.com
```

You can make HTTP requests to the RAG endpoints documented in the API documentation.

## Troubleshooting

If you encounter issues:
1. Check the logs in Render's dashboard for each service
2. Verify all environment variables are correctly set
3. Ensure your Supabase project is accessible from Render (check network settings in Supabase)
4. Make sure you're using the service role key, not the anon key, for Supabase
5. Check service dependencies - ensure URLs are correctly set between services

## Updating Your Deployment

To update your deployment:
1. Push changes to your GitHub repository
2. Render will automatically redeploy (if auto-deploy is enabled)
3. Or manually trigger a redeploy in Render's dashboard

## Scaling

Render allows you to scale resources for each service independently. Monitor your usage and adjust resources as needed.
