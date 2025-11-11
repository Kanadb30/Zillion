'use client'
import { dummyAdminDashboardData } from "@/assets/assets"
import Loading from "@/components/Loading"
import OrdersAreaChart from "@/components/OrdersAreaChart"
import { CircleDollarSignIcon, ShoppingBasketIcon, StoreIcon, TagsIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function AdminDashboard() {

    const { getToken } = useAuth()

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [loading, setLoading] = useState(true)
    const defaultDashboard = {
        products: 0,
        revenue: 0,
        orders: 0,
        stores: 0,
        allOrders: [],
    }
    const [dashboardData, setDashboardData] = useState(defaultDashboard)

    const dashboardCardsData = [
        { title: 'Total Products', value: dashboardData?.products ?? 0, icon: ShoppingBasketIcon },
        { title: 'Total Revenue', value: currency + (dashboardData?.revenue ?? 0), icon: CircleDollarSignIcon },
        { title: 'Total Orders', value: dashboardData?.orders ?? 0, icon: TagsIcon },
        { title: 'Total Stores', value: dashboardData?.stores ?? 0, icon: StoreIcon },
    ]

    const fetchDashboardData = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/admin/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            })
            // Protect against unexpected response shapes. Use defaultDashboard as fallback.
            setDashboardData(data?.dashboardData ?? defaultDashboard)
        } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-slate-500">
            <h1 className="text-2xl text-gray-300">Admin <span className="text-white font-medium">Dashboard</span></h1>

            {/* Cards */}
            <div className="flex flex-wrap gap-5 my-10 mt-4">
                {
                    dashboardCardsData.map((card, index) => (
                        <div key={index} className="flex items-center gap-10 border border-slate-200 p-3 px-6 rounded-lg">
                            <div className="flex flex-col gap-3 text-xs">
                                <p>{card.title}</p>
                                <b className="text-2xl font-medium text-slate-700">{card.value}</b>
                            </div>
                            <card.icon size={50} className=" w-11 h-11 p-2.5 text-slate-400 bg-[#970319] rounded-full" />
                        </div>
                    ))
                }
            </div>

            {/* Area Chart */}
            <OrdersAreaChart allOrders={dashboardData?.allOrders ?? []} />
        </div>
    )
}