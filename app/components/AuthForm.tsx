import { Box, Button, Card, Checkbox, FormControlLabel, Stack, Typography, useTheme } from "@mui/material"
import FormInputField from "./FormInputField"
import Link from "next/link"
import React from "react"
import { FormProps } from "@/types/form";



const AuthForm = ({
    title,
    description,
    inputs,
    rememberMe,
    forgotPass,
    buttonLabel,
    handleSubmit,
    link
} : FormProps) => {
    const theme = useTheme()

    return (
        <Card
            variant="outlined"
            sx={{
                padding: 3,
                width: "100%",
                maxWidth: "28rem",
                margin: "0 auto",
                textAlign: "center"
            }
        }>
            <Typography variant="h3" mb={1} color="neutral">{title}</Typography>
            <Typography variant="body2" mb={3}>{description}</Typography>

            <Box mb={3}>
                {
                    inputs && inputs.length > 0 &&
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Stack gap={2}>
                            {
                                inputs.map((input, i) => (
                                    <FormInputField
                                        {...input}
                                        key={i}
                                    />
                                ))
                            }
                        </Stack>

                        <Stack mt={1.5} mb={1.5} direction="row" alignItems="center" justifyContent="space-between">
                            {
                                rememberMe &&
                                <FormControlLabel
                                    control={
                                        <Checkbox size="small" color="primary" inputRef={rememberMe} />
                                    } 
                                    label="Remember me"
                                    slotProps={{
                                        typography: {
                                            fontSize: "0.875rem",
                                            color: theme.palette.neutral.main
                                        }
                                    }}
                                />
                            }
    
                            {
                                forgotPass &&
                                <Link href="/forgot-password"><Typography variant="body2" fontWeight={500} color="accent">Forgot Password?</Typography></Link>
                            }
                        </Stack>

                        <Button type="submit" variant="contained" color="accent" fullWidth size="large">{buttonLabel}</Button>
                    </form>
                }
            </Box>

            <Typography variant="body2">{link.text} <Link href={link.to}><Typography variant="span" color="accent" fontWeight={500}>{link.label}</Typography></Link></Typography>
        </Card>
    )
}

export default AuthForm