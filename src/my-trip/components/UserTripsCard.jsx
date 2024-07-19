import GetPlaceDetails from "@/service/GlobalAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PHOTO_REF_URL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" + import.meta.env.VITE_GOOGLE_API_KEY;

const UserTripsCard = ({ trip, index }) => {
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.useeSelection?.location?.label
        };
        try {
            const result = await GetPlaceDetails(data);
            const photos = result?.data?.places?.[0]?.photos;
            if (photos && photos.length > 1) {
                const photoUrl = PHOTO_REF_URL.replace("{NAME}", photos[1].name);
                setPhotoUrl(photoUrl);
            } else {
                console.error("No photos found for the place.");
            }
        } catch (error) {
            console.error("Error fetching place details:", error);
        }
    };
    return (
        <Link to={"/view-trip/" + trip?.id}>
            <div key={index} className="p-4 border-2 rounded-xl hover:scale-105 hover:shadow-lg shadow-md duration-75">
                <img src={photoUrl ? photoUrl : "/camping.png"} alt="Place" className="rounded-xl shadow-lg h-[250px] w-full object-center" />
                <div className="flex flex-col gap-1 mt-2">
                    <h2 className="text-lg font-bold">{trip?.useeSelection?.location?.label}</h2>
                    <h2 className="text-md text-gray-500">{trip?.useeSelection?.numberOfDays} Days trip with {trip?.useeSelection?.budget} Budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default UserTripsCard