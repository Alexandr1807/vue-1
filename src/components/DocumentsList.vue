<template>
    <div>
        <h1 style="margin-bottom: 20px">Таблица документов</h1>
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
        }
    }
}
</script>
<style>
    
</style>