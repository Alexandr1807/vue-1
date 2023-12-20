<template>
    <div>
        <h1 style="margin-bottom: 20px">Таблица пользователей</h1>
        <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items-length="totalItems"
            :items="serverItems"
            :loading="store.loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
        >
        <template v-slot:tfoot>
        <tr>
          <td>
            <v-text-field v-model="name" hide-details placeholder="Search name..." class="ma-2" density="compact"></v-text-field>
          </td>
        </tr>
      </template>
            <template v-slot:item="user">
                <tr @click="handleClick(user.item.id)">
                    <td style="text-align: start;">{{ user.item.id }}</td>
                    <td style="text-align: start;">{{ user.item.name }}</td>
                    <td style="text-align: start;">{{ user.item.secondName }}</td>
                    <td style="text-align: start;">{{ user.item.birthDate }}</td>
                    <td style="text-align: start;">{{ user.item.passport }}</td>
                    <td style="text-align: start;">{{ convertSex(user.item.sex) }}</td>
                    <td style="text-align: start;"><v-checkbox disabled="true"></v-checkbox></td>
                </tr>
            </template>

        </v-data-table-server>
    </div>
</template>

<script setup>
import router from '@/router';
import {useUserStore} from '@/stores/UserStore'

let serverItems = ref([])
let totalItems = ref(0)
let search = ref('')
let itemsPerPage = ref(5)
let name = ref('')

const store = useUserStore()
const headers = ref([
        {
            title: "ID",
            key: "id",
            align: "start"
        },
        {
            title: "Имя",
            key: "name",
            align: "start"
        },
        {
            title: "Фамилия",
            key: "secondName",
            align: "start"
        },
        {
            title: "Дата рождения",
            key: "birthDate",
            align: "start"
        },
        {
            title: "Паспортные данные",
            key: "passport",
            align: "start"
        },
        {
            title: "Пол",
            key: "sex",
            align: "start"
        },
        {
            title: "Активность",
            key: "activity",
            align: "start"
        },
        {
            title: "",
            key: ""
        }
    ]
)

function handleClick (id) {
    router.push({ path: 'users', name: "UserProfile", params: {id: id}})
}

let convertSex = (val) => {
    if (val == 1) {
        return 'Муж'
    } else if (val == 2) {
        return 'Жен'
    } else {
        return 'Не указан'
    }
}

const FakeAPI = {
    async fetch ({ page, itemsPerPage, sortBy, search }) {
        return new Promise(resolve => {
        setTimeout(() => {
            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const items = store.users.slice().filter(item => {
                if (search.name && !item.name.toLowerCase().includes(search.name.toLowerCase())) {
                    return false
                }

                return true
            })

            if (sortBy.length) {
                const sortKey = sortBy[0].key
                const sortOrder = sortBy[0].order
                items.sort((a, b) => {
                    const aValue = a[sortKey]
                    const bValue = b[sortKey]
                    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
                })
            }

            const paginated = items.slice(start, end)

            resolve({ items: paginated, total: items.length })
        }, 500)
        })
    },
}

watch(name, () => {
    search.value = String(Date.now())
})
    
function loadItems({ page, itemsPerPage, sortBy }) {
    store.loading = true
    FakeAPI.fetch({ page, itemsPerPage, sortBy, search: { name: name.value } }).then(({ items, total }) => {
        serverItems = items
        totalItems = total
        store.loading = false
    })
}


onMounted(() => {
    store.getUsers()
})
</script>

<style scoped>

tr:hover {
 background-color: #f7f7f769;
 cursor: pointer;
}

</style>