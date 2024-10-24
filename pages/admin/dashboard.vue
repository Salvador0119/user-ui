<template>
  <div class="main-container align-center justify-center" style="height:100vh">

    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Total Products</v-card-title>
            <v-card-subtitle>125</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Total Orders</v-card-title>
            <v-card-subtitle>300</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Revenue</v-card-title>
            <v-card-subtitle>$15000</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>


    <v-card max-width="1000" class="mx-auto" outlined>
      <v-layout column align-center>

        <v-card>
          <v-card-title>
            PRODUCT INFORMATION
            <v-spacer></v-spacer>

          </v-card-title>

          <v-data-table :headers="headers" :items="ProductData" :search="search">
          </v-data-table>


        </v-card>
      </v-layout>
    </v-card>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
  </div>
</template>
<script>
export default {
  name: "dashboard",
  data() {
    return {
      search: '',
      headers: [
        // {
        //   text: 'Patient No.',
        //   align: 'start',
        //   sortable: false,
        //   value: 'attributes.patient_no'},
        { text: 'Product Name', value: 'attributes.name' },
        { text: 'Product Price', value: 'attributes.price' },
        { text: 'Description', value: 'attributes.description' },
        // { image: 'Image', value: 'attributes.image' },
        { text: '', value: "actions" }
      ],
      ProductData: [],
      dialog: false,
      // studentId: null,
    }
  },

  methods: {
    getProductData() {
      this.$axios
        .get("http://localhost:1337/api/products")
        .then((response) => {
          console.log(response.data.data);
          this.ProductData = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getProductData();
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
  /* background-image: url(assets\background.png);  */
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>