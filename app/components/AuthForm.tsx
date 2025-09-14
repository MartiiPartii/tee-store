import { Box, Button, Card, Stack, Typography } from "@mui/material"
import FormInputField from "./FormInputField"
import Link from "next/link"
import React, { useActionState } from "react"
import { FormProps } from "@/types/form";
import Form from "next/form";



const AuthForm = ({
    title,
    description,
    inputs,
    buttonLabel,
    actionCallback,
    link
} : FormProps) => {
    const [state, action] = useActionState(actionCallback, null)

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
            <Stack gap={1}  mb={3}>
                <Typography variant="h3" color="neutral">{title}</Typography>
                <Typography variant="body2">{description}</Typography>
                {state && state.error && <Typography variant="body2" color="error" fontStyle={"italic"}>{state.error}</Typography>}
            </Stack>

            <Box mb={3}>
                {
                    inputs && inputs.length > 0 &&
                    <Form action={action}>
                        <Stack gap={2} mb={3}>
                            {
                                inputs.map((input, i) => (
                                    <FormInputField
                                        {...input}
                                        key={i}
                                    />
                                ))
                            }
                        </Stack>

                        <Button type="submit" variant="contained" color="accent" fullWidth size="large">{buttonLabel}</Button>
                    </Form>
                }
            </Box>

            <Typography variant="body2">{link.text} <Link href={link.to}><Typography variant="span" color="accent" fontWeight={500}>{link.label}</Typography></Link></Typography>
        </Card>
    )
}

export default AuthForm