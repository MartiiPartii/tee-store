"use client"

import { Button, Stack, Typography } from "@mui/material"
import ImageInput from "./ImageInput"
import React, { useActionState, useState } from "react"
import FormInputField from "./FormInputField"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import Form from "next/form"
import { uploadShirt } from "@/actions/store"
import Loader from "./Loader"
import { useRouter } from "next/navigation"

const ShirtForm = () => {
    const [file, setFile] = useState<File | null>(null)
    const [state, action, isLoading] = useActionState((previousState: any, formData: FormData) => uploadShirt(previousState, formData, file), null)
    const router = useRouter()

    return (
        <>
            { isLoading && <Loader /> }
            <Form action={action}>

                {state?.error && <Typography mb={2} variant="body1" color="error" fontStyle={"italic"}>{state.error}</Typography>}

                <ImageInput
                    file={file}
                    setFile={setFile}
                />

                <Stack gap={2} mt={2}>
                    <FormInputField
                        label="T-Shirt Name*"
                        placeholder="Enter t-shirt name"
                        name="name"
                        type="text"
                        required={true}
                    />
                    <FormInputField
                        label="T-Shirt Description*"
                        placeholder="Describe your t-shirt, its style, material, etc."
                        type="text"
                        name="description"
                        multiline={true}
                        rows={4}
                        required={true}
                    />
                    <FormInputField
                        label="Price (USD)*"
                        placeholder="0.00"
                        step={0.01}
                        name="price"
                        type="number"
                        Icon={AttachMoneyIcon}
                        required={true}
                    />
                    <Stack direction="row" gap={2}>
                        <Button onClick={() => router.back()} sx={{ flex: 1 }} variant="outlined" color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" sx={{ flex: 1 }} variant="contained" color="accent" startIcon={<AddIcon />}>
                            List T-Shirt
                        </Button>
                    </Stack>
                </Stack>
            </Form>
        </>
    )
}

export default ShirtForm