from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

# Create the main router
router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'subcategories', views.SubcategoryViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'product-images', views.ProductImageViewSet)

# Create nested router for product reviews
products_router = routers.NestedDefaultRouter(router, r'products', lookup='product')
products_router.register(r'reviews', views.ProductReviewViewSet, basename='product-reviews')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(products_router.urls)),
] 