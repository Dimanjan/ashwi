from rest_framework import serializers
from .models import Category, Subcategory, Product, ProductImage, ProductReview

class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'image', 'is_active', 
            'product_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']
    
    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()

class SubcategorySerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    product_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Subcategory
        fields = [
            'id', 'name', 'slug', 'description', 'image', 'is_active',
            'category', 'category_id', 'product_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']
    
    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()

class ProductImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'image_url', 'alt_text', 'is_primary', 'order', 'created_at']
        read_only_fields = ['created_at']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = [
            'id', 'customer_name', 'email', 'rating', 'title', 'comment',
            'is_approved', 'created_at'
        ]
        read_only_fields = ['is_approved', 'created_at']
    
    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    subcategory = SubcategorySerializer(read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    subcategory_id = serializers.IntegerField(write_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    primary_image = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'sku', 'category', 'subcategory',
            'category_id', 'subcategory_id', 'short_description', 'description',
            'price', 'sale_price', 'cost_price', 'stock_quantity', 'low_stock_threshold',
            'material', 'finish', 'dimensions_length', 'dimensions_width', 'dimensions_height',
            'weight', 'color', 'features', 'specifications', 'is_active', 'is_featured',
            'is_bestseller', 'meta_title', 'meta_description', 'images', 'primary_image',
            'reviews', 'average_rating', 'review_count', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'slug', 'sku', 'created_at', 'updated_at'
        ]
    
    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            return ProductImageSerializer(primary_image, context=self.context).data
        # Return first image if no primary image
        first_image = obj.images.first()
        if first_image:
            return ProductImageSerializer(first_image, context=self.context).data
        return None
    
    def get_average_rating(self, obj):
        approved_reviews = obj.reviews.filter(is_approved=True)
        if approved_reviews.exists():
            total_rating = sum(review.rating for review in approved_reviews)
            return round(total_rating / approved_reviews.count(), 1)
        return 0
    
    def get_review_count(self, obj):
        return obj.reviews.filter(is_approved=True).count()

class ProductListSerializer(serializers.ModelSerializer):
    """Simplified serializer for product listings"""
    category = CategorySerializer(read_only=True)
    subcategory = SubcategorySerializer(read_only=True)
    primary_image = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'subcategory', 'price', 'sale_price',
            'stock_quantity', 'material', 'color', 'is_featured', 'is_bestseller',
            'primary_image', 'average_rating', 'review_count', 'created_at'
        ]
        read_only_fields = ['slug', 'created_at']
    
    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary=True).first()
        if primary_image:
            return ProductImageSerializer(primary_image, context=self.context).data
        first_image = obj.images.first()
        if first_image:
            return ProductImageSerializer(first_image, context=self.context).data
        return None
    
    def get_average_rating(self, obj):
        approved_reviews = obj.reviews.filter(is_approved=True)
        if approved_reviews.exists():
            total_rating = sum(review.rating for review in approved_reviews)
            return round(total_rating / approved_reviews.count(), 1)
        return 0
    
    def get_review_count(self, obj):
        return obj.reviews.filter(is_approved=True).count()

class ProductDetailSerializer(ProductSerializer):
    """Detailed serializer for single product view"""
    related_products = serializers.SerializerMethodField()
    
    class Meta(ProductSerializer.Meta):
        fields = ProductSerializer.Meta.fields + ['related_products']
    
    def get_related_products(self, obj):
        # Get products from same category and subcategory
        related = Product.objects.filter(
            category=obj.category,
            subcategory=obj.subcategory,
            is_active=True
        ).exclude(id=obj.id)[:4]
        
        return ProductListSerializer(related, many=True, context=self.context).data 