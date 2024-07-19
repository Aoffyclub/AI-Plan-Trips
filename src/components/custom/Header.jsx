
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,

} from "@/components/ui/dialog"

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const Header = () => {

  const user = JSON.parse(localStorage.getItem("userInfo"))
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (user) {
    }
  }, [])

  const logIn = useGoogleLogin({
    onSuccess: (codeRes) => {
      localStorage.setItem("user", JSON.stringify(codeRes?.access_token))
      console.log(codeRes)
      getUserInfo(codeRes?.access_token)
    },
    onError: (error) => console.log(error)
  })

  const getUserInfo = (token) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        Accept: "Application/json"
      }
    }).then(response => {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setOpenDialog(false)
    })
  }


  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logoApp.svg" alt="" />
      <div className="flex items-center gap-2">
        {user ?

          <div className="flex gap-2 items-center">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full"> Create Trips </Button>
            </a>
            <a href="/my-trip">
              <Button variant="outline" className="rounded-full"> My Trips </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} alt="" className="h-8 w-8 rounded-full" />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    // googleLotOut()
                    localStorage.clear()
                    window.location.reload()
                  }}>Log Out</h2>
              </PopoverContent>
            </Popover>


          </div>
          :
          <Button>
            <h2 onClick={() => setOpenDialog(true)}>Login</h2>
          </Button>
        }


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

export default Header