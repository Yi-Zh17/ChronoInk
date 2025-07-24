import { Construction } from "lucide-react"
import "./global.css"

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <Construction size={128}/>
            <h1>This part of the app is still under construction!</h1>
        </div>
    )
}