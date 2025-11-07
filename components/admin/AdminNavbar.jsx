 'use client'
import Link from "next/link"
import SquareLogo from "../SquareLogo"

const AdminNavbar = () => {


    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-gray-700 bg-gray-800 transition-all">
            <Link href="/" className="relative flex items-center gap-3">
                <SquareLogo size={40} className="shrink-0 logo-glow" rounded={false} />
                <p className="absolute text-xs font-semibold -top-1 -right-3 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-600">
                    Admin
                </p>
            </Link>
            <div className="flex items-center gap-3 text-gray-200">
                <p>Hi, Admin</p>
            </div>
        </div>
    )
}

export default AdminNavbar