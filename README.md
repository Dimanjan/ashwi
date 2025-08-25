# Ashwi Furniture - Django Backend

A comprehensive Django REST API backend for managing furniture products, categories, and customer reviews for Ashwi Furniture company.

## Features

- **Product Management**: Complete CRUD operations for furniture products
- **Category & Subcategory System**: Hierarchical organization of furniture types
- **Advanced Filtering**: Filter by category, material, price range, and more
- **Search Functionality**: Full-text search across product names and descriptions
- **Image Management**: Multiple images per product with primary image support
- **Customer Reviews**: Product review system with approval workflow
- **Admin Interface**: Comprehensive Django admin for easy management
- **REST API**: Full REST API with pagination and filtering

## Models

### Category
- Main furniture categories (Living Room, Bedroom, Dining Room, etc.)
- Slug-based URLs
- Active/inactive status

### Subcategory
- Subcategories within main categories (Sofas, Tables, Beds, etc.)
- Linked to parent category
- Slug-based URLs

### Product
- Comprehensive product information
- Pricing with sale price support
- Inventory management
- Detailed specifications (dimensions, weight, material, finish)
- Features and specifications as JSON fields
- SEO metadata
- Featured and bestseller flags

### ProductImage
- Multiple images per product
- Primary image designation
- Ordering support
- Alt text for accessibility

### ProductReview
- Customer reviews with ratings
- Approval workflow
- Email validation

## API Endpoints

### Categories
- `GET /api/categories/` - List all categories
- `GET /api/categories/{slug}/` - Get category details
- `GET /api/categories/{slug}/products/` - Get products in category

### Subcategories
- `GET /api/subcategories/` - List all subcategories
- `GET /api/subcategories/{slug}/` - Get subcategory details
- `GET /api/subcategories/{slug}/products/` - Get products in subcategory

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{slug}/` - Get product details
- `GET /api/products/featured/` - Get featured products
- `GET /api/products/bestsellers/` - Get bestseller products
- `GET /api/products/on_sale/` - Get products on sale
- `GET /api/products/search/?q=query` - Search products

### Product Reviews
- `GET /api/products/{slug}/reviews/` - Get product reviews
- `POST /api/products/{slug}/reviews/` - Add product review

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ashwi_furniture
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Populate with sample data (optional)**
   ```bash
   python manage.py populate_furniture
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

## Usage

### Admin Interface
Access the Django admin at `http://localhost:8000/admin/` to manage:
- Categories and subcategories
- Products and their specifications
- Product images
- Customer reviews

### API Usage
The API is available at `http://localhost:8000/api/` with the following features:

#### Filtering
```
GET /api/products/?category=living-room&material=wood&min_price=100&max_price=500
```

#### Searching
```
GET /api/products/search/?q=sofa
```

#### Pagination
```
GET /api/products/?page=2
```

#### Ordering
```
GET /api/products/?ordering=price
GET /api/products/?ordering=-created_at
```

## Sample Data

The project includes a management command to populate the database with sample furniture data:

```bash
python manage.py populate_furniture
```

This creates:
- 5 main categories (Living Room, Bedroom, Dining Room, Office, Outdoor)
- 20+ subcategories
- 8 sample products with detailed specifications

## Configuration

### Environment Variables
- `DEBUG`: Set to `False` in production
- `SECRET_KEY`: Change the default secret key
- `ALLOWED_HOSTS`: Configure for your domain

### CORS Settings
The API is configured to allow requests from:
- `http://localhost:3000` (React development server)
- `http://127.0.0.1:3000`

### Media Files
- Product images are stored in `media/products/`
- Category images in `media/categories/`
- Subcategory images in `media/subcategories/`

## Development

### Adding New Features
1. Create models in `products/models.py`
2. Add serializers in `products/serializers.py`
3. Create views in `products/views.py`
4. Update URL patterns in `products/urls.py`
5. Run migrations: `python manage.py makemigrations && python manage.py migrate`

### Testing
```bash
python manage.py test
```

## Production Deployment

1. Set `DEBUG = False`
2. Configure a production database (PostgreSQL recommended)
3. Set up static file serving
4. Configure media file storage (AWS S3 recommended)
5. Set up proper CORS settings
6. Use environment variables for sensitive settings

## API Documentation

The API follows REST conventions and includes:
- JSON responses
- Proper HTTP status codes
- Pagination for large datasets
- Filtering and search capabilities
- Nested resources (product reviews)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 