import json
import re
import uuid
import os
import shutil
from typing import Optional, List
from datetime import datetime

from fastapi import FastAPI, HTTPException, Query, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles

from .database import get_db, init_db, MEDIA_DIR
from .schemas import (
    CategoryResponse, CategoryCreate, CategoryListResponse,
    SubcategoryResponse, SubcategoryCreate, SubcategoryListResponse,
    ProductResponse, ProductCreate, ProductListResponse,
    ProductReviewResponse, ProductReviewCreate,
    ProductImageResponse
)

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title="Ashwi Furniture API",
    description="High-performance async REST API for Ashwi Furniture (Optimized for Kamatera Server).",
    version="2.0.0",
    lifespan=lifespan
)

# High-performance GZip compression & CORS
app.add_middleware(GZipMiddleware, minimum_size=500)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount media directory for product images
app.mount("/media", StaticFiles(directory=MEDIA_DIR), name="media")

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

# Also ensure DB initialized on import
init_db()

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Ashwi Furniture FastAPI Backend",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "version": "2.0.0"
    }

# ==================== HELPER ROW PARSER ====================
def parse_category_row(row) -> CategoryResponse:
    return CategoryResponse(
        id=row["id"],
        name=row["name"],
        slug=row["slug"],
        description=row["description"],
        image=row["image"] if row["image"] else None,
        is_active=bool(row["is_active"]),
        product_count=row["product_count"] if "product_count" in row.keys() else 0,
        created_at=row["created_at"],
        updated_at=row["updated_at"]
    )

def parse_product_row(conn, row) -> ProductResponse:
    # Fetch category
    cat_cur = conn.cursor()
    cat_cur.execute("SELECT *, 0 as product_count FROM categories WHERE id = ?", (row["category_id"],))
    cat_row = cat_cur.fetchone()
    category = parse_category_row(cat_row) if cat_row else CategoryResponse(
        id=row["category_id"], name="General", slug="general", created_at="", updated_at=""
    )

    # Fetch subcategory if exists
    subcategory = None
    if row["subcategory_id"]:
        sub_cur = conn.cursor()
        sub_cur.execute("SELECT *, 0 as product_count FROM subcategories WHERE id = ?", (row["subcategory_id"],))
        sub_row = sub_cur.fetchone()
        if sub_row:
            subcategory = SubcategoryResponse(
                id=sub_row["id"],
                category_id=sub_row["category_id"],
                name=sub_row["name"],
                slug=sub_row["slug"],
                description=sub_row["description"],
                image=sub_row["image"] if sub_row["image"] else None,
                is_active=bool(sub_row["is_active"]),
                created_at=sub_row["created_at"],
                updated_at=sub_row["updated_at"]
            )

    # Fetch images
    img_cur = conn.cursor()
    img_cur.execute("SELECT * FROM product_images WHERE product_id = ? ORDER BY order_num ASC", (row["id"],))
    images = []
    primary_image = None
    for img in img_cur.fetchall():
        img_resp = ProductImageResponse(
            id=img["id"],
            image=img["image_url"],
            image_url=img["image_url"],
            alt_text=img["alt_text"],
            is_primary=bool(img["is_primary"]),
            order=img["order_num"],
            created_at=img["created_at"]
        )
        images.append(img_resp)
        if img_resp.is_primary and not primary_image:
            primary_image = img_resp
    if images and not primary_image:
        primary_image = images[0]

    # Fetch reviews
    rev_cur = conn.cursor()
    rev_cur.execute(
        "SELECT * FROM product_reviews WHERE product_slug = ? AND is_approved = 1 ORDER BY created_at DESC", 
        (row["slug"],)
    )
    reviews = []
    total_rating = 0
    for rev in rev_cur.fetchall():
        r = ProductReviewResponse(
            id=rev["id"],
            customer_name=rev["customer_name"],
            email=rev["email"],
            rating=rev["rating"],
            title=rev["title"],
            comment=rev["comment"],
            is_approved=bool(rev["is_approved"]),
            created_at=rev["created_at"]
        )
        reviews.append(r)
        total_rating += r.rating

    avg_rating = round(total_rating / len(reviews), 1) if reviews else 5.0

    features = json.loads(row["features"]) if row["features"] else []
    specifications = json.loads(row["specifications"]) if row["specifications"] else {}

    return ProductResponse(
        id=row["id"],
        name=row["name"],
        slug=row["slug"],
        sku=row["sku"],
        category=category,
        subcategory=subcategory,
        category_id=row["category_id"],
        subcategory_id=row["subcategory_id"],
        short_description=row["short_description"] or "",
        description=row["description"],
        price=str(row["price"]),
        sale_price=str(row["sale_price"]) if row["sale_price"] is not None else None,
        cost_price=str(row["cost_price"]) if row["cost_price"] is not None else None,
        stock_quantity=row["stock_quantity"],
        low_stock_threshold=row["low_stock_threshold"],
        material=row["material"] or "",
        finish=row["finish"] or "",
        dimensions_length=row["dimensions_length"],
        dimensions_width=row["dimensions_width"],
        dimensions_height=row["dimensions_height"],
        weight=row["weight"],
        color=row["color"] or "",
        features=features,
        specifications=specifications,
        is_active=bool(row["is_active"]),
        is_featured=bool(row["is_featured"]),
        is_bestseller=bool(row["is_bestseller"]),
        meta_title=row["meta_title"] or "",
        meta_description=row["meta_description"] or "",
        images=images,
        primary_image=primary_image,
        reviews=reviews,
        average_rating=avg_rating,
        review_count=len(reviews),
        created_at=row["created_at"],
        updated_at=row["updated_at"]
    )

# ==================== CATEGORIES API ====================
@app.get("/api/categories/", response_model=CategoryListResponse)
def list_categories():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT c.*, COUNT(p.id) as product_count 
            FROM categories c
            LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1
            WHERE c.is_active = 1
            GROUP BY c.id
            ORDER BY c.name ASC
        """)
        rows = cursor.fetchall()
        categories = [parse_category_row(r) for r in rows]
        return CategoryListResponse(count=len(categories), next=None, previous=None, results=categories)

@app.post("/api/categories/", response_model=CategoryResponse, status_code=201)
def create_category(payload: CategoryCreate):
    slug = payload.slug or slugify(payload.name)
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO categories (name, slug, description, image, is_active) VALUES (?, ?, ?, ?, ?)",
            (payload.name, slug, payload.description or "", payload.image or "", 1 if payload.is_active else 0)
        )
        cat_id = cursor.lastrowid
        cursor.execute("SELECT *, 0 as product_count FROM categories WHERE id = ?", (cat_id,))
        return parse_category_row(cursor.fetchone())

@app.get("/api/categories/{slug}/", response_model=CategoryResponse)
def get_category_by_slug(slug: str):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT c.*, COUNT(p.id) as product_count 
            FROM categories c
            LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1
            WHERE c.slug = ? AND c.is_active = 1
            GROUP BY c.id
        """, (slug,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Category not found")
        return parse_category_row(row)

# ==================== SUBCATEGORIES API ====================
@app.get("/api/subcategories/", response_model=SubcategoryListResponse)
def list_subcategories():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT s.*, COUNT(p.id) as product_count 
            FROM subcategories s
            LEFT JOIN products p ON p.subcategory_id = s.id AND p.is_active = 1
            WHERE s.is_active = 1
            GROUP BY s.id
            ORDER BY s.name ASC
        """)
        rows = cursor.fetchall()
        subcategories = []
        for r in rows:
            sub = SubcategoryResponse(
                id=r["id"],
                category_id=r["category_id"],
                name=r["name"],
                slug=r["slug"],
                description=r["description"],
                image=r["image"] if r["image"] else None,
                is_active=bool(r["is_active"]),
                product_count=r["product_count"],
                created_at=r["created_at"],
                updated_at=r["updated_at"]
            )
            subcategories.append(sub)
        return SubcategoryListResponse(count=len(subcategories), next=None, previous=None, results=subcategories)

@app.post("/api/subcategories/", response_model=SubcategoryResponse, status_code=201)
def create_subcategory(payload: SubcategoryCreate):
    slug = payload.slug or slugify(payload.name)
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO subcategories (category_id, name, slug, description, image, is_active) VALUES (?, ?, ?, ?, ?, ?)",
            (payload.category_id, payload.name, slug, payload.description or "", payload.image or "", 1 if payload.is_active else 0)
        )
        sub_id = cursor.lastrowid
        cursor.execute("SELECT * FROM subcategories WHERE id = ?", (sub_id,))
        r = cursor.fetchone()
        return SubcategoryResponse(
            id=r["id"],
            category_id=r["category_id"],
            name=r["name"],
            slug=r["slug"],
            description=r["description"],
            image=r["image"] if r["image"] else None,
            is_active=bool(r["is_active"]),
            product_count=0,
            created_at=r["created_at"],
            updated_at=r["updated_at"]
        )

# ==================== PRODUCTS API ====================
@app.get("/api/products/", response_model=ProductListResponse)
def list_products(
    category: Optional[str] = None,
    subcategory: Optional[str] = None,
    material: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    on_sale: Optional[bool] = None,
    in_stock: Optional[bool] = None,
    is_featured: Optional[bool] = None,
    is_bestseller: Optional[bool] = None,
    search: Optional[str] = None,
    ordering: Optional[str] = "-created_at",
    page: int = 1,
    page_size: int = 12
):
    with get_db() as conn:
        query = "SELECT * FROM products WHERE is_active = 1"
        params = []

        if category:
            query += " AND category_id IN (SELECT id FROM categories WHERE slug = ? OR name = ?)"
            params.extend([category, category])

        if subcategory:
            query += " AND subcategory_id IN (SELECT id FROM subcategories WHERE slug = ? OR name = ?)"
            params.extend([subcategory, subcategory])

        if material:
            query += " AND LOWER(material) = LOWER(?)"
            params.append(material)

        if min_price is not None:
            query += " AND price >= ?"
            params.append(min_price)

        if max_price is not None:
            query += " AND price <= ?"
            params.append(max_price)

        if on_sale:
            query += " AND sale_price IS NOT NULL AND sale_price < price"

        if in_stock:
            query += " AND stock_quantity > 0"

        if is_featured:
            query += " AND is_featured = 1"

        if is_bestseller:
            query += " AND is_bestseller = 1"

        if search:
            query += " AND (name LIKE ? OR description LIKE ? OR short_description LIKE ? OR sku LIKE ?)"
            like_term = f"%{search}%"
            params.extend([like_term, like_term, like_term, like_term])

        # Ordering
        order_clause = " ORDER BY created_at DESC"
        if ordering == "price":
            order_clause = " ORDER BY price ASC"
        elif ordering == "-price":
            order_clause = " ORDER BY price DESC"
        elif ordering == "name":
            order_clause = " ORDER BY name ASC"
        elif ordering == "-name":
            order_clause = " ORDER BY name DESC"
        
        query += order_clause

        cursor = conn.cursor()
        cursor.execute(query, params)
        all_rows = cursor.fetchall()
        total_count = len(all_rows)

        # Pagination
        start = (page - 1) * page_size
        paginated_rows = all_rows[start:start + page_size]
        products = [parse_product_row(conn, r) for r in paginated_rows]

        next_page = f"?page={page + 1}" if start + page_size < total_count else None
        prev_page = f"?page={page - 1}" if page > 1 else None

        return ProductListResponse(
            count=total_count,
            next=next_page,
            previous=prev_page,
            results=products
        )

@app.get("/api/products/featured/", response_model=ProductListResponse)
def get_featured_products():
    return list_products(is_featured=True, page_size=8)

@app.get("/api/products/bestsellers/", response_model=ProductListResponse)
def get_bestseller_products():
    return list_products(is_bestseller=True, page_size=8)

@app.get("/api/products/on_sale/", response_model=ProductListResponse)
def get_on_sale_products():
    return list_products(on_sale=True, page_size=8)

@app.get("/api/products/search/", response_model=ProductListResponse)
def search_products(q: str = Query(..., min_length=1)):
    return list_products(search=q, page_size=24)

@app.get("/api/products/{slug}/", response_model=ProductResponse)
def get_product_by_slug(slug: str):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM products WHERE slug = ? AND is_active = 1", (slug,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Product not found")
        return parse_product_row(conn, row)

@app.post("/api/products/", response_model=ProductResponse, status_code=201)
def create_product(payload: ProductCreate):
    slug = payload.slug or slugify(payload.name)
    sku = payload.sku or f"ASHWI-{uuid.uuid4().hex[:8].upper()}"

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO products (
                name, slug, sku, category_id, subcategory_id, short_description,
                description, price, sale_price, cost_price, stock_quantity,
                low_stock_threshold, material, finish, dimensions_length,
                dimensions_width, dimensions_height, weight, color,
                features, specifications, is_active, is_featured, is_bestseller,
                meta_title, meta_description
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            payload.name, slug, sku, payload.category_id, payload.subcategory_id,
            payload.short_description or "", payload.description, payload.price,
            payload.sale_price, payload.cost_price, payload.stock_quantity,
            payload.low_stock_threshold, payload.material or "", payload.finish or "",
            payload.dimensions_length, payload.dimensions_width, payload.dimensions_height,
            payload.weight, payload.color or "", json.dumps(payload.features),
            json.dumps(payload.specifications), 1 if payload.is_active else 0,
            1 if payload.is_featured else 0, 1 if payload.is_bestseller else 0,
            payload.meta_title or "", payload.meta_description or ""
        ))
        prod_id = cursor.lastrowid

        # Insert images if provided
        for idx, img in enumerate(payload.images):
            cursor.execute("""
                INSERT INTO product_images (product_id, image_url, alt_text, is_primary, order_num)
                VALUES (?, ?, ?, ?, ?)
            """, (prod_id, img.image_url, img.alt_text or payload.name, 1 if img.is_primary or idx == 0 else 0, img.order or idx))

        cursor.execute("SELECT * FROM products WHERE id = ?", (prod_id,))
        return parse_product_row(conn, cursor.fetchone())

# ==================== REVIEWS API ====================
@app.get("/api/products/{slug}/reviews/", response_model=List[ProductReviewResponse])
def get_product_reviews(slug: str):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT * FROM product_reviews 
            WHERE product_slug = ? AND is_approved = 1 
            ORDER BY created_at DESC
        """, (slug,))
        return [
            ProductReviewResponse(
                id=r["id"],
                customer_name=r["customer_name"],
                email=r["email"],
                rating=r["rating"],
                title=r["title"],
                comment=r["comment"],
                is_approved=bool(r["is_approved"]),
                created_at=r["created_at"]
            ) for r in cursor.fetchall()
        ]

@app.post("/api/products/{slug}/reviews/", response_model=ProductReviewResponse, status_code=201)
def submit_product_review(slug: str, payload: ProductReviewCreate):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO product_reviews (product_slug, customer_name, email, rating, title, comment, is_approved)
            VALUES (?, ?, ?, ?, ?, ?, 1)
        """, (slug, payload.customer_name, payload.email, payload.rating, payload.title or "", payload.comment))
        rev_id = cursor.lastrowid
        cursor.execute("SELECT * FROM product_reviews WHERE id = ?", (rev_id,))
        r = cursor.fetchone()
        return ProductReviewResponse(
            id=r["id"],
            customer_name=r["customer_name"],
            email=r["email"],
            rating=r["rating"],
            title=r["title"],
            comment=r["comment"],
            is_approved=bool(r["is_approved"]),
            created_at=r["created_at"]
        )

# ==================== IMAGE UPLOAD API ====================
@app.post("/api/upload/")
async def upload_image(file: UploadFile = File(...)):
    filename = f"{uuid.uuid4().hex}_{file.filename}"
    filepath = os.path.join(MEDIA_DIR, filename)
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"url": f"/media/{filename}", "filename": filename}
