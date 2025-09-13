import { Stack, Typography } from "@mui/material"

const UserInfo = ({ label, text }: { label: string, text: string }) => {
    return (
        <Stack>
            <Typography variant="body2">{label}</Typography>
            <Typography variant="body1" fontSize={18} fontWeight={500} color="neutral">{text}</Typography>
        </Stack>
    )
}

export default UserInfo