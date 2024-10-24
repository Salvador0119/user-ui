
<template>
    <div class="main-container align-center justify-center" style="height:100vh">
      <v-card max-width="800" class="mx-auto" outlined>
        <v-layout column align-center>
          <h1>PRODUCT INFORMATION FORM</h1>
          <v-card width="700">
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field label="Product Name" v-model="name" :rules="nameRules"></v-text-field>
                <v-text-field label="Product Price" v-model="price" :rules="priceRules"></v-text-field>
                <v-text-field label="Description" v-model="description" :rules="descriptionRules"></v-text-field>
                 <v-file-input label="Upload Image" v-model="image"  :rules="imageRules" accept="image/*"
                  prepend-icon="mdi-camera"></v-file-input>
                <v-btn color="success" @click="addProduct()"><v-icon left>mdi-send-check</v-icon>Submit</v-btn>
                <v-btn color="error" @click="cancelDialog">Reset Form</v-btn> 
                <v-btn to="/admin/productRecord/productList" color="#00BCD4" @click="dialog = false"><v-icon left>mdi-arrow-left-circle</v-icon>Back</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
  
          <!-- SUCCESS SNACKBAR     -->
          <v-snackbar color="green" v-model="successSnackbar">
            {{ textSuccess }}
            <template v-slot:action="{ attrs }">
              <v-btn color="green" text v-bind="attrs" @click="successSnackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <!--   
        ERROR SNACKBAR     -->
          <v-snackbar color="red" v-model="errorSnackbar">
            {{ textError }}
            <template v-slot:action="{ attrs }">
              <v-btn color="black" text v-bind="attrs" @click="errorSnackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-layout>
      </v-card>
    </div>
  </template>
    
    
  <script>

  export default {
    layout: "default",
    name: "IndexPage",
    data() {
      return { 
  
        name: "",
        price: "",
        description: "",
        image: null,
        successSnackbar: false,
        errorSnackbar: false,
        textSuccess: "",
        textError: "",
        valid: true,

        nameRules: [(v) => !!v || "Name is required"],
        priceRules: [(v) => !!v || "Price is required"],
        descriptionRules: [(v) => !!v || "Description is required"],
        imageRules: [value => !value || value.size <200000000 || " Image is required"],
      };
    },
  
    methods: {

      cancelDialog() {
  
        this.$refs.form.reset();
  
      },
  
      addProduct() {
        console.log(this.image.name)
        if (this.$refs.form.validate()) {
          console.log("Successfully Added!");
          let payload = {
            data: {
              name: this.name,
              price: this.price,
              description:this.description,
              image:this.image.name,
            },
          };
          this.$axios
            .post(`http://localhost:1337/api/products`, payload)
            .then((response) => {
              console.log(response);
              this.$refs.form.reset();
              this.successSnackbar = true;
              this.textSuccess = "Succesfully Added! ";
            })
            .catch((error) => {
              console.log(error.response.data.error.message);
            });
        }
      },
    },
  
  };
  </script>
  
  
  
  <style scoped>
  .main-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    /* background-image: url(assets\dark.jpeg); */
    background-size: cover;
    background-position: center;
    height: 100vh;
  }
  </style>