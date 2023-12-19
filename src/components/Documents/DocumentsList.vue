<template>
    <div>
        <h1 style="margin-bottom: 20px">Таблица документов</h1>
        <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items-length="totalItems"
            :items="documents"
            :loading="loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
        >
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
import axios from 'axios'
import router from '@/router';

const documents = ref([])
const loading = ref(false)
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

async function fetchDocuments() {
    try {
        loading.value = true
        const response = await axios.get('http://127.0.0.1:3000/documents')
        documents.value = response.data
        loading.value = false
    } catch (error) {
        
    }
}

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

onMounted(() => {
    fetchDocuments()
})
</script>
<style>
    
</style>