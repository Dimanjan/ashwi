from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from products.models import Category, Subcategory, Product, ProductImage
import random

class Command(BaseCommand):
    help = 'Populate database with sample furniture data'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample furniture data...')
        
        # Create Categories
        categories_data = [
            {
                'name': 'Living Room',
                'description': 'Comfortable and stylish furniture for your living space'
            },
            {
                'name': 'Bedroom',
                'description': 'Peaceful and elegant bedroom furniture'
            },
            {
                'name': 'Dining Room',
                'description': 'Beautiful dining furniture for family gatherings'
            },
            {
                'name': 'Office',
                'description': 'Professional and functional office furniture'
            },
            {
                'name': 'Outdoor',
                'description': 'Durable outdoor furniture for your patio and garden'
            }
        ]
        
        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(f'Created category: {category.name}')
        
        # Create Subcategories
        subcategories_data = {
            'Living Room': [
                {'name': 'Sofas', 'description': 'Comfortable sofas and couches'},
                {'name': 'Coffee Tables', 'description': 'Stylish coffee tables'},
                {'name': 'TV Stands', 'description': 'Modern TV stands and entertainment units'},
                {'name': 'Accent Chairs', 'description': 'Beautiful accent chairs'},
                {'name': 'Bookshelves', 'description': 'Elegant bookshelves and storage'},
            ],
            'Bedroom': [
                {'name': 'Beds', 'description': 'Comfortable beds and bed frames'},
                {'name': 'Dressers', 'description': 'Elegant dressers and chests'},
                {'name': 'Nightstands', 'description': 'Practical nightstands'},
                {'name': 'Wardrobes', 'description': 'Spacious wardrobes and closets'},
                {'name': 'Vanity Tables', 'description': 'Beautiful vanity tables'},
            ],
            'Dining Room': [
                {'name': 'Dining Tables', 'description': 'Elegant dining tables'},
                {'name': 'Dining Chairs', 'description': 'Comfortable dining chairs'},
                {'name': 'Buffets', 'description': 'Stylish buffets and sideboards'},
                {'name': 'Bar Stools', 'description': 'Modern bar stools'},
            ],
            'Office': [
                {'name': 'Desks', 'description': 'Professional office desks'},
                {'name': 'Office Chairs', 'description': 'Ergonomic office chairs'},
                {'name': 'Filing Cabinets', 'description': 'Practical filing cabinets'},
                {'name': 'Bookshelves', 'description': 'Office bookshelves and storage'},
            ],
            'Outdoor': [
                {'name': 'Patio Sets', 'description': 'Complete patio furniture sets'},
                {'name': 'Garden Chairs', 'description': 'Comfortable garden chairs'},
                {'name': 'Outdoor Tables', 'description': 'Durable outdoor tables'},
                {'name': 'Hammocks', 'description': 'Relaxing hammocks and swings'},
            ]
        }
        
        subcategories = {}
        for category_name, subcats in subcategories_data.items():
            category = categories[category_name]
            for subcat_data in subcats:
                subcategory, created = Subcategory.objects.get_or_create(
                    name=subcat_data['name'],
                    category=category,
                    defaults=subcat_data
                )
                subcategories[f"{category_name}_{subcat_data['name']}"] = subcategory
                if created:
                    self.stdout.write(f'Created subcategory: {category.name} - {subcategory.name}')
        
        # Create Sample Products
        products_data = [
            # Living Room - Sofas
            {
                'name': 'Modern Comfort Sofa',
                'category': 'Living Room',
                'subcategory': 'Sofas',
                'price': 899.99,
                'sale_price': 749.99,
                'description': 'A modern, comfortable 3-seater sofa with premium fabric upholstery. Perfect for any living room.',
                'short_description': 'Modern 3-seater sofa with premium fabric',
                'material': 'fabric',
                'color': 'Gray',
                'dimensions_length': 220.0,
                'dimensions_width': 85.0,
                'dimensions_height': 75.0,
                'weight': 45.0,
                'stock_quantity': 15,
                'is_featured': True,
                'features': ['Premium fabric', 'High-density foam', 'Sturdy wooden frame', 'Easy to clean'],
            },
            {
                'name': 'Leather Recliner Sofa',
                'category': 'Living Room',
                'subcategory': 'Sofas',
                'price': 1299.99,
                'description': 'Luxurious leather recliner sofa with power reclining mechanism. Ultimate comfort for movie nights.',
                'short_description': 'Power reclining leather sofa',
                'material': 'leather',
                'color': 'Brown',
                'dimensions_length': 200.0,
                'dimensions_width': 90.0,
                'dimensions_height': 80.0,
                'weight': 60.0,
                'stock_quantity': 8,
                'is_bestseller': True,
                'features': ['Genuine leather', 'Power reclining', 'USB charging ports', 'Cup holders'],
            },
            # Living Room - Coffee Tables
            {
                'name': 'Rustic Wood Coffee Table',
                'category': 'Living Room',
                'subcategory': 'Coffee Tables',
                'price': 299.99,
                'description': 'Beautiful rustic wood coffee table with natural finish. Perfect centerpiece for your living room.',
                'short_description': 'Rustic wood coffee table',
                'material': 'wood',
                'finish': 'natural',
                'color': 'Natural Wood',
                'dimensions_length': 120.0,
                'dimensions_width': 60.0,
                'dimensions_height': 45.0,
                'weight': 25.0,
                'stock_quantity': 20,
                'features': ['Solid wood construction', 'Natural finish', 'Sturdy design', 'Easy assembly'],
            },
            # Bedroom - Beds
            {
                'name': 'Queen Platform Bed',
                'category': 'Bedroom',
                'subcategory': 'Beds',
                'price': 599.99,
                'sale_price': 499.99,
                'description': 'Modern queen platform bed with upholstered headboard. Includes under-bed storage drawers.',
                'short_description': 'Queen platform bed with storage',
                'material': 'mixed',
                'color': 'Charcoal',
                'dimensions_length': 210.0,
                'dimensions_width': 160.0,
                'dimensions_height': 90.0,
                'weight': 35.0,
                'stock_quantity': 12,
                'is_featured': True,
                'features': ['Upholstered headboard', 'Under-bed storage', 'No box spring needed', 'Easy assembly'],
            },
            {
                'name': 'King Size Canopy Bed',
                'category': 'Bedroom',
                'subcategory': 'Beds',
                'price': 899.99,
                'description': 'Elegant king-size canopy bed with metal frame. Creates a romantic and luxurious bedroom atmosphere.',
                'short_description': 'King canopy bed with metal frame',
                'material': 'metal',
                'finish': 'polished',
                'color': 'Silver',
                'dimensions_length': 220.0,
                'dimensions_width': 180.0,
                'dimensions_height': 200.0,
                'weight': 45.0,
                'stock_quantity': 5,
                'features': ['Metal canopy frame', 'Elegant design', 'King size', 'Easy to assemble'],
            },
            # Dining Room - Dining Tables
            {
                'name': 'Extendable Dining Table',
                'category': 'Dining Room',
                'subcategory': 'Dining Tables',
                'price': 799.99,
                'description': 'Beautiful extendable dining table that seats 6-8 people. Perfect for family gatherings.',
                'short_description': 'Extendable dining table for 6-8 people',
                'material': 'wood',
                'finish': 'stained',
                'color': 'Walnut',
                'dimensions_length': 180.0,
                'dimensions_width': 90.0,
                'dimensions_height': 75.0,
                'weight': 40.0,
                'stock_quantity': 10,
                'is_bestseller': True,
                'features': ['Extendable design', 'Seats 6-8 people', 'Solid wood top', 'Sturdy construction'],
            },
            # Office - Desks
            {
                'name': 'L-Shaped Office Desk',
                'category': 'Office',
                'subcategory': 'Desks',
                'price': 449.99,
                'sale_price': 399.99,
                'description': 'Spacious L-shaped office desk with built-in cable management. Perfect for home office or study.',
                'short_description': 'L-shaped desk with cable management',
                'material': 'mixed',
                'color': 'White',
                'dimensions_length': 140.0,
                'dimensions_width': 120.0,
                'dimensions_height': 75.0,
                'weight': 30.0,
                'stock_quantity': 18,
                'features': ['L-shaped design', 'Cable management', 'Built-in storage', 'Adjustable feet'],
            },
            # Outdoor - Patio Sets
            {
                'name': 'Wicker Patio Set',
                'category': 'Outdoor',
                'subcategory': 'Patio Sets',
                'price': 649.99,
                'description': 'Beautiful wicker patio set with 4 chairs and glass-top table. Perfect for outdoor entertaining.',
                'short_description': 'Wicker patio set with 4 chairs',
                'material': 'mixed',
                'color': 'Beige',
                'dimensions_length': 120.0,
                'dimensions_width': 120.0,
                'dimensions_height': 75.0,
                'weight': 25.0,
                'stock_quantity': 8,
                'features': ['Weather-resistant wicker', 'Glass table top', '4 comfortable chairs', 'Easy to clean'],
            },
        ]
        
        for product_data in products_data:
            category = categories[product_data['category']]
            subcategory = subcategories[f"{product_data['category']}_{product_data['subcategory']}"]
            
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults={
                    'category': category,
                    'subcategory': subcategory,
                    'price': product_data['price'],
                    'sale_price': product_data.get('sale_price'),
                    'description': product_data['description'],
                    'short_description': product_data['short_description'],
                    'material': product_data['material'],
                    'color': product_data['color'],
                    'dimensions_length': product_data.get('dimensions_length'),
                    'dimensions_width': product_data.get('dimensions_width'),
                    'dimensions_height': product_data.get('dimensions_height'),
                    'weight': product_data.get('weight'),
                    'stock_quantity': product_data['stock_quantity'],
                    'is_featured': product_data.get('is_featured', False),
                    'is_bestseller': product_data.get('is_bestseller', False),
                    'features': product_data.get('features', []),
                    'finish': product_data.get('finish', ''),
                }
            )
            
            if created:
                self.stdout.write(f'Created product: {product.name}')
        
        self.stdout.write(
            self.style.SUCCESS('Successfully populated database with sample furniture data!')
        ) 