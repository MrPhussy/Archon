# Archon Railway Deployment Guide

This guide will help you deploy Archon to Railway.com for cloud hosting, enabling you to use the RAG search within your AI voice agent applications.

## Prerequisites

- Railway account (you mentioned you already have one)
- GitHub account (for connecting your repository to Railway)
- Supabase project (you should already have this configured from your local setup)

## Deployment Steps

### 1. Create a New Railway Project

1. Go to [Railway.app](https://railway.app) and sign in
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Connect your Archon repository (fork this repo if you haven't already)
5. IMPORTANT: When prompted to select a service, choose "Multi-service project" or similar option (Railway should detect the railway.json file automatically)

### 2. Configure Services

Railway will automatically detect the `railway.json` file and create four services with their specific Dockerfiles:
- **archon-server**: Uses `python/Dockerfile.server`
- **archon-mcp**: Uses `python/Dockerfile.mcp`
- **archon-agents**: Uses `python/Dockerfile.agents`
- **archon-frontend**: Uses `archon-ui-main/Dockerfile`

If Railway doesn't automatically detect the multi-service setup, you may need to manually create each service:
1. Click "Add Service" for each component
2. Select "Deploy from Dockerfile" for each
3. Specify the correct Dockerfile path for each service as listed above

### 3. Set Environment Variables

For each service, you'll need to set the appropriate environment variables:

#### Common Variables (set for all services)
- `SUPABASE_URL`: Your Supabase project URL (from your .env file)
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key (from your .env file)

#### archon-server Service
```
HOST=0.0.0.0
ARCHON_SERVER_PORT=8181
ARCHON_MCP_PORT=8051
ARCHON_AGENTS_PORT=8052
LOG_LEVEL=INFO
```

#### archon-mcp Service
```
HOST=0.0.0.0
ARCHON_MCP_PORT=8051
ARCHON_SERVER_PORT=8181
ARCHON_AGENTS_PORT=8052
TRANSPORT=sse
API_SERVICE_URL=http://archon-server-production.up.railway.app
AGENTS_SERVICE_URL=http://archon-agents-production.up.railway.app
LOG_LEVEL=INFO
```

#### archon-agents Service
```
HOST=0.0.0.0
ARCHON_AGENTS_PORT=8052
LOG_LEVEL=INFO
```

#### archon-frontend Service
```
HOST=0.0.0.0
ARCHON_UI_PORT=3737
VITE_API_URL=http://archon-server-production.up.railway.app
VITE_ARCHON_SERVER_PORT=8181
ARCHON_SERVER_PORT=8181
```

### 4. Service Dependencies

Railway will automatically set up the service dependencies as specified in `railway.json`:
- archon-mcp depends on archon-server and archon-agents
- archon-frontend depends on archon-server

### 5. Deploy

1. Click "Deploy" in Railway
2. Wait for all services to build and deploy
3. Railway will provide URLs for each service

### 6. Access Your Deployed Archon

Once deployed, you can access:
- **UI**: https://archon-frontend-production.up.railway.app (port 3737)
- **API**: https://archon-server-production.up.railway.app (port 8181)
- **MCP**: https://archon-mcp-production.up.railway.app (port 8051)
- **Agents**: https://archon-agents-production.up.railway.app (port 8052)

### 7. Configure API Keys

After deployment, access the UI and go to the Settings page to configure:
- OPENAI_API_KEY (if you want to use OpenAI models)
- Other model choices and RAG strategy flags

## Using RAG Search in Your AI Voice Agent

Once deployed, your AI voice agent can access the RAG search functionality through the Archon API endpoints. The base URL for API calls will be:

```
https://archon-server-production.up.railway.app
```

You can make HTTP requests to the RAG endpoints documented in the API documentation.

## Troubleshooting

If you encounter issues:
1. Check the logs in Railway's dashboard for each service
2. Verify all environment variables are correctly set
3. Ensure your Supabase project is accessible from Railway (check network settings in Supabase)
4. Make sure you're using the service role key, not the anon key, for Supabase

## Updating Your Deployment

To update your deployment:
1. Push changes to your GitHub repository
2. Railway will automatically redeploy (if auto-deploy is enabled)
3. Or manually trigger a redeploy in Railway's dashboard

## Scaling

Railway allows you to scale resources for each service independently. Monitor your usage and adjust resources as needed.
