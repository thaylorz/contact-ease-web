import { Box, Button, List, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import ContactEaseApiService from "../../../services/ContactEaseApiService";
import ContactCounterComponent from "../contactcounter/ContactCounterComponent";
import ContactListItemComponent from "../contactlistitem/ContactListItemComponent";

export default function ContactModalComponent({ isOpen, onClose, personId }) {
    const [contacts, setContacts] = useState([]);

    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        async function getAllContacts() {
            try {
                const contacts = await ContactEaseApiService.getAllContacts(personId);
                setContacts(contacts);
            } catch (error) {
                console.error(error);
            }
        }

        isOpen && getAllContacts();
    }, [isOpen, personId]);

    const handleSubmitFormContato = (event) => {
        event.preventDefault();

        id ? editContact() : createContact();
    }

    const handleDeleteContact = async (id) => {
        try {
            await ContactEaseApiService.deleteContact(personId, id);
            setContacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditContact = async (id) => {
        try {
            const contact = await ContactEaseApiService.getContactById(personId, id);
            setId(contact.id);
            setType(contact.type);
            setValue(contact.value);
        } catch (error) {
            console.error(error);
        }
    }

    const createContact = async () => {
        try {
            const newContact = await ContactEaseApiService.createContact(personId, type, value)
            setContacts([...contacts, newContact]);

            setType('');
            setValue('');
        } catch (error) {
            console.error(error);
        }
    }

    const editContact = async () => {
        try {
            const editContact = await ContactEaseApiService.updateContact(personId, id, type, value);
            const contact = contacts.find(c => c.id === editContact.id);

            contact.type = editContact.type;
            contact.value = editContact.value;

            setId('');
            setType('');
            setValue('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50vw",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <ContactCounterComponent amountContact={contacts.length} />
                <Box
                    component="form"
                    onSubmit={handleSubmitFormContato}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "2em"
                    }}
                >
                    <Box
                        mr={1}
                        sx={{
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        <Box mr={1}>
                            <TextField
                                required
                                size="small"
                                label="Tipo de Contato"
                                fullWidth
                                autoFocus={true}
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            />
                        </Box>
                        <Box>
                            <TextField
                                required
                                size="small"
                                label="Contato"
                                fullWidth
                                value={value}
                                onChange={(event) => setValue(event.target.value)}
                            />
                        </Box>
                    </Box>

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            height: "2.5rem",
                            borderRadius: "0.5rem",
                            fontWeight: "500",
                            background: "var(--blue)",
                            color: "var(--white)",
                            padding: "0 1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                    > {id ? "Salvar" : "Adicionar"}
                    </Button>
                </Box>
                <Box>
                    <List
                        sx={{
                            height: "50vh",
                            overflowY: "scroll",
                            paddingRight: "10px",
                            "::-webkit-scrollbar": {
                                width: "6px",
                                height: "10px"
                            },
                            "::-webkit-scrollbar-track": {
                                backgroundColor: "transparent"
                            },
                            "::-webkit-scrollbar-thumb": {
                                backgroundColor: "var(--gray-dark)",
                                borderRadius: "3px"
                            },
                            "::-webkit-scrollbar-corner": {
                                backgroundColor: "transparent"
                            }
                        }}
                    >
                        {
                            contacts.map((contact) =>
                                <ContactListItemComponent
                                    key={contact.id}
                                    id={contact.id}
                                    type={contact.type}
                                    value={contact.value}
                                    onClickDeleteContact={handleDeleteContact}
                                    onClickEditContact={handleEditContact}
                                >
                                </ContactListItemComponent>
                            )
                        }
                    </List>
                </Box>
            </Box>
        </Modal>
    )
}