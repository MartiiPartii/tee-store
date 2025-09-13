import { OrderDetailsInterface } from "@/types/order"
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"

const PdfPreview = ({ order }: { order: OrderDetailsInterface }) => {
    return (
        <Stack
            sx={{
                bgcolor: "white",
                p: 6,
                borderRadius: 1,
                textAlign: "start",
                width: "100%",
                mb: 4,
                overflow: "auto"
            }}
            id="preview"
        >
            <Typography variant="h2">Order №{order.id}</Typography>
            <Typography variant="body1" mb={2}>Placed on {order.date.getDate()}/{order.date.getMonth()}/{order.date.getFullYear()}</Typography>
        
            <Typography variant="body1">Receiver: <Typography variant="span" fontSize={18} fontWeight={600} color="neutral">{order.firstName} {order.lastName}</Typography></Typography>
            <Typography variant="body1">Phone: <Typography variant="span" fontSize={18} fontWeight={600} color="neutral">{order.phone}</Typography></Typography>
            <Typography variant="body1" mb={4}>Shipment Address: <Typography variant="span" fontSize={18} fontWeight={600} color="neutral">{order.address}</Typography></Typography>

            <Typography variant="h3" mb={2}>Products</Typography>

            <Table sx={{ mb: 8 }}>
                <TableHead
                    sx={{
                        fontWeight: 500,
                        bgcolor: "bgcolor.secondary"
                    }}
                >
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Sold by</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{
                        '&:last-child td, &:last-child th': {
                            border: 0
                        }
                    }}>
                        <TableCell component="th" scope="row">{order.item.name}</TableCell>
                        <TableCell>{order.item.soldByPlatform ? "Tee Store" : `${order.item.seller?.firstName} ${order.item.seller?.firstName}`}</TableCell>
                        <TableCell>{order.itemSize}</TableCell>
                        <TableCell>${order.item.price}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>


            <Typography variant="h4">Thank you!</Typography>
            <Typography variant="body1">Thank you for ordering from TeeStore. We hope you had a good experience on our platform.</Typography>
        </Stack>
    )
}

export default PdfPreview