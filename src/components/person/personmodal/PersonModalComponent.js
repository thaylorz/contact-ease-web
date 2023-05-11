import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ContactEaseApiService from "../../../services/ContactEaseApiService";

export default function PersonModalComponent({ isOpen, onClose, onSubmit, person }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        setId(person?.id || '');
        setName(person?.name || '');
        setNickname(person?.nickname || '');
        setNotes(person?.notes || '');
    }, [person]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        person?.id ? editPerson() : createPerson();
    };

    const createPerson = async () => {
        try {
            const newPerson = await ContactEaseApiService.createPerson(name, nickname, notes);

            setName('');
            setNickname('');
            setNotes('');

            onSubmit(newPerson);
        } catch (error) {
            console.error(error);
        }
    }

    const editPerson = async () => {
        try {
            const editPerson = await ContactEaseApiService.updatePerson(id, name, nickname, notes);

            setId('');
            setName('');
            setNickname('');
            setNotes('');

            onSubmit(editPerson);
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
                <Typography variant="h5" gutterBottom>
                    {person?.id ? "Editar pessoa" : "Criar pessoa"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            required
                            label="Nome"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            fullWidth
                            autoFocus={true}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            required
                            label="Apelido"
                            value={nickname}
                            onChange={(event) => setNickname(event.target.value)}
                            fullWidth
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            multiline
                            label="Notas"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            fullWidth
                            rows={6}
                        />
                    </Box>
                    <Box display="flex" gap={1} justifyContent="flex-end">
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
                        >
                            {person?.id ? "Salvar" : "Criar"}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{
                                height: "2.5rem",
                                borderRadius: "0.5rem",
                                fontWeight: "500",
                                borderColor: "var(--red)",
                                color: "var(--red)",
                                padding: "0 1rem",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                            }}
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}