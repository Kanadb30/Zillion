"use client"
import Image from "next/image"
import { MapPin, Mail, Phone } from "lucide-react"
import { assets } from '@/assets/assets'

const getSafeSrc = (val, fallback) => {
    if (!val) return fallback
    if (typeof val === 'string') return val
    if (typeof val === 'object' && val.src) return val.src
    return fallback
}

const StoreInfo = ({store}) => {
    const logoSrc = getSafeSrc(store?.logo, assets.upload_area)
    const userImgSrc = getSafeSrc(store?.user?.image, assets.upload_area)
    const appliedDate = store?.createdAt ? new Date(store.createdAt).toLocaleDateString() : '-'
    return (
        <div className="flex-1 space-y-2 text-sm">
            <Image width={100} height={100} src={logoSrc} alt={store?.name || ''} className="max-w-20 max-h-20 object-contain shadow rounded-full max-sm:mx-auto" />
            <div className="flex flex-col sm:flex-row gap-3 items-center">
                <h3 className="text-xl font-semibold text-white"> {store.name} </h3>
                <span className="text-sm">@{store.username}</span>

                {/* Status Badge */}
                <span
                    className={`text-xs font-semibold px-4 py-1 rounded-full ${store.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : store.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                        }`}
                >
                    {store.status}
                </span>
            </div>

            <p className="text-slate-600 my-5 max-w-2xl">{store.description}</p>
            <p className="flex items-center gap-2"> <MapPin size={16} /> {store.address}</p>
            <p className="flex items-center gap-2"><Phone size={16} /> {store.contact}</p>
            <p className="flex items-center gap-2"><Mail size={16} />  {store.email}</p>
            <p className="text-slate-700 mt-5">Applied  on <span className="text-xs">{appliedDate}</span> by</p>
            <div className="flex items-center gap-2 text-sm ">
                <Image width={36} height={36} src={userImgSrc} alt={store?.user?.name || ''} className="w-9 h-9 rounded-full" />
                <div>
                    <p className="text-gray-200 font-medium">{store?.user?.name || 'Unknown'}</p>
                    <p className="text-slate-400">{store?.user?.email || ''}</p>
                </div>
            </div>
        </div>
    )
}

export default StoreInfo