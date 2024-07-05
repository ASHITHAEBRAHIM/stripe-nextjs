import { validateRequest } from "@/lib/validate-request";
import Link from "next/link";
import { logout } from "./logout";
import ProductCard from "@/components/ProductCard";
import { db } from "@/db";
import { itemsTable } from "@/db/schema";
import { constants } from "@/lib/constants";

export default async function Home() {
  const { user } = await validateRequest();
  const products = await db.select().from(itemsTable);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
      <h1 className="text-4xl">Buy Your Product</h1>

      {user ? (
        <div className="flex justify-between gap-4">
          <p>Welcome {user.username}!</p>
          <form action={logout}>
            <button>Sign out</button>
          </form>
          <Link href="/orders">View Purchased Products</Link>
        </div>
      ) : (
        <>
          <Link href="/login">Login</Link>
        </>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const productName =
            product.productName as keyof typeof constants.paymentLinks;
            const productLink = `${constants.paymentLinks[productName]}?client_reference_id=${user?.id}&productId=${product.id}`;
          return (
            <ProductCard
              key={product.id}
              product={product}
              productLink={productLink}
            />
          );
        })}
      </div>
    </main>
  );
}
