import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripsCard from "./components/UserTripsCard";

const MyTrip = () => {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const GetUserTrip = async () => {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            setTrips([]);
            if (!user) {
                return navigate("/");
            }

            const q = query(collection(db, "AITrips"), where("email", "==", user?.email));
            const querySnapshot = await getDocs(q);
            const tripsData = querySnapshot.docs.map(doc => doc.data());
            setTrips(tripsData);
        };

        GetUserTrip();
    }, [navigate]);

    return (
        <div className="py-10 px-10 md:px-20 lg:px-36 xl:px-44">
            <h2 className="font-bold text-2xl">My Trips</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {trips?.length > 0 ?
                    trips?.map((item, index) => (
                        <UserTripsCard key={index} trip={item} />
                    )) :
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className="h-[350px] bg-slate-200 animate-pulse rounded-xl flex items-center justify-center">
                            <h2 className="font-semibold">Loading...</h2>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MyTrip;
