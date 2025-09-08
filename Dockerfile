# This is a placeholder Dockerfile for Railway multi-service deployment
# Railway requires a root Dockerfile to recognize the project structure
# The actual services are defined in railway.toml

FROM alpine:latest

# Install curl for health checks
RUN apk add --no-cache curl

# Create a simple health check script
RUN echo '#!/bin/sh\n\
echo "This is a placeholder for Railway multi-service deployment"\n\
echo "Actual services are defined in railway.toml"\n\
exit 0' > /healthcheck.sh && chmod +x /healthcheck.sh

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["/healthcheck.sh"]

# Expose a port (required by Railway)
EXPOSE 80

# Simple command to keep container running
CMD ["tail", "-f", "/dev/null"]
