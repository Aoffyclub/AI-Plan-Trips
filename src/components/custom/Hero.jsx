import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='flex flex-col items-center mx-56 my-10 gap-10'>
            <h1 className='text-5xl font-extrabold text-center mt-8 '>
                <span className='text-[#f56551]'>Discovery Your Next Adventure with AI:</span> <br />
                Personalized Intineraties at Your Figertrips
            </h1>

            <p className='text-xl mt-6 text-gray-500 text-center'>Your personal trip planner and travel curator,
                creating custom itineraries tailored to your interests and budget.</p>

            <Link to={"/create-trip"}>
                <Button >Get Started, Free</Button>
            </Link>

        </div>
    )
}

export default Hero