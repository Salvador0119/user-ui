<template>
    <div class="mechanic-job-order">
      <h1>Job Order</h1>
      <form @submit.prevent="submitJobOrder">
        <div>
          <label for="customerName">Customer Name:</label>
          <input type="text" id="customerName" v-model="jobOrder.customerName" required />
        </div>
  
        <div>
          <label for="vehicleModel">Vehicle Model:</label>
          <input type="text" id="vehicleModel" v-model="jobOrder.vehicleModel" required />
        </div>
  
        <div>
          <label for="serviceType">Service Type:</label>
          <select id="serviceType" v-model="jobOrder.serviceType" required>
            <option value="" disabled>Select a service</option>
            <option value="oilChange">Oil Change</option>
            <option value="tireRotation">Tire Rotation</option>
            <option value="brakeInspection">Brake Inspection</option>
            <option value="engineCheck">Engine Check</option>
          </select>
        </div>
  
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="jobOrder.description"></textarea>
        </div>
  
        <button type="submit">Submit Job Order</button>
      </form>
  
      <div v-if="submissionSuccess">
        <h2>Job Order Submitted Successfully!</h2>
        <p>Thank you, {{ jobOrder.customerName }}.</p>
      </div>
    </div>
  </template>
  
  <script>

  export default {
    layout:"mechanicLayout",
    name:"index",
    data() {
      return {
        jobOrder: {
          customerName: '',
          vehicleModel: '',
          serviceType: '',
          description: '',
        },
        submissionSuccess: false,
      };
    },
    methods: {
      submitJobOrder() {
        // Here you can handle the job order submission logic,
        // like sending it to an API or saving it to a database.
        console.log("Job Order Submitted:", this.jobOrder);
        
        // Simulating a successful submission
        this.submissionSuccess = true;
  
        // Reset the form
        this.resetForm();
      },
      resetForm() {
        this.jobOrder.customerName = '';
        this.jobOrder.vehicleModel = '';
        this.jobOrder.serviceType = '';
        this.jobOrder.description = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .mechanic-job-order {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  h1 {
    text-align: center;
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  