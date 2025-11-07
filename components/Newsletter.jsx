import React from 'react'
import Title from './Title'

const Newsletter = () => {
    return (
        <div className='flex flex-col items-center mx-4 my-36'>
            <Title title="Join Newsletter" description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week." visibleButton={false} />
            <div className='flex bg-gray-800/90 text-sm p-1 rounded-full w-full max-w-xl my-10 border border-gray-700'>
                <input className='flex-1 pl-5 bg-transparent text-gray-200 outline-none placeholder-gray-400' type="text" placeholder='Enter your email address' />
                <button className='font-medium bg-green-600 text-gray-900 px-7 py-3 rounded-full hover:bg-green-500 hover:scale-103 active:scale-95 transition'>Get Updates</button>
            </div>
        </div>
    )
}

export default Newsletter