<template>
    <div>
        <v-card
          class="mx-auto text-left"
          max-width="100%"
          height="700px"
        >
          <v-card-item>
            <div>
              <div class="text-h3 mb-5">
                Профиль
              </div>
              <v-divider></v-divider>
              <div class="info mt-5">
                    <v-text-field
                        v-bind:model-value=store.user.name
                        label="Имя"
                        variant="outlined"
                        readonly
                    ></v-text-field>
                    <v-text-field
                        v-bind:model-value=store.user.secondName
                        label="Фамилия"
                        variant="outlined"
                        readonly
                    ></v-text-field>
                    <v-text-field
                        v-bind:model-value=store.user.birthDate
                        label="Дата рождения"
                        variant="outlined"
                        readonly
                    ></v-text-field>
                    <v-text-field
                        v-bind:model-value=convertSex(store.user.sex)
                        label="Пол"
                        variant="outlined"
                        readonly
                    ></v-text-field>
                    <v-text-field
                        v-bind:model-value=store.user.passport
                        label="Серия и номер паспорта"
                        variant="outlined"
                        readonly
                    ></v-text-field>
                    <v-checkbox disabled="true" label="Активность" :model-value="convertActiv(store.user.activity)"></v-checkbox>
                    
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn variant="tonal">
                Назад
            </v-btn>
          </v-card-actions>
        </v-card>
    </div>
</template>

<script setup>
import {useUserStore} from '@/stores/UserStore'

const store = useUserStore()

let loading = ref(true)

const props = defineProps( {
      id: {
        type: Number,
        required: true,
      }
    })

let convertSex = (val) => {
    if (val == 1) {
        return 'Мужчина'
    } else if (val == 2) {
        return 'Женщина'
    } else {
        return 'Не указан'
    }
}

let convertActiv = (val) => {
   return val === 1 ? true : false
}

onMounted(() => {
    loading.value = true
    store.getUser(props.id)
    loading.value = false
})
</script>

<style>

.info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
    
</style>