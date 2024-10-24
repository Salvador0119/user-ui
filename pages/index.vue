<!-- <template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-container>
      <v-card>
        <v-card-title class="headline">{{ isLogin ? 'Login' : 'User Registration' }}</v-card-title>
        <v-card-text>
          <v-form v-if="!isLogin">
            <v-text-field label="Enter Role Number (1: Admin, 2: Cashier, 3: Mechanic)" v-model="roleInput"
              @change="setRole(roleInput)"></v-text-field>

            <v-text-field v-if="selectedRole" v-model="userInput.username"
              :label="`${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Username`"></v-text-field>

            <v-text-field v-model="userInput.password" label="Password" type="password"></v-text-field>

            <v-btn @click="submitRegistration">Register</v-btn>
          </v-form>

          <v-form v-if="isLogin">
            <v-text-field label="Username" v-model="loginInput.username" required></v-text-field>

            <v-text-field label="Password" v-model="loginInput.password" type="password" required></v-text-field>

            <v-btn @click="submitLogin">Login</v-btn>
          </v-form>

          <v-btn @click="toggleForm">
            {{ isLogin ? 'Register Instead' : 'Login Instead' }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  layout: "auth",
  data() {
    return {
      isLogin: false,
      roleInput: '', // To hold the role input value
      selectedRole: null,
      userInput: { username: '', password: '', },
      loginInput: { username: '', password: '' },
    };
  },
  methods: {
    setRole(num) {
      const roleMap = { 1: 'admin', 2: 'cashier', 3: 'mechanic' };
      this.selectedRole = roleMap[num] || null;
    },
    // async submitRegistration() {
    //   console.log(this.userInput, this.selectedRole)
    //   try {
    //     await axios.post('http://localhost:1337/api/user-types', {
    //       username: this.userInput.username,
    //       password: this.userInput.password, // Send the password
    //       role: this.selectedRole,
    //     });
    //     // Switch to login form after registration
    //     this.isLogin = true;
    //     this.resetForm();
    //   } catch (error) {
    //     console.error(error);
    //     // Handle error (e.g., show an error message)
    //   }
    // },



    async submitRegistration() {
      console.log(this.userInput, this.selectedRole);
      try {
        const payload = {
          data: {
            username: this.userInput.username,
            password: this.userInput.password,
            role: this.selectedRole,
          },
        };

        // await axios.post('http://localhost:1337/api/user-types', payload);
        // this.isLogin = true;
        // this.resetForm();

        this.$axios.post('http://localhost:1337/api/user-types', payload)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

      } catch (error) {
        console.error(error);
        // Handle error (e.g., show an error message)
      }
    },

    async submitLogin() {
      try {
        // this.$axios.get('http://localhost:1337/api/user-types/${this.$route.params.id}', {
        //   identifier: this.loginInput.username,
        //   password: this.loginInput.password,

        // }.then((response) => {
        //   console.log(response);
        //   this.attributes.data = true;
        // })

        //   .catch(function (error) {
        //     console.log(error);
        //   })

        // );

        this.$axios
          .get(`http://localhost:1337/api/user-types`)
          .then((response) => {
            console.log(response.data.data);
            this.identifier = this.loginInput.username;
             this.password = this.loginInput.password;
            })
          .catch((error) => {
            console.log(error);
          });




        // Handle successful login (e.g., save token, redirect)
        localStorage.setItem('token', response.data.jwt);

        // Redirect based on user role
        const role = response.data.role; // Ensure the role is included in the response
        switch (role) {
          case 'admin':
            this.$router.push('/admin-dashboard'); // Admin dashboard path
            break;
          case 'cashier':
            this.$router.push('/cashier-page'); // Cashier page path
            break;
          case 'mechanic':
            this.$router.push('/mechanic-page'); // Mechanic page path
            break;
          default:
            console.error('Unknown role');
        }

      }
      catch (error) {
        console.error(error);
        // Handle error (e.g., show an error message)
      }
    },


    toggleForm() {
      this.isLogin = !this.isLogin;
      this.resetForm();
    },
    resetForm() {
      this.roleInput = '';
      this.selectedRole = null;
      this.userInput.username = '';
      this.userInput.password = '';
      this.loginInput.username = '';
      this.loginInput.password = '';
    },
  },
};
</script>

<style scoped>
.v-card {
  max-width: 400px;
  margin: auto;
}
</style> -->
