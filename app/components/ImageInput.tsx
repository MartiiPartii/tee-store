"use client"
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material"
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import Image from "next/image";

const ImageInput = () => {
    const theme = useTheme()

    const [file, setFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [fileEnter, setFileEnter] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        if(e.target.files) setFile(e.target.files[0])
    }

    const handleDropFile = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        setFileEnter(false)
        setError(null)
        if(e.dataTransfer.items) {
            if([...e.dataTransfer.items].length > 1) {
                setError("You can only upload one file.")
            }
            else {
                [...e.dataTransfer.items].forEach((item, i) => {
                    console.log(item)
                    if(item.kind === "file") {
                        setFile(item.getAsFile())
                    }
                })
            }
        }
    }

    const handleRemoveImage = () => {
        setFile(null)
        setImageUrl(null)
    }

    useEffect(() => {
        if(file) {
            const url = URL.createObjectURL(file)
            setImageUrl(url)
        }
    }, [file])

    return (
        <Box>
            {
                imageUrl ?
                <Stack
                    sx={{
                        position: "relative"
                    }}
                    justifyContent={"center"}
                    mt={3}
                >
                    <Image
                        src={imageUrl}
                        alt="Your Image"
                        width={500}
                        height={500}
                        style={{
                            width: "100%",
                            height: "auto",
                            aspectRatio: "1 / 1",
                            objectFit: "cover",
                            borderRadius: theme.shape.borderRadius
                        }}
                    />
                    <IconButton
                        sx={{
                            position: "absolute",
                            borderRadius: "100%",
                            top: "-20px",
                            right: "-20px"
                        }}
                        color="accent"
                        onClick={handleRemoveImage}
                    >
                        <CancelIcon
                            sx={{
                                background: "white",
                                borderRadius: "100%",
                            }}
                        />
                    </IconButton>
                </Stack>
                :
                <>
                    <Typography variant="body2" color="neutral" component={"label"} htmlFor="shirt-pic">T-Shirt Image*</Typography>

                    <Stack
                        alignItems={"center"}
                        mt={1}
                        mb={1}
                        sx={{
                            border: `dashed 2px ${fileEnter ? theme.palette.neutral.light : error ? theme.palette.error.main : "#e4e4e7"}`,
                            borderRadius: theme.shape.borderRadius,
                            padding: 3
                        }}
                        component={"label"}
                        htmlFor="shirt-pic"
                        onDragOver={(e: React.DragEvent<HTMLLabelElement>) => {
                            e.preventDefault()
                            if(!fileEnter) setFileEnter(true)
                        }}
                        onDragLeave={(e: React.DragEvent<HTMLLabelElement>) => {
                            e.preventDefault()
                            if(fileEnter) setFileEnter(false)
                        }}
                        onDragEnd={(e: React.DragEvent<HTMLLabelElement>) => {
                            e.preventDefault()
                            if(fileEnter) setFileEnter(false)
                            console.log("drag end")
                        }}
                        onDrop={(e) => handleDropFile(e)}
                    >
                        <FileUploadOutlinedIcon sx={{ color: theme.palette.neutral.light, width: "3rem", height: "3rem", marginBottom: 2 }} />
                        
                        {
                            fileEnter ?
                            <>
                                <Typography variant="body1">Drop your files here...</Typography>
                            </>
                            :
                            <>
                                <Typography variant="body1" mb={1}><Typography variant="body1" component={"span"} color="neutral">Click to upload</Typography> or drag and drop</Typography>
                                <Typography variant="body2" mb={1}>Images up to 10MB</Typography>
                            </>
                        }
                        
                        <input type="file" onChange={(e) => handleUploadFile(e)} accept="image/*" id="shirt-pic" hidden />
                    </Stack>
                </>
            }

            {error && <Typography variant="body2" color="error" fontStyle="italic">{error}</Typography>}
        </Box>
    )
}

export default ImageInput