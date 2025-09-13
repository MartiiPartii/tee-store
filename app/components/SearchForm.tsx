import { Box, InputAdornment, Stack, TextField } from "@mui/material"
import Form from "next/form"
import SearchIcon from '@mui/icons-material/Search';

const SearchForm = () => {
    return (
        <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
            <Form action={'/browse'}>
                <TextField
                    name="search"
                    size="small"
                    placeholder="Search"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }
                    }}
                />
            </Form>
        </Stack>
    )
}

export default SearchForm