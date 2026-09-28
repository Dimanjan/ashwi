#!/usr/bin/env bash
# ==============================================================================
# Ashwi Furniture - Cloudflare-Only Firewall Lockdown Script for Kamatera VPS
# ==============================================================================
# This script configures UFW so that ONLY Cloudflare edge proxy IPs can connect
# to ports 80 and 443. Any port scanner (Shodan, Censys, Nmap) or direct IP
# request from an adversary will be silently dropped at the packet level.
# ==============================================================================

set -e

if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run as root: sudo bash lockdown-firewall.sh"
    exit 1
fi

echo "🔒 Locking down firewall: Only Cloudflare edge proxies will be allowed to web ports..."

# 1. Ensure SSH is allowed first so you don't get locked out!
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment "SSH access"

# 2. Delete any existing open rules for port 80/443
ufw delete allow 80/tcp 2>/dev/null || true
ufw delete allow 443/tcp 2>/dev/null || true
ufw delete allow 80 2>/dev/null || true
ufw delete allow 443 2>/dev/null || true

# 3. Fetch Cloudflare official IPv4 ranges
echo "📥 Fetching Cloudflare IPv4 ranges..."
CF_IPV4=$(curl -sL https://www.cloudflare.com/ips-v4)

for ip in $CF_IPV4; do
    ufw allow from "$ip" to any port 80 proto tcp comment "Cloudflare IPv4"
    ufw allow from "$ip" to any port 443 proto tcp comment "Cloudflare IPv4"
done

# 4. Fetch Cloudflare official IPv6 ranges (if IPv6 enabled)
if [ -f /proc/net/if_inet6 ]; then
    echo "📥 Fetching Cloudflare IPv6 ranges..."
    CF_IPV6=$(curl -sL https://www.cloudflare.com/ips-v6)
    for ip in $CF_IPV6; do
        ufw allow from "$ip" to any port 80 proto tcp comment "Cloudflare IPv6"
        ufw allow from "$ip" to any port 443 proto tcp comment "Cloudflare IPv6"
    done
fi

# 5. Enable UFW
ufw --force enable

echo "🛡️ Firewall lockdown complete!"
echo "   - Port 22 (SSH): Accessible"
echo "   - Port 80/443 (HTTP/HTTPS): Accessible ONLY by Cloudflare edge proxies"
echo "   - All direct IP connections from scanners/adversaries: SILENTLY DROPPED"
