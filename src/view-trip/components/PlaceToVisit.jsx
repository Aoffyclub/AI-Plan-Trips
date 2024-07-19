
import PlaceVisitCard from './PlaceVisitCard'

const PlaceToVisit = ({ trip }) => {
    return (
        <div>
            <h2 className='text-2xl font-bold mt-5' >Place to Visit</h2>
            <div>
                {trip?.tripData?.itinerary?.map((item, index) => (
                    <div key={index} className='mt-5'>
                        <h3 className='text-lg font-bold'>{item?.day}</h3>
                        <div className='grid md:grid-cols-2 gap-5'>
                            {item?.plan?.map((plan, index) => (
                                <PlaceVisitCard plan={plan} key={index}/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlaceToVisit