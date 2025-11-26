FROM nginx:alpine

# Copy custom nginx configuration into the image
# (build context should include this file: infra/sql/nginx/nginx.conf)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose default HTTP port
EXPOSE 80

# Use the default nginx foreground command
CMD ["nginx", "-g", "daemon off;"]
