import SectionContainer from "@/app/components/SectionContainer"
import { Box, Stack, Typography } from "@mui/material"
import StoreCollection from "@/app/components/StoreCollection"
import { getShirts } from "@/actions/store"
import { Shirt } from "@/app/generated/prisma"

const Browse = async ({ searchParams }: { searchParams: { search: string } }) => {
    const search = (await searchParams).search || ""
    const decodedSearch = decodeURIComponent(search)
    let collection: Shirt[] | null = null
    let error: string | null = null

    try {
        collection = await getShirts({
            searchQuery: decodedSearch
        })
    } catch(err) {
        error = "We couldn't fetch products properly. Please try again."
    }

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
                    error ?
                    <Typography textAlign={"center"} variant="body1" fontStyle={"italic"} color="error">{error}</Typography>
                    :
                    collection && collection.length > 0 ?
                    <StoreCollection collection={collection} />
                    :
                    <Stack>
                        <Typography variant="h4">Nothing here...</Typography>
                        <Typography variant="body1">
                            {
                                decodedSearch ?
                                "No products match your search query."
                                :
                                "Expect new products very soon."
                            }
                        </Typography>
                    </Stack>
                }
            </SectionContainer>
        </>
    )
}

export default Browse