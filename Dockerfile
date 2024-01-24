# Use the official Nginx image as the base image
FROM nginx:latest

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/

# Copy the Angular build files to the container
COPY dist/ /usr/share/nginx/html/

# Expose port 80 for incoming traffic
EXPOSE 80

# Command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
