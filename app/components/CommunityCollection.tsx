import { prisma } from "@/lib/prisma"
import SectionContainer from "./SectionContainer"
import { Typography } from "@mui/material"
import StoreCollection from "./StoreCollection"
import { Shirt } from "../generated/prisma"

const CommunityCollection = async () => {
    const shirts: Shirt[] = await prisma.shirt.findMany({
        where: { soldByPlatform: false },
        take: 3,
        orderBy: { createdAt: "desc" }
    })



    return (
        <SectionContainer props={{
            sx: { textAlign: "center", padding: `3.2rem` }
        }}>
            <Typography variant="h2" mb={3} color="neutral">Our community collection</Typography>

            {
                shirts && shirts.length > 0 &&
                <StoreCollection collection={shirts} />
            }
        </SectionContainer>
    )
}

export default CommunityCollection