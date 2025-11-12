import imagekit from "@/configs/imageKit"
import prisma from "@/lib/prisma"
import authSeller from "@/middlewares/authSeller"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
// Add a new product
export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const storeId = await authSeller(userId)
        if (!storeId) {
            return NextResponse.json({ error: 'not authorized' }, { status: 401 })
        }
        // Get the data from the form
        const formData = await request.formData()
        const name = formData.get("name")
        const description = formData.get("description")
        const mrp = Number(formData.get("mrp"))
        const price = Number(formData.get("price"))
        const category = formData.get("category")
        const images = formData.getAll("images")

        if (!name || !description || !mrp || !price || !category || images.length <
            1) {
            return NextResponse.json({ error: 'missing product details' }, {
                status:
                    400
            })
        }
        // Uploading Images to ImageKit
        const imagesUrl = await Promise.all(images.map(async (image) => {
            // Convert uploaded File to base64 data URL before sending to ImageKit
            const arrayBuffer = await image.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            const fileData = `data:${image.type || 'application/octet-stream'};base64,${base64}`;

            const response = await imagekit.files.upload({
                file: fileData,
                fileName: image.name || `product-${Date.now()}`,
                folder: "products",
            })
            // Prefer full URL returned by ImageKit when available; otherwise build optimized URL
            const optimizedImage = response?.url || imagekit.helper.buildSrc({
                urlEndpoint: imagekit.urlEndpoint,
                src: response.filePath,
                transformation: [
                    { quality: "auto" },
                    { format: "webp" },
                    { width: 512 },
                ],
            });
            // Debug: log ImageKit response to ensure uploads succeed and what URL we saved
            console.log('ImageKit upload response:', { filePath: response?.filePath, name: response?.name, url: response?.url, optimizedImage })
 /*           const url = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '1024' }
                ]
            })
                */
            return optimizedImage
        }))
        // Debug: log the URLs we're about to save to DB
        console.log('Images URLs to save:', imagesUrl)

        const createdProduct = await prisma.product.create({
            data: {
                name,
                description,
                mrp,
                price,
                category,
                images: imagesUrl,
                storeId
            }
        })

        // Debug: confirm what was saved
        console.log('Created product images:', createdProduct?.images)

        return NextResponse.json({ message: "Product added successfully", product: createdProduct })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, {
            status:
                400
        })
    }
}
// Get all products for a seller
export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        const storeId = await authSeller(userId)
        if (!storeId) {
            return NextResponse.json({ error: 'not authorized' }, { status: 401 })
        }
        const products = await prisma.product.findMany({ where: { storeId } })
        return NextResponse.json({ products })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, {
            status:
                400
        })
    }
}