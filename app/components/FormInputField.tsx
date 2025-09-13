"use client"

import { IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { InputProps } from "@/types/form";

const FormInputField = ({
    label,
    placeholder,
    defaultValue,
    name,
    ref,
    multiline,
    required,
    rows,
    type,
    Icon
} : InputProps) => {
    const inputProps = {
        style: {
            fontSize: "0.875rem"
        }
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <Stack gap={1} textAlign={"start"}>
            {
                label &&
                <Typography variant="body2" color="neutral" fontWeight={500}>{label}</Typography>
            }

            <TextField
                placeholder={placeholder}
                defaultValue={defaultValue ? defaultValue : ""}
                size="small"
                inputRef={ref}
                inputProps={inputProps}
                multiline={multiline}
                name={name ? name : ""}
                required={required ? true : false}
                rows={rows}
                type={type === "password" ? showPassword ? "text" : "password" : type}
                slotProps={{
                    input: {
                        startAdornment: Icon ? (
                                <InputAdornment
                                    position="start"
                                >
                                    <Icon sx={{ width: "1rem", height: "1rem" }} />
                                </InputAdornment>
                            )
                            :
                            <></>,
                        endAdornment: type === "password" ? (
                            <InputAdornment
                                position="end"
                            >
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    { showPassword ? <VisibilityOffOutlinedIcon sx={{ width: "1rem", height: "1rem" }} /> : <VisibilityOutlinedIcon sx={{ width: "1rem", height: "1rem" }} /> }
                                </IconButton>
                            </InputAdornment>
                        ) : (<></>)
                    }
                }}
            />
        </Stack>
    )
}

export default FormInputField