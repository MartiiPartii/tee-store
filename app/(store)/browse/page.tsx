import SectionContainer from "@/app/components/SectionContainer"
import { Box, Stack, Typography } from "@mui/material"
import { prisma } from "@/lib/prisma"
import StoreCollection from "@/app/components/StoreCollection"

const Browse = async ({ searchParams }: { searchParams: { search: string } }) => {
    const search = (await searchParams).search || ""
    const decodedSearch = decodeURIComponent(search)
    const words = decodedSearch.split(" ")
    console.log(words)

    const collection = await prisma.shirt.findMany({
        where: {
            OR: [
                { name: { contains: decodedSearch, mode: "insensitive" } },
                { description: { contains: decodedSearch, mode: "insensitive" } },
                {
                    seller: {
                        is: {
                            OR: words.map(word => ({
                                OR: [
                                    { firstName: { contains: word, mode: "insensitive" } },
                                    { lastName: { contains: word, mode: "insensitive" } }
                                ]
                            }))
                        }
                    }
                }
            ]
        }
    })

    console.log(collection)


    return (
        <>
            <Box sx={{ bgcolor: "bgcolor.secondary" }}>
                <SectionContainer
                    props={{
                        component: Stack,
                        sx: {
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            py: 12
                        }
                    }}
                >
                    <Typography mb={1} variant="h1">All T-Shirts</Typography>
                    <Typography mb={1} variant="body1" fontSize={20}>Browse our complete collection of premium t-shirts and unique designs from our community.</Typography>
                </SectionContainer>

            </Box>
            <SectionContainer
                props={{
                    sx: {
                        py: 8
                    }
                }}
            >
                {
                    collection && collection.length > 0 &&
                    <StoreCollection collection={collection} />
                }
            </SectionContainer>
        </>
    )
}

export default Browse