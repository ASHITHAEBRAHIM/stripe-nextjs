import ProductForm from "./ProductForm";

export default async function AddProducts() {
  return (
    <div className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Add your Products
      </h2>
      <ProductForm />
    </div>
  );
}
