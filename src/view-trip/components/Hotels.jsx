import React from 'react'
import HotelCard from './HotelCard'

const Hotels = ({ trip }) => {
    return (
        <div>
            <h2 className='text-2xl font-bold mt-5' >Hotels Reccomment</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5'>
                {trip?.tripData?.hotelOptions?.map((item,index) => (
                   <HotelCard item={item} key={index}/>
                ))}
            </div>
        </div>
    )
}

export default Hotels