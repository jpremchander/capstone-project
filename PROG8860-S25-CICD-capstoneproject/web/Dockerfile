FROM nginx:1.21.6

EXPOSE 8080

# Environment variables for service discovery
ENV CATALOGUE_HOST=catalogue \
    USER_HOST=user \
    CART_HOST=cart \
    SHIPPING_HOST=shipping \
    PAYMENT_HOST=payment \
    RATINGS_HOST=ratings

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy configuration and static files
COPY entrypoint.sh /root/
COPY default.conf.template /etc/nginx/templates/
COPY static/ /usr/share/nginx/html/static/

# Ensure proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html/static

ENTRYPOINT ["/root/entrypoint.sh"]