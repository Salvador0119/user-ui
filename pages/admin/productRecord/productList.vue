<!-- <template>
    <div class="main-container align-center justify-center" style="height:100vh">
      <v-card max-width="1000" class="mx-auto" outlined>
        <v-layout column align-center>
      <v-card>
        <v-card-title>
         PRODUCT INFORMATION
          <v-spacer></v-spacer>
          
  
        </v-card-title>
  
        <v-col align="right">
          <v-btn to="/admin/productRecord/add" color="primary"
            ><v-icon>mdi-plus</v-icon>ADD PRODUCT</v-btn
          >
        </v-col>
        <v-data-table :headers="headers" :items="ProductData" :search="search">
          <template slot="item.actions" slot-scope="{item}">
            <v-btn :to="`/admin/productRecord/${item.id}/edit`" dark color="#01579B"><v-icon left>mdi-pencil</v-icon></v-btn>
            <v-btn @click="showDeleteDialog(item.id)" dark color="#D32F2F"><v-icon left>mdi-trash-can</v-icon></v-btn>
          </template>
        </v-data-table>
  
  
        <v-dialog v-model="dialog" width="500">
        <v-sheet
          class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
          color="blue-grey darken-3"
          dark
        >
          <div class="grey--text text--lighten-1 text-body-2 mb-4">
            Are you sure you want to delete this Information?
          </div>
  
          <v-btn  class="ma-1" color="grey" plain @click="dialog = false">
            Cancel
          </v-btn>
  
          <v-btn class="ma-1" color="error" plain @click="deleteData"
          >
            Delete
          </v-btn>
        </v-sheet>
      </v-dialog>
      </v-card>
        </v-layout>
        </v-card>
      </div>
    </template>
    <script>
    export default {
      name: "productlist",
      data() {
        return {
          search: '',
          headers: [
          //   {
          //     text: 'Patient No.',
          //     align: 'start',
          //     sortable: false,
          //     value: 'attributes.patient_no'},
            { text: 'Name', value: 'attributes.name' },
            { text: 'Price', value: 'attributes.price' },
            { text: 'Description', value: 'attributes.description' },
            { text: 'image', value: 'attributes.image' },
           
            { text: '', value: "actions" }
          ],
        ProductData: [],
        dialog: false,
        id: null,
        }
      },
  
  methods:{
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
          showDeleteDialog(data) {
        console.log(data);
        this.dialog = true;
        this.id = data;
      },
      deleteData() {
        this.$axios.delete(`http://localhost:1337/api/products/${this.id}`)
        .then((response)=> {
          console.log(response);
          this.dialog =false;
          this.getProductData();
        })
        .catch((error)=>{
          console.log(error);
        });
  
      },
  },
  mounted(){
    this.getProductData();
  },
    };
    </script>
    
    
  <style scoped>
  
  .main-container{
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
  
  </style> -->



  <template>
    <div class="main-container align-center justify-center" style="height:100vh">
      <v-card max-width="1000" class="mx-auto my-5 card-custom" outlined>
        <v-layout column align-center>
          <v-card>
            <v-card-title class="card-title">
              PRODUCT INFORMATION
              <v-spacer></v-spacer>
            </v-card-title>
  
            <v-col align="right">
              <v-btn @click="openDialog('add')" color="primary">
                <v-icon>mdi-plus</v-icon>ADD PRODUCT
              </v-btn>
            </v-col>
  
            <v-data-table :headers="headers" :items="ProductData" :search="search">
              <template v-slot:item.actions="{ item }">
                <v-btn @click="openDialog('edit', item)" dark color="#01579B">
                  <v-icon left>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="showDeleteDialog(item.id)" dark color="#D32F2F">
                  <v-icon left>mdi-trash-can</v-icon>
                </v-btn>
              </template>
            </v-data-table>
  
            <!-- Add Product Dialog -->
            <v-dialog v-model="dialog" width="800">
              <v-card>
                <v-card-title>
                  <h1>{{ mode === 'add' ? 'Add Product' : 'Edit Product' }}</h1>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-text-field label="Product Name" v-model="form.name" :rules="nameRules"></v-text-field>
                    <v-text-field label="Product Price" v-model="form.price" :rules="priceRules"></v-text-field>
                    <v-text-field label="Description" v-model="form.description" :rules="descriptionRules"></v-text-field>
                    <v-file-input label="Upload Image" v-model="form.image" :rules="imageRules" accept="image/*"
                      prepend-icon="mdi-camera"></v-file-input>
                    <v-btn color="success" @click="submitForm()">
                      <v-icon left>mdi-send-check</v-icon>Submit
                    </v-btn>
                    <v-btn color="error" @click="cancelDialog">Reset Form</v-btn>
                    <v-btn color="#00BCD4" @click="dialog = false">
                      <v-icon left>mdi-arrow-left-circle</v-icon>Back
                    </v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-dialog>
  
            <!-- Delete Confirmation Dialog -->
            <v-dialog v-model="deleteDialog" width="500">
              <v-sheet class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block" color="blue-grey darken-3" dark>
                <div class="grey--text text--lighten-1 text-body-2 mb-4">
                  Are you sure you want to delete this Information?
                </div>
                <v-btn class="ma-1" color="grey" plain @click="deleteDialog = false">
                  Cancel
                </v-btn>
                <v-btn class="ma-1" color="error" plain @click="deleteData">
                  Delete
                </v-btn>
              </v-sheet>
            </v-dialog>
  
            <!-- SUCCESS SNACKBAR -->
            <v-snackbar color="green" v-model="successSnackbar">
              {{ textSuccess }}
              <template v-slot:action="{ attrs }">
                <v-btn color="green" text v-bind="attrs" @click="successSnackbar = false">
                  Close
                </v-btn>
              </template>
            </v-snackbar>
  
            <!-- ERROR SNACKBAR -->
            <v-snackbar color="red" v-model="errorSnackbar">
              {{ textError }}
              <template v-slot:action="{ attrs }">
                <v-btn color="black" text v-bind="attrs" @click="errorSnackbar = false">
                  Close
                </v-btn>
              </template>
            </v-snackbar>
  
          </v-card>
        </v-layout>
      </v-card>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
    </div>
  </template>
  
  <script>
  export default {
    name: "productlist",
    data() {
      return {
        search: '',
        headers: [
          { text: 'Name', value: 'attributes.name' },
          { text: 'Price', value: 'attributes.price' },
          { text: 'Description', value: 'attributes.description' },
          { text: 'Image', value: 'attributes.image' },
          { text: '', value: "actions" }
        ],
        ProductData: [],
        dialog: false,
        deleteDialog: false,
        mode: 'add', // add or edit
        form: {
          name: '',
          price: '',
          description: '',
          image: null,
        },
        successSnackbar: false,
        errorSnackbar: false,
        textSuccess: "",
        textError: "",
        valid: true,
  
        // Validation rules
        nameRules: [(v) => !!v || "Name is required"],
        priceRules: [(v) => !!v || "Price is required"],
        descriptionRules: [(v) => !!v || "Description is required"],
        imageRules: [(value) => !value || value.size < 200000000 || "Image is required"],
        id: null,
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
      openDialog(action, item = null) {
        this.mode = action;
        this.dialog = true;
        if (action === 'edit' && item) {
          this.form = {
            name: item.attributes.name,
            price: item.attributes.price,
            description: item.attributes.description,
            image: item.attributes.image, // Update to use actual image file if needed
          };
          this.id = item.id;
        } else {
          // Reset form for adding a new product
          this.form = {
            name: '',
            price: '',
            description: '',
            image: null
          };
          this.id = null;
        }
      },
      cancelDialog() {
        this.$refs.form.reset();
      },
      submitForm() {
        if (this.$refs.form.validate()) {
          let payload = {
            data: {
              name: this.form.name,
              price: this.form.price,
              description: this.form.description,
              image: this.form.image.name, // Assuming you want to send the image name
            },
          };
          if (this.mode === 'add') {
            this.$axios
              .post("http://localhost:1337/api/products", payload)
              .then((response) => {
                console.log(response);
                this.dialog = false;
                this.getProductData();
                this.successSnackbar = true;
                this.textSuccess = "Successfully Added!";
                this.$refs.form.reset();
              })
              .catch((error) => {
                console.log(error);
                this.errorSnackbar = true;
                this.textError = error.response.data.error.message || "Failed to add product.";
              });
          } else if (this.mode === 'edit') {
            this.$axios.put(`http://localhost:1337/api/products/${this.id}`, payload)
              .then((response) => {
                console.log(response);
                this.dialog = false;
                this.getProductData();
                this.successSnackbar = true;
                this.textSuccess = "Successfully Updated!";
                this.$refs.form.reset();
              })
              .catch((error) => {
                console.log(error);
                this.errorSnackbar = true;
                this.textError = error.response.data.error.message || "Failed to update product.";
              });
          }
        }
      },
      showDeleteDialog(data) {
        console.log(data);
        this.deleteDialog = true;
        this.id = data;
      },
      deleteData() {
        this.$axios.delete(`http://localhost:1337/api/products/${this.id}`)
          .then((response) => {
            console.log(response);
            this.deleteDialog = false;
            this.getProductData();
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
    background-size: cover;
    background-position: center;
  }
  
  .card-custom {
    background-color: #ffffff; /* Set the background color */
    border-radius: 15px; /* Rounded corners */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    transition: transform 0.3s ease; /* Smooth transition for hover effect */
  }
  
  .card-custom:hover {
    transform: translateY(-2px); /* Lift effect on hover */
  }
  
  .card-title {
    font-weight: bold;
    font-size: 1.5rem;
    color: #333; /* Darker color for title */
  }
  
  .v-btn {
    margin-top: 10px; /* Spacing above buttons */
  }
  
  .v-data-table {
    margin-top: 20px; /* Spacing above data table */
  }
  </style>
  