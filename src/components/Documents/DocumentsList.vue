<template>
    <div>
        <h1 style="margin-bottom: 20px">Таблица документов</h1>
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
                        <v-text-field v-model="name" hide-details placeholder="Сотрудник" class="ma-2" density="compact"></v-text-field>
                    </td>
                </tr>
            </template>
            <template v-slot:item="doc">
                <tr @click.stop="handleClick(doc.item.id)">
                    <td>{{ convertDocType(doc.item.docType) }}</td>
                    <td>{{ doc.item.number }}</td>
                    <td>{{ doc.item.date }}</td>
                    <td>{{ cutDescription(doc.item.description) }}</td>
                    <td>{{ convertType(doc.item.type) }}</td>
                    <td>{{ convertPerson(doc.item.person) }}</td>
                </tr>
            </template>
        </v-data-table-server>
    </div>
</template>

<script setup>
import router from '@/router';
import {useDocumentStore} from '@/stores/DocumentStore'

const store = useDocumentStore()

let serverItems = ref([])
let totalItems = ref(0)
let search = ref('')
let itemsPerPage = ref(5)
let name = ref('')

const headers = ref([
    {
        title: "Тип",
        key: "docType"
    },
    {
        title: "Номер",
        key: "number"
    },
    {
        title: "Дата",
        key: "date"
    },
    {
        title: "Описание",
        key: "description"
    },
    {
        title: "Тип счет-фактуры",
        key: "type"
    },
    {
        title: "Доверенный человек",
        key: "person"
    },
    {
        title: "",
        key: ""
    }
])

function handleClick (id) {
    router.push({ path: 'docs', name: "Document", params: {id: id}})
}

let convertType = (val) => {
    if (val === 1) {
        return 'Стандартная'
    } else if (val === 2) {
        return 'Дополнительная'
    } else {
        return '-'
    }
}

let convertDocType = (val) => {
   return val === 1 ? 'Счет-фактура' : 'Доверенность'
}

let cutDescription = (val) => {
    let sliced = val.slice(0, 50);
    if (sliced.length < val.length) {
        sliced += '...';
    }
    return sliced
}

let convertPerson = (val) => {
    return val === 0 ? '-' : val
}

const FakeAPI = {
    async fetch ({ page, itemsPerPage, sortBy, search }) {
        return new Promise(resolve => {
        setTimeout(() => {
            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage
            const items = store.documents.slice().filter(item => {
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
    store.getDocuments()
})
</script>
<style>
    
</style>