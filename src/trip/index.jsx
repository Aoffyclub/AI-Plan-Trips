import { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input"
import { Budget, PlanTraveller, AI_Prompt } from '@/constants/option';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle

} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';



const CreatTrip = () => {

  const [place, setPlace] = useState()
  const [formData, setFormData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })

  }

  useEffect(() => {
  }, [formData])


  const logIn = useGoogleLogin({
    onSuccess: (codeRes) => {
      localStorage.setItem("user", JSON.stringify(codeRes?.access_token))
      console.log(codeRes)
      getUserInfo(codeRes?.access_token)
    },
    onError: (error) => console.log(error)
  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem("user")

    if (!user) {
      setOpenDialog(true)
      return;
    }


    if (formData?.numberOfDays > 5 && !formData?.location || !formData?.budget && !formData?.traveler) {
      toast("Please all details before")
      return;
    }

    setLoading(true)

    const Final_Prompt = AI_Prompt
      .replace('{location}', formData?.location.label)
      .replace('{numberOfDays}', formData?.numberOfDays)
      .replace('{numberOfDays2}', formData?.numberOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{bundget}', formData?.budget)

    const result = await chatSession.sendMessage(Final_Prompt)
    setLoading(false)
    console.log(result?.response?.text());
    saveAITrip(result?.response?.text())
  }

  const getUserInfo = (token) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        Accept: "Application/json"
      }
    }).then(response => {
      console.log(response.data.picture);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setOpenDialog(false)
    })
  }

  const saveAITrip = async (tripData) => {
    setLoading(true)
    const docID = Date.now().toString()
    const user = JSON.parse(localStorage.getItem('userInfo'))

    // Add a new document in collection "cities"
    await setDoc(doc(db, "AITrips", docID), {
      useeSelection: formData,
      tripData: JSON.parse(tripData),
      email: user.email,
      id: docID,

    });

    setLoading(false)
    router(`/view-trip/${docID}`)

  }
  return (
    <div className="py-10 px-10 md:px-20 lg:px-36 xl:px-44">
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️ </h2>
      <p className='text-gray-500 mt-3 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-10 px-10'>
        <div>
          <h2 className='mt-3 text-xl font-bold'>What is destination of choice?</h2>
        </div>
        <div className='mt-2'>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            selectProps={{
              place,
              onChange: (e) => { setPlace(e); handleInputChange("location", e) }
            }}
          />
        </div>
      </div>

      <div className='mt-10 px-10'>
        <div>
          <h2 className='mt-3 text-xl font-bold'>How many days are you planning your trip?</h2>
        </div>
        <div className='mt-2'>
          <Input placeholder="2 days"
            onChange={(e) => handleInputChange("numberOfDays", e.target.value)}
          />
        </div>
      </div>

      <div className='mt-10 px-10'>
        <div>
          <h2 className='mt-3 text-xl font-bold'>What is Your Budget?</h2>
        </div>
        <div className='mt-2 grid grid-cols-3 gap-5'>
          {Budget.map((item, index) => (
            <div key={index} className={`p-4 border cursor-pointer rounded-lg hover:shadow-md ${formData?.budget === item.title && "shadow-lg border-2 border-black"}`}
              onClick={() => handleInputChange("budget", item.title)}

            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='text-lg font-bold'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.des}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10 px-10'>
        <div>
          <h2 className='mt-3 text-xl font-bold'>Who do you plan on traveling with on your next adventure?</h2>
        </div>
        <div className='mt-2 grid grid-cols-3 gap-5'>
          {PlanTraveller.map((item, index) => (
            <div key={index} className={`p-4 border cursor-pointer rounded-lg hover:shadow-md ${formData?.traveler === item.people && "shadow-lg border-2 border-black"}`}
              onClick={() => handleInputChange("traveler", item.people)}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='text-lg font-bold'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.des}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-20 justify-end flex'>
        <Button
          disabled={loading}
          onClick={() => onGenerateTrip()}
        >
          {loading ?
            "Loading..." :
            " Generate Trip"}

        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle><img src="/logoApp.svg" alt="" /></DialogTitle>
            <DialogDescription >
              <h2 className='font-bold mt-5 text-xl'>Sign In With Google</h2>
              <h2>Sign in with web from google authetication security</h2>
              <Button
                disabled={loading}
                onClick={() => logIn()}
                varient="outline" className="mt-4 w-full">
                {loading ?
                  "test" :
                  "🚀 Sign In With Google"}

              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default CreatTrip