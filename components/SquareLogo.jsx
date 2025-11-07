"use client"
import Image from "next/image"
import { assets } from "@/assets/assets"

// Renders the main logo while preserving aspect ratio.
// Props:
// - height: pixel height (number) for the logo (default 40)
// - className: additional classes for the wrapper
const SquareLogo = ({ height = 40, className = '' }) => {
    const wrapperClasses = `inline-flex overflow-hidden ${className}`

    return (
        <div className={wrapperClasses} style={{ height }}>
            <Image
                src={assets.main_logo}
                alt="Zillion"
                width={height * 2.5}  // Assuming roughly 2.5:1 aspect ratio for a rectangular logo
                height={height}
                className="logo-image"
                style={{ width: 'auto', height: '100%', objectPosition: 'center', mixBlendMode: 'screen' }}
                priority={true}
            />
        </div>
    )
}

export default SquareLogo
