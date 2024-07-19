import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText'

const config = {
    headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_API_KEY,
        "X-Goog-FieldMask": [
            "places.displayName",
            "places.photos",
            "places.id"
        ]
    }
};

const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);

export default GetPlaceDetails;
