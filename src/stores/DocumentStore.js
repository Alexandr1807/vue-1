import { defineStore } from "pinia";
import axios from 'axios'

export const useDocumentStore = defineStore("DocumentStore", {
    state: () => {
        return {
            documents: [],
            loading: true,
        }
    },
    actions: {
        
        
        async getDocuments() {
            const response = await axios.get('http://localhost:3000/documents')
            this.documents = response.data
        }
        
    }
})
