import { Construction } from "lucide-react"
import "./global.css"

export default function Custom404() {
    return (
        <div className="flex items-center flex-col w-full h-screen bg-gray-200 justify-center">
            <Construction size={128}/>
            <h1>This part of the app is still under construction!</h1>
        </div>
    )
}