# Manual Archon Deployment to Render.com

Since the automated deployment via MCP tool is encountering issues, here's a step-by-step guide to manually deploy Archon to Render.com.

## Prerequisites

- Render.com account
- GitHub account with access to the Archon repository
- Supabase project with service role key

## Step 1: Create archon-server Service

1. Go to [Render Dashboard](https://dashboard.render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your Archon repository: `https://github.com/MrPhussy/Archon.git`
4. Configure the service:
   - **Name**: `archon-server`
   - **Region**: `Frankfurt` (EU region)
   - **Branch**: `main` (or your preferred branch)
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `python/Dockerfile.server`
5. Set Environment Variables:
   ```
   SUPABASE_URL=https://evvdxlzmopgraepibkcu.supabase.co
   SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dmR4bHptb3BncmFlcGlia2N1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTg1ODgwNiwiZXhwIjoyMDcxNDM0ODA2fQ.apG_n2jebHA9_NoPL3G6Dptez5PYZnKzvTfsB8AeqW8
   HOST=0.0.0.0
   ARCHON_SERVER_PORT=8181
   ARCHON_MCP_PORT=8051
   ARCHON_AGENTS_PORT=8052
   LOG_LEVEL=INFO
   ```
6. Advanced Settings:
   - Auto Deploy: Enable
   - Health Check Path: `/health`
7. Click "Create Web Service"

## Step 2: Create archon-agents Service

1. Click "New +" and select "Web Service"
2. Connect your Archon repository
3. Configure the service:
   - **Name**: `archon-agents`
   - **Region**: `Frankfurt` (same as archon-server)
   - **Branch**: `main`
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `python/Dockerfile.agents`
4. Set Environment Variables:
   ```
   SUPABASE_URL=https://evvdxlzmopgraepibkcu.supabase.co
   SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dmR4bHptb3BncmFlcGlia2N1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTg1ODgwNiwiZXhwIjoyMDcxNDM0ODA2fQ.apG_n2jebHA9_NoPL3G6Dptez5PYZnKzvTfsB8AeqW8
   HOST=0.0.0.0
   ARCHON_AGENTS_PORT=8052
   LOG_LEVEL=INFO
   ```
5. Advanced Settings:
   - Auto Deploy: Enable
   - Health Check Path: `/health`
6. Click "Create Web Service"

## Step 3: Create archon-mcp Service

1. Click "New +" and select "Web Service"
2. Connect your Archon repository
3. Configure the service:
   - **Name**: `archon-mcp`
   - **Region**: `Frankfurt` (same as other services)
   - **Branch**: `main`
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `python/Dockerfile.mcp`
4. Set Environment Variables:
   ```
   SUPABASE_URL=https://evvdxlzmopgraepibkcu.supabase.co
   SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dmR4bHptb3BncmFlcGlia2N1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTg1ODgwNiwiZXhwIjoyMDcxNDM0ODA2fQ.apG_n2jebHA9_NoPL3G6Dptez5PYZnKzvTfsB8AeqW8
   HOST=0.0.0.0
   ARCHON_MCP_PORT=8051
   ARCHON_SERVER_PORT=8181
   ARCHON_AGENTS_PORT=8052
   TRANSPORT=sse
   LOG_LEVEL=INFO
   ```
5. **Important**: After creating this service, you'll need to update the `API_SERVICE_URL` and `AGENTS_SERVICE_URL` environment variables with the actual URLs provided by Render for the archon-server and archon-agents services.
6. Advanced Settings:
   - Auto Deploy: Enable
7. Click "Create Web Service"

## Step 4: Create archon-frontend Service

1. Click "New +" and select "Web Service"
2. Connect your Archon repository
3. Configure the service:
   - **Name**: `archon-frontend`
   - **Region**: `Frankfurt` (same as other services)
   - **Branch**: `main`
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `archon-ui-main/Dockerfile`
4. Set Environment Variables:
   ```
   HOST=0.0.0.0
   ARCHON_UI_PORT=3737
   ARCHON_SERVER_PORT=8181
   VITE_ARCHON_SERVER_PORT=8181
   ```
5. **Important**: After creating this service, you'll need to update the `VITE_API_URL` environment variable with the actual URL provided by Render for the archon-server service.
6. Advanced Settings:
   - Auto Deploy: Enable
7. Click "Create Web Service"

## Step 5: Update Service URLs

After all services are deployed:

1. Go to the archon-mcp service settings
2. Update environment variables:
   - `API_SERVICE_URL`: Use the URL of your archon-server service (e.g., `https://archon-server-xxxx.onrender.com`)
   - `AGENTS_SERVICE_URL`: Use the URL of your archon-agents service (e.g., `https://archon-agents-xxxx.onrender.com`)
3. Go to the archon-frontend service settings
4. Update environment variable:
   - `VITE_API_URL`: Use the URL of your archon-server service (e.g., `https://archon-server-xxxx.onrender.com`)
5. Redeploy the updated services

## Step 6: Verify Deployment

1. Access the archon-frontend service URL (e.g., `https://archon-frontend-xxxx.onrender.com`)
2. Complete the onboarding process to set up your API keys
3. Test the functionality by crawling a website or uploading a document

## Troubleshooting

If you encounter issues:
1. Check the logs in Render's dashboard for each service
2. Verify all environment variables are correctly set
3. Ensure your Supabase project is accessible from Render
4. Check that you're using the service role key, not the anon key, for Supabase
