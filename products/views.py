from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Avg, Count, F
from django.shortcuts import get_object_or_404

from .models import Category, Subcategory, Product, ProductImage, ProductReview
from .serializers import (
    CategorySerializer, SubcategorySerializer, ProductSerializer,
    ProductListSerializer, ProductDetailSerializer, ProductImageSerializer,
    ProductReviewSerializer
)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for furniture categories"""
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    
    @action(detail=True, methods=['get'])
    def products(self, request, slug=None):
        """Get all products in a category"""
        category = self.get_object()
        products = Product.objects.filter(
            category=category,
            is_active=True
        ).select_related('category', 'subcategory').prefetch_related('images')
        
        # Apply filters
        subcategory = request.query_params.get('subcategory')
        if subcategory:
            products = products.filter(subcategory__slug=subcategory)
        
        material = request.query_params.get('material')
        if material:
            products = products.filter(material=material)
        
        min_price = request.query_params.get('min_price')
        if min_price:
            products = products.filter(price__gte=min_price)
        
        max_price = request.query_params.get('max_price')
        if max_price:
            products = products.filter(price__lte=max_price)
        
        # Apply ordering
        ordering = request.query_params.get('ordering', '-created_at')
        products = products.order_by(ordering)
        
        page = self.paginate_queryset(products)
        if page is not None:
            serializer = ProductListSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        
        serializer = ProductListSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

class SubcategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for furniture subcategories"""
    queryset = Subcategory.objects.filter(is_active=True)
    serializer_class = SubcategorySerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']
    
    @action(detail=True, methods=['get'])
    def products(self, request, slug=None):
        """Get all products in a subcategory"""
        subcategory = self.get_object()
        products = Product.objects.filter(
            subcategory=subcategory,
            is_active=True
        ).select_related('category', 'subcategory').prefetch_related('images')
        
        # Apply filters
        material = request.query_params.get('material')
        if material:
            products = products.filter(material=material)
        
        min_price = request.query_params.get('min_price')
        if min_price:
            products = products.filter(price__gte=min_price)
        
        max_price = request.query_params.get('max_price')
        if max_price:
            products = products.filter(price__lte=max_price)
        
        # Apply ordering
        ordering = request.query_params.get('ordering', '-created_at')
        products = products.order_by(ordering)
        
        page = self.paginate_queryset(products)
        if page is not None:
            serializer = ProductListSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        
        serializer = ProductListSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for furniture products"""
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductListSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'subcategory', 'material', 'finish', 'color', 'is_featured', 'is_bestseller']
    search_fields = ['name', 'description', 'short_description', 'sku']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = Product.objects.filter(is_active=True).select_related(
            'category', 'subcategory'
        ).prefetch_related('images', 'reviews')
        
        # Filter by price range
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        
        # Filter by sale items
        on_sale = self.request.query_params.get('on_sale')
        if on_sale == 'true':
            queryset = queryset.filter(sale_price__isnull=False).filter(sale_price__lt=F('price'))
        
        # Filter by stock availability
        in_stock = self.request.query_params.get('in_stock')
        if in_stock == 'true':
            queryset = queryset.filter(stock_quantity__gt=0)
        
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured products"""
        products = self.get_queryset().filter(is_featured=True)
        page = self.paginate_queryset(products)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def bestsellers(self, request):
        """Get bestseller products"""
        products = self.get_queryset().filter(is_bestseller=True)
        page = self.paginate_queryset(products)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def on_sale(self, request):
        """Get products on sale"""
        products = self.get_queryset().filter(
            sale_price__isnull=False
        ).filter(sale_price__lt=F('price'))
        
        page = self.paginate_queryset(products)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Advanced search functionality"""
        query = request.query_params.get('q', '')
        if not query:
            return Response({'error': 'Search query is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        products = self.get_queryset().filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(short_description__icontains=query) |
            Q(sku__icontains=query) |
            Q(category__name__icontains=query) |
            Q(subcategory__name__icontains=query)
        )
        
        page = self.paginate_queryset(products)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

class ProductImageViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for product images"""
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['product', 'is_primary']

class ProductReviewViewSet(viewsets.ModelViewSet):
    """ViewSet for product reviews"""
    queryset = ProductReview.objects.filter(is_approved=True)
    serializer_class = ProductReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        product_slug = self.kwargs.get('product_slug')
        if product_slug:
            return ProductReview.objects.filter(
                product__slug=product_slug,
                is_approved=True
            )
        return ProductReview.objects.filter(is_approved=True)
    
    def create(self, request, *args, **kwargs):
        product_slug = self.kwargs.get('product_slug')
        if product_slug:
            product = get_object_or_404(Product, slug=product_slug, is_active=True)
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return super().create(request, *args, **kwargs)
