'use client'
import { PackageIcon, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import SquareLogo from "./SquareLogo";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
const Navbar = () => {
    const { user } = useUser();
    const router = useRouter();
    const {openSignIn} = useClerk();

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
    }

    return (
        <nav className="relative bg-gray-800 border-b border-gray-700">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4  transition-all">

                    <Link href="/" className="relative flex items-center gap-3">
                        <SquareLogo height={40} className="shrink-0 logo-glow" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-gray-300">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                        <Link href="/" className="hover:text-white transition-colors">About</Link>
                        <Link href="/" className="hover:text-white transition-colors">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-gray-700 px-4 py-3 rounded-full">
                            <Search size={18} className="text-gray-400" />
                            <input className="w-full bg-transparent outline-none text-white placeholder-gray-400" type="text" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} required />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <ShoppingCart size={18} />
                            Cart
                            <button className="absolute -top-1 left-3 text-[8px] text-white bg-green-600 size-3.5 rounded-full">{cartCount}</button>
                        </Link>
                        { !user ? (
                                 <button onClick={openSignIn} className="px-8 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-full">
                                    Login
                                </button>
                            ) : (
                                <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<PackageIcon size={16} />} label="My Orders" onClick={()=>router.push('/orders')}/>

                                        </UserButton.MenuItems>
                                </UserButton>
                            )
                        }
                       

                    </div>

                    {/* Mobile User Button  */}
                    {
                        user ? (
                            <div>
                                 <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<ShoppingCart size={16} />} label="Cart" onClick={()=>router.push('/cart')}/>

                                        </UserButton.MenuItems>
                                </UserButton>
                                <UserButton>
                                    <UserButton.MenuItems>
                                        <UserButton.Action labelIcon={<PackageIcon size={16} />} label="My Orders" onClick={()=>router.push('/orders')}/>

                                        </UserButton.MenuItems>
                                </UserButton>
                            </div>
                        ) : (
                            <div className="sm:hidden">
                        <button onClick={openSignIn} className="px-7 py-1.5 bg-green-600 hover:bg-green-700 text-sm transition text-white rounded-full">
                            Login
                        </button>
                    </div>
                        )

                    }
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar