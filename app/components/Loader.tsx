import { Box } from "@mui/material"

const Loader = () => {
    return (
        <Box sx={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box className="loader"></Box>
        </Box>
    )
}

export default Loader