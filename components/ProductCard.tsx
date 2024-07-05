"use client";
import Link from "next/link";
import React from "react";

interface Product {
  id: string;
  productName: string;
  image: string;
  quantity: number;
  price: number;
}

interface ProductCardProps {
  product: Product;
  productLink: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, productLink }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div>
        <img
          src={product.image}
          alt={product.productName}
          className="w-full h-40 object-cover mb-4 rounded-lg"
        />
        <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
        <p className="text-gray-700 mb-2">Quantity: {product.quantity}</p>
        <p className="text-gray-700">Price: ${product.price}</p>
      </div>
      <Link href={productLink} className="bg-black text-white px-4 py-2 mt-2  rounded">
        Buy!
      </Link>
    </div>
  );
};

export default ProductCard;
