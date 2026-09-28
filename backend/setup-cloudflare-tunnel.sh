#!/usr/bin/env bash
# ==============================================================================
# Ashwi Furniture - Cloudflare Tunnel (Zero-Open-Ports) Setup Guide
# ==============================================================================
# With Cloudflare Tunnel:
# - ZERO inbound web ports are opened on the server (Ports 80 & 443 can be closed).
# - Kamatera VPS IP address is 100% undiscoverable by any internet scanner.
# - Traffic flows securely through an encrypted outbound tunnel to Cloudflare.
# ==============================================================================

echo "=== Option A: Quick Setup via Cloudflare Dashboard (Recommended) ==="
echo "1. In Cloudflare Dashboard -> Zero Trust -> Networks -> Tunnels."
echo "2. Click 'Create a tunnel' -> Choose 'Cloudflared'."
echo "3. Name it 'ashwi-kamatera'."
echo "4. Copy the installation command provided by Cloudflare for Debian/Ubuntu."
echo "   It will look like:"
echo "   curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb"
echo "   sudo dpkg -i cloudflared.deb"
echo "   sudo cloudflared service install <YOUR_TUNNEL_TOKEN>"
echo "5. In the tunnel's Public Hostname settings:"
echo "   - Subdomain: ashwifurniture"
echo "   - Domain: sajedar.com"
echo "   - Service: HTTP://localhost:8000"
echo "6. Close all inbound web ports on Kamatera VPS:"
echo "   sudo ufw default deny incoming"
echo "   sudo ufw allow 22/tcp"
echo "   sudo ufw --force enable"
echo ""
echo "=== Result ==="
echo "Ports 80 and 443 are CLOSED to the world. Kamatera IP is completely invisible."
