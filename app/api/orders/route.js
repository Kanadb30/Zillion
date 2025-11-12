import { getAuth } from '@clerk/nextjs/server'
import { PaymentMethod } from '@prisma/client'
import { parse } from 'date-fns'
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json({ error: 'not authorized' }, { status: 401 });
        }

        const { addressId, items, paymentMethod } = await request.json();

        if (!addressId || !items || items.length < 1 || !paymentMethod) {
            console.error('Missing order details:', { addressId, items, paymentMethod });
            return NextResponse.json({ error: 'missing order details' }, { status: 400 });
        }

        const ordersByStore = new Map();
        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.id },
            });
            if (!product) {
                console.error('Product not found:', item.id);
                continue;
            }
            const storeId = product.storeId;
            if (!ordersByStore.has(storeId)) {
                ordersByStore.set(storeId, []);
            }
            ordersByStore.get(storeId).push({ ...item, price: product.price });
        }

        let orderIds = [];
        let fullAmount = 0;

        for (const [storeId, sellerItems] of ordersByStore.entries()) {
            let total = sellerItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            fullAmount += parseFloat(total.toFixed(2));

            const order = await prisma.order.create({
                data: {
                    userId,
                    storeId,
                    addressId,
                    total: parseFloat(total.toFixed(2)),
                    paymentMethod,
                    orderItems: {
                        create: sellerItems.map((item) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
            });
            orderIds.push(order.id);
        }

        await prisma.user.update({
            where: { id: userId },
            data: { cart: {} },
        });

        console.log('Order placed successfully:', { orderIds, fullAmount });
        return NextResponse.json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error in POST /api/orders:', error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 });
    }
}

// Get all orders for a user
export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        const orders = await prisma.order.findMany({
            where: { userId, OR : [
                {paymentMethod : 'COD'},
                {AND : [{ paymentMethod : PaymentMethod.STRIPE }, {isPaid : true}  ] }

            ] },
            include : {
                orderItems : {
                    include : {product : true}
                },
                address : true,
            },
            orderBy: { createdAt: 'desc' }
        })
        return NextResponse.json({ orders})
    } catch (error) {
        console.error(error);
         return NextResponse.json({ error: error.code || error.message }, {status : 400} )
    }
}

