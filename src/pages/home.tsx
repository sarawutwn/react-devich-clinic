import axios from "axios";
import { hostname } from "../endpoint";
import { useEffect } from "react"

export default function Home() {
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${hostname}/api/customer/get-all`);
            console.log(data.result)
        }catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return <></>
}