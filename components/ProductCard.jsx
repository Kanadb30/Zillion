"use client"
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { assets } from '@/assets/assets'

const getSafeSrc = (val, fallback) => {
    if (!val) return fallback
    if (typeof val === 'string') return val
    if (typeof val === 'object' && val.src) return val.src
    return fallback
}

const ProductCard = ({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // calculate the average rating of the product
    const rating = Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length);

    return (
        <Link href={`/product/${product.id}`} className=' group max-xl:mx-auto'>
            <div className='product-card-bg h-40 sm:w-60 sm:h-68 rounded-lg flex items-center justify-center'>
                <Image width={500} height={500} className='max-h-30 sm:max-h-40 w-auto group-hover:scale-115 transition duration-300' src={getSafeSrc(product?.images?.[0], assets.upload_area)} alt={product.name || ''} />
            </div>
            <div className='flex justify-between gap-3 text-sm text-gray-200 pt-2 max-w-60'>
                <div>
                    <p>{product.name}</p>
                    <div className='flex'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={14} className='text-transparent mt-0.5' fill={rating >= index + 1 ? "#00C950" : "#374151"} />
                        ))}
                    </div>
                </div>
                <p className="text-green-500 font-semibold">{currency}{product.price}</p>
            </div>
        </Link>
    )
}

export default ProductCard