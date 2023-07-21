<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link class="text-white font-bold uppercase text-2xl mr-4" :to="{ name: 'home'}" exact-active-class="no-active">Music</router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about'}">About</router-link>
          </li>
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage'}">Manage</router-link>
            </li>
            <li>
             <a class="px-2 text-white" href="#" @click.prevent="logout">Logout</a>
            </li>
          </template>

        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores, mapActions, mapState, mapWritableState } from 'pinia'
import useUserStore from '@/stores/user'
import useModalStore from '@/stores/modal'
export default {
  name: 'AppHeader',
  computed: {
    ...mapStores(useModalStore,useUserStore)
    // ...mapWritableState(useModalStore,["isOpen"])
  },
  methods: {
    ...mapActions(useUserStore,['signOut']),
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
      //when we have mapWritableStates imported and used like in the computed section, we can simply just use
      // this.isOpen
    },
    async logout(){
      try{
        await this.signOut();
      }catch(error){
        alert("An unexpected error occurred, please try again...");
      }
    }
  }
}
</script>
