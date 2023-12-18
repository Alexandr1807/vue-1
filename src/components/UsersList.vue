<template>
    <div>
        <h1 style="margin-bottom: 20px">Таблица пользователей</h1>
        <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items-length="totalItems"
            :items="serverItems"
            :loading="loading"
            :search="search"
            item-value="name"
            @update:options="loadItems"
        ></v-data-table-server>
    </div>
</template>

<script>
export default {
    data () {
        return {
            users: [
            {id: 1, name: 'John', secondName: 'Wick', birth: '18.07.1980', passport: 'AB72372137', sex: 'Male', activity: 1},
            {id: 2, name: 'John', secondName: 'Wick', birth: '18.07.1980', passport: 'AB72372137', sex: 'Male', activity: 1},
            {id: 3, name: 'John', secondName: 'Wick', birth: '18.07.1980', passport: 'AB72372137', sex: 'Male', activity: 1}
            ]
        }
    }
}
</script>
<style>
    
</style>