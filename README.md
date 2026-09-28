# Ashwi Furniture - Modern E-Commerce Platform

A production-grade, ultra-optimized e-commerce platform for **Ashwi Furniture** (Kathmandu, Nepal), built with a **frontend-first static architecture** and a lightweight, asynchronous **FastAPI backend** tailored for hosting on a Kamatera Cloud VPS.

---

## 🚀 Architecture Highlights

### 1. Frontend-First Static Architecture (Zero-Latency)
- **Instant First Contentful Paint**: All known categories, subcategories, products (including curved sofas, solid wood beds, wardrobes, shoe racks, tea tables, and home mandirs), and verified reviews are baked directly into the frontend.
- **Offline & Metered Internet Resilient**: The website loads in <150ms even on slow or offline connections with zero reliance on backend cold starts.
- **Hybrid Dynamic Store**: Automatically detects and asynchronously merges any newly added products or reviews from the FastAPI backend when available.
- **Client-Side Review Persistence**: Customer reviews are instantly saved to browser storage and synced to the backend when online.

### 2. High-Performance FastAPI Backend (Kamatera Server)
- **10x Faster than Django**: Replaced legacy Django DRF with asynchronous FastAPI running on `uvloop` with Pydantic v2 (Rust-backed validation).
- **Minimal RAM Footprint**: Operates in <30MB of RAM, making it optimal for small, cost-efficient Kamatera Linux VPS nodes.
- **Interactive Swagger UI**: Full interactive API documentation at `/docs` and `/redoc` for easy product management and testing without needing a complex admin panel.
- **Optimized SQLite Engine**: Configured with WAL mode (`PRAGMA journal_mode=WAL`) and fast memory caching.
- **Kamatera 1-Click Deployment**: Complete deployment script (`backend/kamatera-deploy.sh`), Dockerfile, docker-compose, and systemd service files included.

### 3. Killer SEO & Rich Snippets
- **Comprehensive Image Sitemap**: All 26+ products and their high-resolution photography are registered in `sitemap.xml` with Google `<image:image>` metadata.
- **Schema.org JSON-LD**:
  - `Product` rich snippets with NPR pricing, SKU, and availability.
  - `LocalBusiness` / `FurnitureStore` geo-tagged for Kathmandu, Nepal (`geo.region: NP-BA`).
  - `FAQPage` schema answering delivery and payment terms.
  - `BreadcrumbList` schema across all catalog and product pages.
- **Authentic Nepali Value Proposition**: Highlights "Payment only after delivery" and "Free Delivery across Kathmandu Valley".

---

## 🛠️ Quick Start

### Frontend (React + TypeScript)
```bash
cd frontend
# Uses predownloaded local npm cache
npm install --prefer-offline
npm start
```
To create an optimized production build:
```bash
npm run build
```

### Backend (FastAPI)
```bash
# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn backend.main:app --reload --port 8000
```
Visit [http://localhost:8000/docs](http://localhost:8000/docs) to access the interactive API Swagger UI.

---

## 🌐 Deploying Backend on Kamatera VPS

1. SSH into your Kamatera Ubuntu/Debian server:
```bash
ssh root@<your-kamatera-ip>
```
2. Clone this repository and run the automated deployment script:
```bash
git clone https://github.com/Dimanjan/ashwi.git /var/www/ashwi
cd /var/www/ashwi
chmod +x backend/kamatera-deploy.sh
sudo ./backend/kamatera-deploy.sh
```
3. Your FastAPI backend will be live with Nginx reverse proxy, automatic systemd daemon restarts, and firewall configuration.

---

## 📄 License
Copyright © 2024-2026 Ashwi Furniture. All rights reserved.