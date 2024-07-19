import { toast } from "@/components/ui/use-toast"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlaceToVisit from "./components/PlaceToVisit";



const ViewTrip = () => {

    const { id } = useParams()
    const [trip, setTrip] = useState([])

    useEffect(() => {
        id && getTripData()
    }, [id])
    // get trip data
    const getTripData = async () => {
        const docRef = doc(db, "AITrips", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log("Document :", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("No Document");
            toast("No Trip found")
        }
    }

    return (
        <div className="py-10 px-10 md:px-20 lg:px-36 xl:px-44" >
            {/* Information */}
            <InfoSection trip={trip}/>

            {/* recomment Hostels */}
            <Hotels trip={trip} />

            {/* Daily Plan */}
            <PlaceToVisit trip={trip}/>

        </div>
    )
}

export default ViewTrip