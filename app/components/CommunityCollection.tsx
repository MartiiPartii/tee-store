import SectionContainer from "./SectionContainer"
import { Typography } from "@mui/material"
import StoreCollection from "./StoreCollection"
import { Shirt } from "../generated/prisma"
import { getShirts } from "@/actions/store"

const CommunityCollection = async () => {
    let data: Shirt[] = []
    let error = null
    
    try {
        const collection = await getShirts({ take: 3, soldByPlatform: false })
        data = collection
    } catch(err) {
        error = "We couldnt fetch our community collection."
    }


    return (
        <SectionContainer props={{
            sx: { textAlign: "center", p: { xs: 3.2, sm: 6.4 } }
        }}>
            <Typography variant="h2" mb={3} color="neutral">Community collection</Typography>

            {
                error ?
                <Typography variant="body1" color="error" fontStyle={"italic"}>{error}</Typography>
                :
                data && data.length > 0 ?
                <StoreCollection collection={data} />
                :
                <Typography variant="body1">Nothing here. Expect new products soon.</Typography>
            }
        </SectionContainer>
    )
}

export default CommunityCollection