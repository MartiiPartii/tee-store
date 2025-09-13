"use client"

import { Button } from "@mui/material"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const PurchaseButton = () => {
    return (
        <Button type="submit" form="purchase" variant="contained" startIcon={<ShoppingCartOutlinedIcon />} fullWidth color="accent">Complete Order</Button>
    )
}

export default PurchaseButton