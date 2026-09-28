#!/usr/bin/env bash
# ==============================================================================
# Ashwi Furniture - 1-Click Deployment Script for Kamatera Ubuntu/Debian Server
# ==============================================================================
set -e

echo "🚀 Starting Ashwi Furniture Backend deployment on Kamatera VPS..."

# 1. Update system packages
apt update && apt upgrade -y
apt install -y python3 python3-pip python3-venv nginx git curl ufw

# 2. Setup project directory
DEPLOY_DIR="/var/www/ashwi"
mkdir -p "$DEPLOY_DIR"
cd "$DEPLOY_DIR"

# 3. Create virtual environment
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# 4. Install dependencies
source venv/bin/activate
pip install --upgrade pip
pip install -r backend/requirements.txt

# 5. Setup directories
mkdir -p backend/media
chmod -R 755 backend/media

# 6. Setup systemd service
cp backend/ashwi-backend.service /etc/systemd/system/ashwi-backend.service
systemctl daemon-reload
systemctl enable ashwi-backend
systemctl restart ashwi-backend

# 7. Setup Nginx
cp backend/nginx.conf /etc/nginx/sites-available/ashwi
ln -sf /etc/nginx/sites-available/ashwi /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# 8. Firewall setup
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp
ufw --force enable

echo "✅ Ashwi Furniture FastAPI Backend successfully deployed!"
echo "📍 Access Swagger UI at: http://<your-server-ip>/docs"
