import axios from "axios";
import toast from "react-hot-toast";

const config = {
    apiURL: process.env.URL_BASE_CONTACT_EASE_API
};

const createErrorToast = function(errorsMessage) {
    toast.error(errorsMessage, { duration: 10000, });
}

const createSuccessToast = function(sucessMessage) {
    toast.success(sucessMessage, { duration: 5000 });
}

function showErrors(messages) {
    messages.forEach((message) => createErrorToast(message));
}

class ContactEaseApiService {
    static async getAllPersons() {
        try {
            const response = await axios.get(`${config.apiURL}/persons`);
            return response.data;
        } catch (error) {
            const errorsMessage = formatErrorMessages(error.response.data.errors);
            showErrors(errorsMessage);
            throw new Error(error);
        }
    }

    static async getPersonById(id) {
        try {
            const response = await axios.get(`${config.apiURL}/persons/${id}`);
            return response.data;
        } catch (error) {
            const errorsMessage = formatErrorMessages(error.response.data.errors);
            showErrors(errorsMessage);
            throw new Error(error);
        }
    }

    static async createPerson(name, nickname, notes) {
        const data = {
            name: name,
            nickname: nickname,
            notes: notes
        };

        try {
            const response = await axios.post(`${config.apiURL}/persons`, data);
            createSuccessToast("Pessoa criada com sucesso.");
            return response.data;
        } catch (error) {
            const errorsMessage = formatErrorMessages(error.response.data.errors);
            showErrors(errorsMessage);
            throw new Error(error);
        }
    }

    static async updatePerson(id, name, nickname, notes) {
        const data = {
            name: name,
            nickname: nickname,
            notes: notes
        };

        try {
            const response = await axios.put(`${config.apiURL}/persons/${id}`, data);
            createSuccessToast("Pessoa atualizada com sucesso.");
            return response.data;
        } catch (error) {
            const errorsMessage = formatErrorMessages(error.response.data.errors);
            showErrors(errorsMessage);
            throw new Error(error);
        }
    }

    static async deletePerson(id) {
        try {
            const response = await axios.delete(`${config.apiURL}/persons/${id}`);
            createSuccessToast("Pessoa removida com sucesso.");
        } catch (error) {
            const errorsMessage = formatErrorMessages(error.response.data.errors);
            showErrors(errorsMessage);
            throw new Error(error);
        }
    }

    static async getAllContacts(personId) {
        try {
            const response = await axios.get(`${config.apiURL}/persons/${personId}/contacts`);
            return response.data;
        } catch (error) {
            const errorsMessage = formatErrorMessages(error.response.data.errors);
            showErrors(errorsMessage);
            throw new Error(error);
        }
    }

    static async createContact(personId, type, value) {
        const data = { type, value };

        try {
            const response = await axios.post(`${config.apiURL}/persons/${personId}/contacts`, data);
            createSuccessToast("Contado criado com sucesso.");
            return response.data;
        } catch (error) {
            const errorsMessage = formatErrorMessages(error.response.data.errors);
            showErrors(errorsMessage);
            throw new Error(error);
        }
    }

    static async deleteContact(personId, id) {
        try {
            const response = await axios.delete(`${config.apiURL}/persons/${personId}/contacts/${id}`);
            createSuccessToast("Contado removido com sucesso.");
        } catch (error) {
            const errorsMessage = formatErrorMessages(error.response.data.errors);
            showErrors(errorsMessage);
            throw new Error(error);
        }
    }

    static async getContactById(personId, id) {
        try {
            const response = await axios.get(`${config.apiURL}/persons/${personId}/contacts/${id}`);
            return response.data;
        } catch (error) {
            const errorsMessage = formatErrorMessages(error.response.data.errors);
            showErrors(errorsMessage);
            throw new Error(error);
        }
    }

    static async updateContact(personId, id, type, value) {
        const data = { type, value };

        try {
            const response = await axios.put(`${config.apiURL}/persons/${personId}/contacts/${id}`, data);
            createSuccessToast("Contado atualizado com sucesso.");
            return response.data;
        } catch (error) {
            const errorsMessage = formatErrorMessages(error.response.data.errors);
            showErrors(errorsMessage);
            throw new Error(error);
        }
    }
}

function formatErrorMessages(errors) {
    const errorMessages = [];

    for (let key in errors) {
        const messages = errors[key];
        for (let i = 0; i < messages.length; i++) {
            errorMessages.push(`${messages[i]}`);
        }
    }

    return errorMessages;
}

export default ContactEaseApiService;