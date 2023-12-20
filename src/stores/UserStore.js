import { defineStore } from "pinia";
import axios from 'axios'

export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            users: [],
            loading: true,
        }
    },
    actions: {
        
        
        async getUsers() {
            const response = await axios.get('http://localhost:3000/users')
            this.users = response.data
        }
        
    }
})
