import React from "react";

interface PaymentDetails {
  id: string;
  userId: string;
  productId: string;
  userEmail: string;
  amount: number;
  paymentDetails: string;
  paymentType: string;
  createdDate: string;
  currency: string | null;
}

interface ProductDetails {
  id: string;
  productName: string;
  image: string;
  quantity: number;
  price: number;
}

interface PurchasedProductProps {
  payment: PaymentDetails;
  product: ProductDetails | null;
}

const PurchasedProducts: React.FC<PurchasedProductProps> = ({ payment, product }) => {
  return (
    <div className="p-4 border rounded shadow-md">
      {product ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">{product.productName}</h2>
          <img src={product.image} alt={product.productName} className="w-full h-auto" />
        </>
      ) : (
        <p>Product details not available</p>
      )}
      <hr className="my-4" />
      <h3 className="text-lg font-bold">Payment Details</h3>
      <p>Email: {payment.userEmail}</p>
      <p>Amount: {payment.amount}</p>
      <p>Payment Type: {payment.paymentType}</p>
      <p>Created Date: {new Date(payment.createdDate).toLocaleString()}</p>
      <p>Currency: {payment.currency ?? "N/A"}</p>
    </div>
  );
};

export default PurchasedProducts;
