import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Stack } from "@mui/material";
import { FaHeart, FaTrashAlt, FaUserAlt, FaUserEdit } from "react-icons/fa";

export default function ContactListItemComponent({
    id,
    type,
    value,
    onClickDeleteContact,
    onClickEditContact,
    onClickLikeContact
}) {
    return (
        <ListItem
            sx={{
                background: "var(--white)",
                borderRadius: "0.5rem",
                boxShadow: "0 0.125rem 0.75rem rgba(0,0,0,.04)",
                padding: "1.5rem",
                border: "1px solid transparent",
                marginBottom: "10px"
            }}
        >
            <ListItemIcon>
                <FaUserAlt />
            </ListItemIcon>
            <ListItemText
                primary={type}
                secondary={value}
                sx={{
                    '& .MuiListItemText-primary': {
                        color: 'var(--gray-dark)',
                        fontWeight: "600",
                        fontSize: "20px"
                    }
                }}
            />
            <ListItemSecondaryAction>
                <Stack direction="row" spacing={0.1}>
                    <IconButton
                        aria-label="like"
                        size="small"
                        title="Favoritar contato"
                        onClick={() => onClickLikeContact(id)}
                    >
                        <FaHeart />
                    </IconButton>

                    <IconButton
                        aria-label="edit"
                        size="small"
                        title="Editar contato"
                        onClick={() => onClickEditContact(id)}
                    >
                        <FaUserEdit width="16" />
                    </IconButton>

                    <IconButton
                        aria-label="delete"
                        size="small"
                        title="Deletar contato"
                        onClick={() => onClickDeleteContact(id)}
                    >
                        <FaTrashAlt />
                    </IconButton>
                </Stack>
            </ListItemSecondaryAction>
        </ListItem>
    )
}