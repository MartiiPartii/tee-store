"use client"

import { Button, Stack } from "@mui/material"
import ImageInput from "./ImageInput"
import React, { useRef, useState } from "react"
import FormInputField from "./FormInputField"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import { authFetch } from "@/lib/api/api"

const ShirtForm = () => {
    const name = useRef<HTMLInputElement>(null)
    const description = useRef<HTMLInputElement>(null)
    const price = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        if(file) formData.append("file", file)
        formData.append("name", (name?.current?.value || ""))
        formData.append("description", (description?.current?.value || ""))
        formData.append("price", (price?.current?.value || ""))

        const response = await authFetch("http://localhost:3000/api/store/shirt", {
            method: "POST",
            body: formData,
            credentials: "include"
        })

        console.log(response)
    }


    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <ImageInput
                file={file}
                setFile={setFile}
            />

            <Stack gap={2}>
                <FormInputField
                    label="T-Shirt Name*"
                    placeholder="Enter t-shirt name"
                    ref={name}
                    type="text"
                    required={true}
                />
                <FormInputField
                    label="T-Shirt Description*"
                    placeholder="Describe your t-shirt, its style, material, etc."
                    ref={description}
                    type="text"
                    multiline={true}
                    rows={4}
                    required={true}
                />
                <FormInputField
                    label="Price (USD)*"
                    placeholder="0.00"
                    ref={price}
                    type="number"
                    Icon={AttachMoneyIcon}
                    required={true}
                />
                <Stack direction="row" gap={2}>
                    <Button sx={{ flex: 1 }} variant="outlined" color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" sx={{ flex: 1 }} variant="contained" color="accent" startIcon={<AddIcon />}>
                        List T-Shirt
                    </Button>
                </Stack>
            </Stack>
        </form>
    )
}

export default ShirtForm