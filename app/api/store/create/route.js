import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// create the store
export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        // Get the data from the form
        const formData = await request.formData()
        const name = formData.get("name")
        const username = formData.get("username")
        const description = formData.get("description")
        const email = formData.get("email")
        const contact = formData.get("contact")
        const address = formData.get("address")
        const image = formData.get("image")
        if (!name || !username || !description || !email || !contact || !address ||
            !image) {
            return NextResponse.json({ error: "missing store info" }, { status: 400 })
        }
        // check is user have already registered a store
        const store = await prisma.store.findFirst({
            where: { userId: userId }
        })
        // if store is already registered then send status of store
        if (store) {
            return NextResponse.json({ status: store.status })
        }
        // check if username is already taken
        const isUsernameTaken = await prisma.store.findFirst({
            where: { username: username.toLowerCase() }
        })
        if (isUsernameTaken) {
            return NextResponse.json({ error: "username already taken" }, {
                status:
                    400
            })
        }
        // image upload to imagekit: convert File -> base64 data URL for reliable uploads
        const arrayBuffer = await image.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const fileData = `data:${image.type || 'application/octet-stream'};base64,${base64}`;
        const response = await imagekit.files.upload({
            file: fileData,
            fileName: image.name || `logo-${Date.now()}`,
            folder: "logos"
        })
        // Debug: ensure ImageKit returned a usable filePath/url
        console.log('ImageKit store logo upload response:', { filePath: response?.filePath, name: response?.name, url: response?.url })
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
        console.log('ImageKit store logo upload response (final):', { filePath: response?.filePath, name: response?.name, url: response?.url, optimizedImage })
        const newStore = await prisma.store.create({
            data: {
                userId,
                name,
                description,
                username: username.toLowerCase(),
                email,
                contact,
                address,
                logo: optimizedImage
            }
        })
        // link store to user
        await prisma.user.update({
            where: { id: userId },
            data: { store: { connect: { id: newStore.id } } }
        })
        return NextResponse.json({ message: "applied, waiting for approval" })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, {
            status:
                400
        })
    }
}
// check is user have already registered a store if yes then send status of store
export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        // check is user have already registered a store
        const store = await prisma.store.findFirst({
            where: { userId: userId }
        })
        // if store is already registered then send status of store
        if (store) {
            return NextResponse.json({ status: store.status })
        }
        return NextResponse.json({ status: "not registered" })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, {
            status:
                400
        })
    }
}