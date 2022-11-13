import axios from "axios"
import { useState, useEffect } from "react"

export function MainPage() {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5Nzg0ODkwLCJqdGkiOiIyMDcyMmQwZGUzZWU0ZGNiODRlZjlmZDE5ZWE4YmE1OCIsInVzZXJfaWQiOjF9.ScBgnLy6JfxUm8CNGx0z4CD1x-g_QUwMnyLrb9GQyfo"

    interface IDonut {
        "id": number,
        "amount": number,
        "currency": string,
        "author_name": string,
        "message": string,
        "created_at": string,
        "attachment_url": string,
    }

    const [donut, setDonut] = useState<IDonut>(Object)
    async function fetchDonuts() {
        const response = await axios.get<IDonut>('http://78.140.241.21:8300/donation/received-donations', { headers: { "Authorization": `Bearer ${token}` } })
        setDonut(response.data)
    }

    useEffect(() => {
        fetchDonuts()
    }, [])
    return (
        <div className="flex flex-col items-center bg-transparent">
            <img src="./imgs/qr-code.svg" className='w-36 h-36' />
            <div className="flex justify-between border-solid border-red-400 bg-transparent">
                <div className="mt-5 ml-10 w-2/5">
                    <h1 className="text-black text-xl font-bold mb-5">{donut.author_name}</h1>
                    <p className="text-black text-sm">{donut.message}</p>
                </div>

                <div className="flex mt-10 mr-16 text-orange-400 text-3xl font-bold">
                    <h3> {donut.amount}</h3>
                    <p> {donut.currency}</p>
                </div>
            </div>
        </div>
    )
}