<template>
  <!-- Registration Form -->
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="registration_show_alert"
    :class="registration_alert_variant"
  >
    {{ registration_alert_message }}
  </div>
  <vee-form :validation-schema="schema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
                      <!-- Favorite Genre of music-->
                      <div class="mb-3">
                        <label class="inline-block mb-2">Favorite Genre</label>
                        <vee-field name="favorite_genre" :bails="false" v-slot="{ field }">
                          <input
                            type="text"
                            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                            placeholder="Favorite Genre"
                            v-bind="field"
                          />
                        </vee-field>
                        <ErrorMessage class="text-red-600" name="favorite_genre" />
                      </div>
                      <!-- TOS -->
                      <div class="mb-3 pl-6">
                        <vee-field
                          name="tos"
                          type="checkbox"
                          value="1"
                          class="w-4 h-4 float-left -ml-6 mt-1 rounded"
                        />
                        <ErrorMessage class="text-red-600 block" name="tos" />
                        <label class="inline-block">Accept terms of service</label>
                      </div>
                      <button
                        type="submit"
                        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
                        :disabled="registration_in_submission"
                      >
                        Submit
                      </button>
                    </vee-form>
</template>

<script>
//@ basically auto locks to src directory hence why we use it here.
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user';
export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        //add validation to name of field
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        favorite_genre: 'required|min:3|max:100',
        password: 'required|min:9|max:100|excluded:password',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica,',
        tos: 'tos'
      },

      //initial value for form input
      userData: {
        country: 'USA'
      },
      registration_in_submission: false,
      registration_show_alert: false,
      registration_alert_variant: 'bg-blue-500',
      registration_alert_message: 'Please wait, your account is being created...'
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: "register",
    }),

    async register(values) {
      this.registration_show_alert = true
      this.registration_in_submission = true
      this.registration_alert_variant = 'bg-blue-500'
      this.registration_alert_message = 'Please wait, your account is being created...'

      try {
        await this.createUser(values);
      }
      catch (error) {
        this.registration_in_submission = false;
        this.registration_alert_variant = 'bg-red-600'
        this.registration_alert_message = 'An unexpected error occurred. Please try again later...'
        return;
      }


      this.registration_alert_variant = 'bg-green-500'
      this.registration_alert_message = 'Success! Your account has been created!'
    }
  }
}
</script>
