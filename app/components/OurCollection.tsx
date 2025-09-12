import { Grid, Typography } from "@mui/material"
import SectionContainer from "./SectionContainer"
import ShirtCard from "./ShirtCard"
import { Shirt } from "@/types/shirt"
import { authFetch } from "@/lib/api/api"
import StoreCollection from "./StoreCollection"

const OurCollection = async () => {
    
    const response = await authFetch("http://localhost:3000/api/store/shirt?take=4&seller=0", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    console.log(response)
    
    if(!response.ok) {
        console.log("Not ok")
        return (
            <SectionContainer props={{
                sx: { textAlign: "center", padding: `3.2rem` }
            }}>
                <Typography variant="h2" mb={3} color="neutral">We couldnt fetch our premium collection</Typography>
            </SectionContainer>
        )
    }
    const data = (await response.json()).data


    return (
        <SectionContainer props={{
            sx: { textAlign: "center", padding: `3.2rem` }
        }}>
            <Typography variant="h2" mb={3} color="neutral">Our premium collection</Typography>

            {
                data && data.length > 0 &&
                <StoreCollection collection={data} />
            }
        </SectionContainer>
    )
}

export default OurCollection