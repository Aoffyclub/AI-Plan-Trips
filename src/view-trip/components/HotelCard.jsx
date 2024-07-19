import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GetPlaceDetails from "@/service/GlobalAPI";

const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;

const HotelCard = ({ item }) => {
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        if (item) {
            GetPlacePhoto();
        }
    }, [item]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: item?.name
        };
        try {
            const result = await GetPlaceDetails(data);
            const photos = result?.data?.places?.[0]?.photos;
            if (photos && photos.length > 1) {
                const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photos[1].name);
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
            <Link to={`https://www.google.com/maps/search/?api=1&query=${item?.address}`} target='_blank'>
                <div className='border-2 rounded-lg hover:shadow-md overflow-hidden hover:scale-110 transform translate-x-1 duration-75'>
                    <img src={photoUrl? photoUrl: "/camping.png"}  alt={`${item?.name}`} className='rounded-lg h-[180px] w-full' />
                    <div className='flex flex-col gap-2 mt-2 px-2 py-3'>
                        <h2 className='font-semibold text-lg'>{item?.name}</h2>
                        <h2 className='text-gray-500 text-xs'>📍 {item?.address}</h2>
                        <h2>🔖 {item?.price}</h2>
                        <h2>⭐ {item?.rating} Rating</h2>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default HotelCard;
