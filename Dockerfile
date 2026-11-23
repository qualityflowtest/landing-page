FROM nginx:alpine

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy only public landing page static assets and media
COPY index.html style.css script.js *.gif *.jpg *.mp4 *.webm *.zip /usr/share/nginx/html/

# Ensure no env or docker metadata files are ever exposed via HTTP
RUN rm -f /usr/share/nginx/html/.env* /usr/share/nginx/html/*.env /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/.gitignore /usr/share/nginx/html/.dockerignore

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

