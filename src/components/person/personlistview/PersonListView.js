import { Box, Button, Container, List, } from "@mui/material";
import PersonListItem from "../personlistitem/PersonListitem";
import { useEffect, useState } from "react";
import PersonCounterComponent from "../personcounter/PersonCounterComponent";
import PersonModalComponent from "../personmodal/PersonModalComponent";
import ContactEaseApiService from "../../../services/ContactEaseApiService";

export default function PersonListView() {
    const [openPersonModel, setOpenPersonModel] = useState(false);
    const handleOpenPersonModal = () => setOpenPersonModel(true);
    const handleClosePersonModal = () => setOpenPersonModel(false);
    const [editPerson, setEditPerson] = useState();
    const [persons, setPersons] = useState([]);

    const handleSubmitPerson = (person) => {
        const existingPerson = persons.find(p => p.id === person.id);

        if (existingPerson) {
            existingPerson.name = person.name;
            existingPerson.nickname = person.nickname;
            existingPerson.notes = person.notes;
        } else {
            setPersons([...persons, person]);
        }

        setEditPerson('');

        handleClosePersonModal();
    };

    async function handleDeletePerson(id) {
        try {
            await ContactEaseApiService.deletePerson(id);

            setPersons(persons.filter(person => person.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    async function handleEditPerson(id) {
        try {
            const person = await ContactEaseApiService.getPersonById(id);
            setEditPerson(person);
            handleOpenPersonModal();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function getAllPersons() {
            try {
                const persons = await ContactEaseApiService.getAllPersons();
                setPersons(persons);
            } catch (error) {
                console.error(error);
            }
        }
        getAllPersons();
    }, []);

    return (
        <Container sx={{ padding: "2rem" }}>
            <Box sx=
                {{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "1em"
                }}
            >
                <PersonCounterComponent amountPerson={persons.length} />
                <Button
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
                    variant="contained"
                    onClick={handleOpenPersonModal}
                >Nova pessoa</Button>
            </Box>
            <Box>
                <List sx={{
                    height: "75vh",
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
                }}>
                    {
                        persons && persons.map((person) =>
                            <PersonListItem
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                nickname={person.nickname}
                                onClickEditPerson={handleEditPerson}
                                onClickDeletePerson={handleDeletePerson}
                            />
                        )
                    }
                </List>
            </Box>
            <PersonModalComponent
                isOpen={openPersonModel}
                onSubmit={handleSubmitPerson}
                onClose={handleClosePersonModal}
                person={editPerson}
            />
        </Container>
    )
}