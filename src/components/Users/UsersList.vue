<template>
    <div>
        <h1 style="margin-bottom: 20px">Таблица пользователей</h1>
        <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items-length="totalItems"
            :items="store.users"
            :loading="store.loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
        >
            <template v-slot:item="user">
                <tr @click.stop="handleClick(user.item.id)">
                    <td>{{ user.item.id }}</td>
                    <td>{{ user.item.name }}</td>
                    <td>{{ user.item.secondName }}</td>
                    <td>{{ user.item.birthDate }}</td>
                    <td>{{ user.item.passport }}</td>
                    <td>{{ convertSex(user.item.sex) }}</td>
                    <td><v-checkbox v-model:model-value="model1" disabled="true"></v-checkbox></td>
                </tr>
            </template>

        </v-data-table-server>
    </div>
</template>

<script setup>
import router from '@/router';
import { useUserStore } from '@/stores/UserStore'

const store = useUserStore()
const model1 = true
const headers = ref([
    {
        title: "ID",
        key: "id"
    },
    {
        title: "Имя",
        key: "name"
    },
    {
        title: "Фамилия",
        key: "secondName"
    },
    {
        title: "Дата рождения",
        key: "birthDate"
    },
    {
        title: "Паспортные данные",
        key: "passport"
    },
    {
        title: "Пол",
        key: "sex"
    },
    {
        title: "Активность",
        key: "activity"
    },
    {
        title: "",
        key: ""
    }
])

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


onMounted(() => {
    store.fill()
})
</script>

<style scoped>
tr:hover {
  background-color: #f7f7f769;
  cursor: pointer;
}
</style>