"use client"

import { Card, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material"
import Form from "next/form"
import FormInputField from "./FormInputField"
import { useActionState } from "react"
import { purchase } from "@/actions/purchase"
import { UserShippingInfo } from "@/types/shipping"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';

const PurchaseForm = ({ user, productId }: { user: UserShippingInfo, productId: number }) => {
    const [state, formAction] = useActionState(purchase, null)


    return (
        <Form id="purchase" action={formAction}>
            <input hidden name="itemId" value={productId} readOnly />


            <Card variant="outlined" sx={{ p: 3, mb: 3 }}>
                {state?.error && <Typography mb={2} variant="body1" color="error" fontStyle="italic">{state?.error}</Typography>}
                <Stack mb={3} direction={"row"} alignItems={"center"} gap={1}>
                    <CheckroomOutlinedIcon />
                    <Typography variant="h3">Product settings</Typography>
                </Stack>

                <FormControl fullWidth size="small">
                    <InputLabel id="size-select">Size</InputLabel>
        
                    <Select
                        labelId="size-select"
                        label="Size"
                        defaultValue="XS"
                        name="itemSize"
                    >
                        <MenuItem value="XS">XS</MenuItem>
                        <MenuItem value="S">S</MenuItem>
                        <MenuItem value="M">M</MenuItem>
                        <MenuItem value="L">L</MenuItem>
                        <MenuItem value="XL">XL</MenuItem>
                    </Select>
                </FormControl>
            </Card>
            <Card variant="outlined" sx={{ p: 3 }}>
                <Stack mb={2} direction={"row"} alignItems={"center"} gap={1}>
                    <LocationOnOutlinedIcon />
                    <Typography variant="h3">Shipping information</Typography>
                </Stack>

                <Stack gap={2}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <FormInputField
                                label="First Name"
                                placeholder="Ivan"
                                defaultValue={user.firstName}
                                type="text"
                                name="firstName"
                                required={true}
                            />
                        </Grid>
                        <Grid size={6}>
                            <FormInputField
                                label="Last Name"
                                placeholder="Ivanov"
                                defaultValue={user.lastName}
                                type="text"
                                name="lastName"
                                required={true}
                            />
                        </Grid>
                    </Grid>
                    <FormInputField
                        label="Address"
                        placeholder="Petar Dertliev 13 blvd."
                        defaultValue={user.address}
                        type="text"
                        name="address"
                        required={true}
                    />
                    <FormInputField
                        label="Phone Number"
                        placeholder="+359 88 888 888"
                        defaultValue={user.phoneNumber}
                        name="phone"
                        type="text"
                        required={true}
                    />
                </Stack>
            </Card>
            
        </Form>
    )
}

export default PurchaseForm