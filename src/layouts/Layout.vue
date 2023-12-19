<template lang="">
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Admin Panel"></v-app-bar>

    <v-navigation-drawer permanent>
        <v-list>
          <router-link class="text-decoration-none" to="/users"><v-list-item class="text-black" title="Пользователи" value="users"></v-list-item></router-link>

          <router-link class="text-decoration-none" to="/docs"><v-list-item class="text-black" title="Документы" value="documents"></v-list-item></router-link>

        </v-list>
    </v-navigation-drawer>

    <v-main style="height: 100vh;">
      <router-view style="padding:20px"></router-view>
    </v-main>
  </v-layout>
</template>

<script>
export default {
    
}
</script>

<style lang="">

</style>