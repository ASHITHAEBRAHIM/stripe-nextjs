import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { promises as fs } from "fs";
import path from "path";
import { itemsTable } from "@/db/schema";

export default async function handler(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ status: "Failed", error: "Method not allowed" }, { status: 405 });
  }

  try {
    const data = await req.formData();
    const productName = data.get("productName") as string;
    const imageFile = data.get("image") as File;
    const quantity = parseInt(data.get("quantity") as string);
    const price = parseInt(data.get("price") as string);

    // Save the image file
    const imagePath = path.join(process.cwd(), "public", "uploads", imageFile.name);
    await fs.writeFile(imagePath, Buffer.from(await imageFile.arrayBuffer()));

    await db.insert(itemsTable).values({
      id: crypto.randomUUID(),
      productName,
      image: `/uploads/${imageFile.name}`, // Store the relative path to the image
      quantity,
      price,
    });

    return NextResponse.json({ status: "Success", message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ status: "Failed", message: "Error adding product" }, { status: 500 });
  }
}
