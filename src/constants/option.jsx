export const Budget = [
    {
        id: 1,
        icon: "💵",
        title: 'Cheap',
        des: "Stay conscious of costs"
    },
    {
        id: 2,
        icon: "💰",
        title: 'Moderate',
        des: "Keep cost on the average side"
    },
    {
        id: 3,
        icon: "💸",
        title: 'Luxury',
        des: "Dont worry about cost"
    }
]



export const PlanTraveller = [
    {
        id: 1,
        icon: "👨",
        title: 'Just me',
        des: "Accommodation, meals, and transportation for a me",
        people: "1 person"
    },
    {
        id: 2,
        icon: "💑",
        title: 'A Couple',
        des: "Accommodation, meals, and transportation for a couple",
        people: "Couple"
    },
    {
        id: 3,
        icon: "👨‍👩‍👧",
        title: 'Family',
        des: "Accommodation, meals, and transportation for a family",
        people: "Family 4 person"
    },
    {
        id: 4,
        icon: "🧑‍🧑‍🧒‍🧒",
        title: 'Friends',
        des: "Accommodation, meals, and transportation for friends",
        people: "Friend 6-8 person "
    },

]

export const AI_Prompt =  "Generate Travel Plan for Location: {location} , for {numberOfDays} Days for {traveler} with a {bundget} Budget, Give me a Hotels options list with Hotel name , Hotel address, Price, hotel image URL, geo coordinate, rating, description and suggest itinerary with placeName, Place,Details,Place Image Url, Geo coordinate, ticket Price, Time to travel each of the location for {numberOfDays2} days with each day plan with best time to visit in JSON format"