import axios from "axios";

const API_URL = axios.create({
    baseURL: "http://localhost:8000", // Ensure correct base URL
});

export const uploadFile = async (data) => {
    try {
        let response = await API_URL.post("/upload", data); // Upload file
        return response.data; // Returns { message, fileUrl }
    } catch (error) {
        console.error("Error occurred during file upload:", error);
        throw error;
    }
};


export const getFileURL = async (fileId) => {
    try {
        let response = await API_URL.get(`/files/download/${fileId}`);
        return response.data; // Returns file details or direct download response
    } catch (error) {
        console.error("Error occurred while fetching file URL:", error);
        throw error;
    }
};
