import { validateRequest } from "@/lib/validate-request";
import { db } from "@/db";
import { itemsTable, paymentTable } from "@/db/schema";
import PurchasedProducts from "@/components/PurchasedProducts";
import { sql } from "drizzle-orm";

export default async function Orders() {
  const { user } = await validateRequest();

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 text-black">
        <p>You need to be logged in to view your orders.</p>
      </main>
    );
  }

  const purchasedProducts = await db
    .select({
      payment: paymentTable,
      product: itemsTable,
    })
    .from(paymentTable)
    .leftJoin(itemsTable, sql`payment.product_id = items.id`)
    .where(sql`payment.user_id = ${user.id}`);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
      {purchasedProducts.length === 0 ? (
        <p className="text-xl">No products available.</p>
      ) : (
        <>
        <h1 className="text-2xl font-bold mb-8 text-center">Purchased Product Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {purchasedProducts.map(({ payment, product }) => (
            <PurchasedProducts
              key={payment.id}
              payment={payment}
              product={product}
            />
          ))}
          </div>
        </>    
      )}
    </main>
  );
}
