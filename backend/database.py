import sqlite3
import os
from contextlib import contextmanager

DB_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.environ.get("DB_PATH", os.path.join(DB_DIR, "ashwi.sqlite3"))
MEDIA_DIR = os.environ.get("MEDIA_DIR", os.path.join(DB_DIR, "media"))

os.makedirs(MEDIA_DIR, exist_ok=True)

@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH, timeout=10.0)
    conn.row_factory = sqlite3.Row
    # Ultra-performance pragmas for SQLite
    conn.execute("PRAGMA journal_mode = WAL;")
    conn.execute("PRAGMA synchronous = NORMAL;")
    conn.execute("PRAGMA cache_size = -64000;") # 64MB cache
    conn.execute("PRAGMA foreign_keys = ON;")
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

def init_db():
    """Initialize database tables with optimal indexing"""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Categories
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                slug TEXT NOT NULL UNIQUE,
                description TEXT DEFAULT '',
                image TEXT DEFAULT '',
                is_active INTEGER DEFAULT 1,
                created_at TEXT DEFAULT (datetime('now')),
                updated_at TEXT DEFAULT (datetime('now'))
            );
        """)
        
        # Subcategories
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS subcategories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                category_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                slug TEXT NOT NULL,
                description TEXT DEFAULT '',
                image TEXT DEFAULT '',
                is_active INTEGER DEFAULT 1,
                created_at TEXT DEFAULT (datetime('now')),
                updated_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
                UNIQUE(category_id, name)
            );
        """)

        # Products (for dynamic future additions)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                slug TEXT NOT NULL UNIQUE,
                sku TEXT NOT NULL UNIQUE,
                category_id INTEGER NOT NULL,
                subcategory_id INTEGER,
                short_description TEXT DEFAULT '',
                description TEXT NOT NULL,
                price REAL NOT NULL,
                sale_price REAL,
                cost_price REAL,
                stock_quantity INTEGER DEFAULT 0,
                low_stock_threshold INTEGER DEFAULT 5,
                material TEXT DEFAULT '',
                finish TEXT DEFAULT '',
                dimensions_length REAL,
                dimensions_width REAL,
                dimensions_height REAL,
                weight REAL,
                color TEXT DEFAULT '',
                features TEXT DEFAULT '[]', -- JSON array
                specifications TEXT DEFAULT '{}', -- JSON object
                is_active INTEGER DEFAULT 1,
                is_featured INTEGER DEFAULT 0,
                is_bestseller INTEGER DEFAULT 0,
                meta_title TEXT DEFAULT '',
                meta_description TEXT DEFAULT '',
                created_at TEXT DEFAULT (datetime('now')),
                updated_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (category_id) REFERENCES categories(id),
                FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
            );
        """)

        # Product Images
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS product_images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id INTEGER NOT NULL,
                image_url TEXT NOT NULL,
                alt_text TEXT DEFAULT '',
                is_primary INTEGER DEFAULT 0,
                order_num INTEGER DEFAULT 0,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
            );
        """)

        # Product Reviews
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS product_reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_slug TEXT NOT NULL,
                customer_name TEXT NOT NULL,
                email TEXT NOT NULL,
                rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
                title TEXT DEFAULT '',
                comment TEXT NOT NULL,
                is_approved INTEGER DEFAULT 1,
                created_at TEXT DEFAULT (datetime('now'))
            );
        """)

        # Telemetry & Visitor Tracking (IP-masked and privacy-focused)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS telemetry_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                event_type TEXT NOT NULL,
                path TEXT NOT NULL,
                referrer TEXT DEFAULT '',
                device_type TEXT DEFAULT 'desktop',
                browser TEXT DEFAULT '',
                os TEXT DEFAULT '',
                screen_size TEXT DEFAULT '',
                ip_hash TEXT NOT NULL,
                metadata TEXT DEFAULT '{}',
                created_at TEXT DEFAULT (datetime('now'))
            );
        """)

        # Performance Indexes
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_products_cat ON products(category_id);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_products_bestseller ON products(is_bestseller);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_reviews_slug ON product_reviews(product_slug);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_telemetry_created ON telemetry_events(created_at);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_telemetry_event ON telemetry_events(event_type);")
        cursor.execute("CREATE INDEX IF NOT EXISTS idx_telemetry_session ON telemetry_events(session_id);")
