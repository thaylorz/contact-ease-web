import { Badge, Box, Typography } from "@mui/material";

export default function PersonCounterComponent({ amountPerson }) {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center"
        }}>
            <Badge
                badgeContent={amountPerson}
                color="primary" max={999}
            >
                <Typography variant="h1" sx={{
                    font: "700 1.5rem Poppins, sans-serif",
                    color: "var(--black)",
                    marginRight: "10px"
                }}>Pessoas</Typography >
            </Badge>
        </Box>
    )
}