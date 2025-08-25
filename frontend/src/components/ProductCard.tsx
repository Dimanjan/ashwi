import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';
import { formatPriceNPR } from '../utils/currency';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const average = product.average_rating || 0;
  const primaryImage = product.primary_image || product.images?.[0] || null;
  const priceText = formatPriceNPR(product.sale_price || product.price);
  const strikeText = product.sale_price ? formatPriceNPR(product.price) : '';

  return (
    <div className="product-card">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-gray-100">
          {primaryImage ? (
            <img
              src={primaryImage.image_url || primaryImage.image}
              alt={primaryImage.alt_text || product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
          {product.is_featured && (
            <span className="absolute top-2 left-2 badge badge-featured">Featured</span>
          )}
          {product.is_bestseller && (
            <span className="absolute top-2 right-2 badge badge-bestseller">Bestseller</span>
          )}
          {product.sale_price && (
            <span className="absolute bottom-2 left-2 badge badge-sale">On Sale</span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
          <p className="text-sm text-gray-600 truncate">{product.category?.name}{product.subcategory ? ` • ${product.subcategory.name}` : ''}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="price-tag">{priceText}</span>
            {strikeText && <span className="sale-price">{strikeText}</span>}
          </div>
          <div className="mt-2 flex items-center">
            {[1,2,3,4,5].map((i) => (
              i <= Math.round(average) ? (
                <StarIconSolid key={i} className="w-4 h-4 text-yellow-400" />
              ) : (
                <StarIcon key={i} className="w-4 h-4 text-gray-300" />
              )
            ))}
            <span className="ml-2 text-xs text-gray-500">{product.review_count} reviews</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 