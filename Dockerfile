# This is a placeholder Dockerfile for Render.com multi-service deployment
# Render.com will use specific Dockerfiles for each service:
# - archon-server: python/Dockerfile.server
# - archon-mcp: python/Dockerfile.mcp
# - archon-agents: python/Dockerfile.agents
# - archon-frontend: archon-ui-main/Dockerfile

FROM alpine:latest

# Install curl for health checks
RUN apk add --no-cache curl

# Create a simple health check script
RUN echo '#!/bin/sh\n\
echo "This is a placeholder for Render.com multi-service deployment"\n\
echo "Actual services are defined using their respective Dockerfiles"\n\
exit 0' > /healthcheck.sh && chmod +x /healthcheck.sh

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["/healthcheck.sh"]

# Expose a port (required by some platforms)
EXPOSE 80

# Simple command to keep container running
CMD ["tail", "-f", "/dev/null"]
