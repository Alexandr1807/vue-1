import { defineStore } from "pinia";
import axios from 'axios'

export const useUserStore = defineStore("UserStore", {
    
    state: () => {
        return {
            users: [],
            loading: false
        }
    },
    actions: {
        async fill() {
           this.loading = true
           const response = await axios.get('http://localhost:3000/users')
           this.users = response.data
           this.loading = false
        }
    }
})
