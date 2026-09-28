from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

class CategoryBase(BaseModel):
    name: str
    slug: Optional[str] = None
    description: Optional[str] = ""
    image: Optional[str] = None
    is_active: bool = True

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int
    product_count: int = 0
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True

class SubcategoryBase(BaseModel):
    name: str
    slug: Optional[str] = None
    description: Optional[str] = ""
    image: Optional[str] = None
    is_active: bool = True
    category_id: int

class SubcategoryCreate(SubcategoryBase):
    pass

class SubcategoryResponse(SubcategoryBase):
    id: int
    category: Optional[CategoryResponse] = None
    product_count: int = 0
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True

class ProductImageResponse(BaseModel):
    id: int
    image: str
    image_url: str
    alt_text: str = ""
    is_primary: bool = False
    order: int = 0
    created_at: str

class ProductImageCreate(BaseModel):
    image_url: str
    alt_text: Optional[str] = ""
    is_primary: bool = False
    order: int = 0

class ProductReviewCreate(BaseModel):
    customer_name: str
    email: str
    rating: int = Field(ge=1, le=5)
    title: Optional[str] = ""
    comment: str

class ProductReviewResponse(ProductReviewCreate):
    id: int
    is_approved: bool = True
    created_at: str

class ProductCreate(BaseModel):
    name: str
    slug: Optional[str] = None
    sku: Optional[str] = None
    category_id: int
    subcategory_id: Optional[int] = None
    short_description: Optional[str] = ""
    description: str
    price: float
    sale_price: Optional[float] = None
    cost_price: Optional[float] = None
    stock_quantity: int = 0
    low_stock_threshold: int = 5
    material: Optional[str] = ""
    finish: Optional[str] = ""
    dimensions_length: Optional[float] = None
    dimensions_width: Optional[float] = None
    dimensions_height: Optional[float] = None
    weight: Optional[float] = None
    color: Optional[str] = ""
    features: List[str] = Field(default_factory=list)
    specifications: Dict[str, Any] = Field(default_factory=dict)
    is_active: bool = True
    is_featured: bool = False
    is_bestseller: bool = False
    meta_title: Optional[str] = ""
    meta_description: Optional[str] = ""
    images: List[ProductImageCreate] = Field(default_factory=list)

class ProductResponse(BaseModel):
    id: int
    name: str
    slug: str
    sku: str
    category: CategoryResponse
    subcategory: Optional[SubcategoryResponse] = None
    category_id: int
    subcategory_id: Optional[int] = None
    short_description: str = ""
    description: str
    price: str
    sale_price: Optional[str] = None
    cost_price: Optional[str] = None
    stock_quantity: int = 0
    low_stock_threshold: int = 5
    material: str = ""
    finish: str = ""
    dimensions_length: Optional[float] = None
    dimensions_width: Optional[float] = None
    dimensions_height: Optional[float] = None
    weight: Optional[float] = None
    color: str = ""
    features: List[str] = Field(default_factory=list)
    specifications: Dict[str, Any] = Field(default_factory=dict)
    is_active: bool = True
    is_featured: bool = False
    is_bestseller: bool = False
    meta_title: str = ""
    meta_description: str = ""
    images: List[ProductImageResponse] = Field(default_factory=list)
    primary_image: Optional[ProductImageResponse] = None
    reviews: List[ProductReviewResponse] = Field(default_factory=list)
    average_rating: float = 5.0
    review_count: int = 0
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True

class ProductListResponse(BaseModel):
    count: int
    next: Optional[str] = None
    previous: Optional[str] = None
    results: List[ProductResponse]

class CategoryListResponse(BaseModel):
    count: int
    next: Optional[str] = None
    previous: Optional[str] = None
    results: List[CategoryResponse]

class SubcategoryListResponse(BaseModel):
    count: int
    next: Optional[str] = None
    previous: Optional[str] = None
    results: List[SubcategoryResponse]
