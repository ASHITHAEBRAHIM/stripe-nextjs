"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const productName = formData.get("productName") as string;
    const image = formData.get("image") as string;
    const quantity = parseInt(formData.get("quantity") as string);
    const price = parseInt(formData.get("price") as string);

	const response = await fetch("/api/addProducts", {
		method: "POST",
		body: formData, // Send FormData object directly
	  });
	  
    if (response.ok) {
      router.push("/");
    } else {
      console.error("Error adding product:", await response.text());
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Product Name</label>
        <Input name="productName" id="productName" required />
        <br />
        <label htmlFor="image">Image</label>
        <Input name="image" id="image" type="file" required />
        <br />
        <label htmlFor="quantity">Quantity</label>
        <Input type="number" name="quantity" id="quantity" required />
        <br />
        <label htmlFor="price">Price</label>
        <Input type="number" name="price" id="price" required />
        <br />
        <Button type="submit">Add Products</Button>
      </form>
      <div className="flex justify-between gap-4">
        <Link className="mt-4" href="/">
          Back
        </Link>
      </div>
    </>
  );
}
