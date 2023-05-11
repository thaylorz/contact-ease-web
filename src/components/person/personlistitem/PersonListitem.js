import { useState } from "react";
import { FaHeart, FaListAlt, FaTrashAlt, FaUserAlt, FaUserEdit } from "react-icons/fa";
import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Stack, } from "@mui/material";
import ContactModalComponent from "../../contact/contactmodal/ContactModalComponent";

export default function PersonListItem({
    id,
    name,
    nickname,
    onClickDeletePerson,
    onClickEditPerson,
    onClickLikePerson,
}) {
    const [openModel, setOpenModel] = useState(false);
    const handleOpen = () => setOpenModel(true);
    const handleClose = () => setOpenModel(false);
    const [contacts, setContacts] = useState([]);
    const [type, setType] = useState('');
    const [value, setValue] = useState('');

    const [openContactModel, setOpenContactModel] = useState(false);
    const handleOpenContactModal = () => setOpenContactModel(true);
    const handleCloseContactModal = () => setOpenContactModel(false);
    
    return (
        <>
            <ListItem sx={{
                background: "var(--white)",
                borderRadius: "0.5rem",
                boxShadow: "0 0.125rem 0.75rem rgba(0,0,0,.04)",
                padding: "1.5rem",
                border: "1px solid transparent",
                marginBottom: "10px"
            }}>
                <ListItemIcon>
                    <FaUserAlt />
                </ListItemIcon>
                <ListItemText
                    primary={name}
                    secondary={nickname}
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
                            aria-label="contact"
                            size="small"
                            title="Contatos"
                            onClick={handleOpenContactModal}
                        >
                            <FaListAlt />
                        </IconButton>

                        <IconButton
                            aria-label="like"
                            size="small"
                            title="Favoritar"
                            onClick={onClickLikePerson}
                        >
                            <FaHeart />
                        </IconButton>

                        <IconButton
                            aria-label="edit"
                            size="small"
                            title="Editar pessoa"
                            onClick={() => onClickEditPerson(id)}
                        >
                            <FaUserEdit width="16" />
                        </IconButton>

                        <IconButton
                            aria-label="delete"
                            size="small"
                            title="Deletar"
                            onClick={() => onClickDeletePerson(id)}
                        >
                            <FaTrashAlt />
                        </IconButton>
                    </Stack>
                </ListItemSecondaryAction>
            </ListItem>

            <ContactModalComponent
                isOpen={openContactModel}
                onClose={handleCloseContactModal}
                personId={id}
            />
        </>
    );
}