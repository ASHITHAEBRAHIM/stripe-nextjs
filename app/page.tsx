'use client'
import { checkout } from "@/checkout";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-black">
      <h1 className="text-4xl">Buy Your Product</h1>
      <div className="flex justify-center mt-12">
        <div>
          <Image src="/product1.jpg" alt="product1" width={400} height={400} priority />
          <p className=" text-2xl mt-2">Product 1</p>
          <Button onClick={(() => {
            checkout({
              lineItems: [
                {
                  price: "price_1PWBfLSDB9FdCiLxEeQy7Fbc",
                  quantity: 1
                }
              ]
            })
          })} className="mt-2">BUY!</Button>
        </div>

        <div>
          <Image src="/product2.jpg" alt="product1" width={400} height={400} priority />
          <p className=" text-2xl mt-2">Product 2</p>
          <Button onClick={(() => {
            checkout({
              lineItems: [
                {
                  price: "price_1PWBgPSDB9FdCiLxIAH1dbXh",
                  quantity: 1
                }
              ]
            })
          })} className="mt-2">BUY!</Button>
        </div>
      </div>
    </main>
  );
}
