import GetPlaceDetails from "@/service/GlobalAPI";
import { useEffect, useState } from "react";

const PHOTO_REF_URL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" + import.meta.env.VITE_GOOGLE_API_KEY;

const InfoSection = ({ trip }) => {
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
        <div>
            <img src={photoUrl? photoUrl: "/camping.png"} alt="Place" className="rounded-xl shadow-lg h-[270px] sm:h-[300px] md:h-[330px] lg:h-[400px] w-full object-center" />
            <div>
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{trip?.useeSelection?.location?.label}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 shadow-sm">📅 {trip?.useeSelection?.numberOfDays} Days</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 shadow-sm">💰 {trip?.useeSelection?.budget} Budget</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 shadow-sm">✈️ Number of Traveler: {trip?.useeSelection?.traveler}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
