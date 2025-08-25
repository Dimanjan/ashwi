from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Category, Subcategory, Product, ProductImage, ProductReview
from decimal import Decimal

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ['image', 'alt_text', 'is_primary', 'order']

class ProductReviewInline(admin.TabularInline):
    model = ProductReview
    extra = 0
    readonly_fields = ['created_at']
    fields = ['customer_name', 'rating', 'title', 'comment', 'is_approved', 'created_at']


def _format_npr(amount):
    try:
        value = Decimal(amount)
    except Exception:
        try:
            value = Decimal(str(amount))
        except Exception:
            return f"NPR {amount}"
    # No decimals for price display
    return f"NPR {value:,.0f}"

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_active', 'product_count', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at']
    
    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = 'Products'

@admin.register(Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'slug', 'is_active', 'product_count', 'created_at']
    list_filter = ['category', 'is_active', 'created_at']
    search_fields = ['name', 'description', 'category__name']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ['created_at', 'updated_at']
    
    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = 'Products'

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'category', 'subcategory', 'price', 'current_price_display', 
        'stock_quantity', 'is_active', 'is_featured', 'is_bestseller', 'created_at'
    ]
    list_filter = [
        'category', 'subcategory', 'is_active', 'is_featured', 'is_bestseller',
        'material', 'finish', 'created_at'
    ]
    search_fields = ['name', 'sku', 'description', 'category__name', 'subcategory__name']
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = [
        'sku', 'created_at', 'updated_at', 'is_on_sale', 'discount_percentage',
        'is_low_stock', 'is_out_of_stock', 'price_display_npr', 'sale_price_display_npr', 'cost_price_display_npr'
    ]
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'sku', 'category', 'subcategory')
        }),
        ('Description', {
            'fields': ('short_description', 'description')
        }),
        ('Pricing', {
            'fields': (
                ('price', 'price_display_npr'),
                ('sale_price', 'sale_price_display_npr'),
                ('cost_price', 'cost_price_display_npr'),
            )
        }),
        ('Inventory', {
            'fields': ('stock_quantity', 'low_stock_threshold')
        }),
        ('Specifications', {
            'fields': ('material', 'finish', 'dimensions_length', 'dimensions_width', 
                      'dimensions_height', 'weight', 'color')
        }),
        ('Features & SEO', {
            'fields': ('features', 'specifications', 'meta_title', 'meta_description')
        }),
        ('Status', {
            'fields': ('is_active', 'is_featured', 'is_bestseller')
        }),
        ('System Information', {
            'fields': ('created_at', 'updated_at', 'is_on_sale', 'discount_percentage',
                      'is_low_stock', 'is_out_of_stock'),
            'classes': ('collapse',)
        }),
    )
    inlines = [ProductImageInline, ProductReviewInline]
    
    def current_price_display(self, obj):
        if obj.is_on_sale:
            return format_html(
                '<span style="text-decoration: line-through; color: #999;">{}</span> '
                '<span style="color: #e74c3c; font-weight: bold;">{}</span>',
                _format_npr(obj.price), _format_npr(obj.sale_price)
            )
        return _format_npr(obj.price)
    current_price_display.short_description = 'Price (NPR)'

    # Readonly display helpers inside Pricing
    def price_display_npr(self, obj):
        return _format_npr(obj.price) if obj.price is not None else '-'
    price_display_npr.short_description = 'Price (NPR)'

    def sale_price_display_npr(self, obj):
        return _format_npr(obj.sale_price) if obj.sale_price else '-'
    sale_price_display_npr.short_description = 'Sale Price (NPR)'

    def cost_price_display_npr(self, obj):
        return _format_npr(obj.cost_price) if obj.cost_price else '-'
    cost_price_display_npr.short_description = 'Cost Price (NPR)'

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'image_preview', 'is_primary', 'order', 'created_at']
    list_filter = ['is_primary', 'created_at']
    search_fields = ['product__name', 'alt_text']
    readonly_fields = ['created_at']
    
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 50px; max-width: 50px;" />',
                obj.image.url
            )
        return "No image"
    image_preview.short_description = 'Preview'

@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'customer_name', 'rating', 'title', 'is_approved', 'created_at']
    list_filter = ['rating', 'is_approved', 'created_at']
    search_fields = ['product__name', 'customer_name', 'title', 'comment']
    readonly_fields = ['created_at']
    actions = ['approve_reviews', 'disapprove_reviews']
    
    def approve_reviews(self, request, queryset):
        updated = queryset.update(is_approved=True)
        self.message_user(request, f'{updated} reviews have been approved.')
    approve_reviews.short_description = "Approve selected reviews"
    
    def disapprove_reviews(self, request, queryset):
        updated = queryset.update(is_approved=False)
        self.message_user(request, f'{updated} reviews have been disapproved.')
    disapprove_reviews.short_description = "Disapprove selected reviews"
