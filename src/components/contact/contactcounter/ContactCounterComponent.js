import { Badge, Box, Typography } from "@mui/material";

export default function ContactCounterComponent({ amountContact }) {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center"
        }}>
            <Badge
                badgeContent={amountContact}
                color="primary" max={999}
            >
                <Typography variant="h1" sx={{
                    font: "700 1.5rem Poppins, sans-serif",
                    color: "var(--black)",
                    marginRight: "10px"
                }}>Contatos</Typography >
            </Badge>
        </Box>
    )
}