<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h3>Create User</h3>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="newUser.name"
                :rules="[rules.required]"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="newUser.email"
                :rules="[rules.required, rules.email]"
                label="Email"
                required
              ></v-text-field>
              <v-btn @click="addUser" :disabled="!valid">Add User</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h3>User List</h3>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="(user, index) in users" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ user.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-alert v-if="users.length === 0" type="info">
              No users added yet.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      newUser: {
        name: '',
        email: '',
      },
      users: [],
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
      },
    };
  },
  methods: {
    addUser() {
      if (this.$refs.form.validate()) {
        this.users.push({ ...this.newUser });
        this.newUser.name = '';
        this.newUser.email = '';
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
