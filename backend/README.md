# Ashwi Furniture - High-Performance FastAPI Backend

An ultra-optimized, asynchronous REST API for Ashwi Furniture, specifically designed for deployment on Kamatera cloud VPS.

## Key Highlights & Performance Optimizations

- **Lightning Fast**: Built on Starlette and Pydantic v2 (Rust-powered `pydantic-core`), running with `uvloop`.
- **Tiny Footprint**: Memory usage is <30MB RAM (compared to 250MB+ for Django), ideal for lightweight Kamatera VPS.
- **Offline Resilient Frontend Integration**: Known products and categories are pre-baked into the frontend. The backend is solely used for dynamic future product additions, inventory changes, image uploads, and customer reviews.
- **Interactive OpenAPI Documentation**: Built-in Swagger UI at `/docs` and ReDoc at `/redoc`.
- **Zero-Latency Database**: SQLite configured with WAL mode (`PRAGMA journal_mode = WAL`) and optimized memory caching.
- **Automated Kamatera Deployment**: 1-click script (`kamatera-deploy.sh`), Dockerfile, and systemd service files included.

---

## API Endpoints

### Health Check
- `GET /api/health` - Server health status and uptime

### Categories
- `GET /api/categories/` - List categories
- `POST /api/categories/` - Create a new category
- `GET /api/categories/{slug}/` - Get category details

### Subcategories
- `GET /api/subcategories/` - List subcategories
- `POST /api/subcategories/` - Create a subcategory

### Products
- `GET /api/products/` - List/filter products (supports `category`, `subcategory`, `material`, `min_price`, `max_price`, `on_sale`, `in_stock`, `is_featured`, `is_bestseller`, `search`, `ordering`, `page`, `page_size`)
- `POST /api/products/` - Create new product (with features, specs, images)
- `GET /api/products/{slug}/` - Get product by slug
- `GET /api/products/featured/` - Featured products
- `GET /api/products/bestsellers/` - Bestsellers
- `GET /api/products/on_sale/` - On sale products
- `GET /api/products/search/?q={query}` - Product search

### Customer Reviews
- `GET /api/products/{slug}/reviews/` - Get reviews for a product
- `POST /api/products/{slug}/reviews/` - Submit a new customer review

### Media Uploads
- `POST /api/upload/` - Upload product images (returns `/media/{filename}`)

---

## Deployment on Kamatera VPS

### Option 1: Native Systemd (Recommended)
Run on your Ubuntu/Debian Kamatera server:
```bash
sudo ./backend/kamatera-deploy.sh
```

### Option 2: Docker Compose
```bash
cd backend
docker compose up -d
```

### Option 3: Local Development
```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```
Open [http://localhost:8000/docs](http://localhost:8000/docs) in your browser.
