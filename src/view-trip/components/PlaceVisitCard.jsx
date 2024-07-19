import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GetPlaceDetails from "@/service/GlobalAPI";

const PHOTO_REF_URL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" + import.meta.env.VITE_GOOGLE_API_KEY;

const PlaceVisitCard = ({ plan }) => {
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        if (plan) {
            GetPlacePhoto();
        }
    }, [plan]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: plan?.placeName
        };
        try {
            const result = await GetPlaceDetails(data);
            const photos = result?.data?.places?.[0]?.photos;
            if (photos && photos.length > 0) {
                const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photos[0].name);
                setPhotoUrl(PhotoUrl);
            } else {
                console.error("No photos found for the place.");
            }
        } catch (error) {
            console.error("Error fetching place details:", error);
        }
    };

    return (
        <div>
            <Link to={`https://www.google.com/maps/search/?api=1&query=${plan?.placeName}`} target='_blank' rel='noopener noreferrer'>
                <div>
                    <h2 className='font-semibold text-red-500'>{plan?.time}</h2>
                    <div className='flex items-center p-2 gap-4 border-2 mt-3 rounded-lg overflow-hidden hover:shadow-md hover:scale-105 transform translate-x-1 duration-75'>
                        <img src={photoUrl? photoUrl: "/camping.png"}  alt="" className='rounded-lg w-[150px] h-[150px] aspect-square' />

                        <div className='flex flex-col gap-2'>
                            <h4 className='text-lg font-bold'>{plan?.placeName}</h4>
                            <p className='text-sm text-gray-500'>{plan?.details}</p>
                            <p className='text-sm'>⏱️ Time: {plan?.timeToTravel}</p>
                            <p className='text-sm'>🔖 Price: {plan?.ticketPrice}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PlaceVisitCard;
