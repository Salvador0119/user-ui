<template>
  <v-app>
    <!-- Sidebar Navigation -->
    <v-navigation-drawer
      color="#009688"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <!-- Logo Section -->
      <v-list-item>
        <v-avatar>
          <img src="/admin-avatar.png" alt="Admin" />
        </v-avatar>
        <v-list-item-content>
          <v-list-item-title style="color: white;">Admin</v-list-item-title>  <!-- Set text color to white -->
          <v-list-item-subtitle style="color: white;">Logged In</v-list-item-subtitle>  <!-- Set text color to white -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Navigation Items -->
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="color: white;">{{ item.title }}</v-list-item-title>  <!-- Set text color to white -->
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Footer Links -->
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar :clipped-left="clipped" fixed app color="#009688">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white" />
      <v-toolbar-title style="color: white">
        {{ title }} EASYFIX MOTORSHOP
      </v-toolbar-title>
      <v-spacer />
      <!-- Search and Profile -->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        style="max-width: 300px; color: white;"  <!-- Set text color to white -->
      </v-text-field>
      <v-btn icon>
        <v-icon color="white">mdi-bell</v-icon>  <!-- Set icon color to white -->
      </v-btn>
      <v-menu bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar>
              <img src="/admin-avatar.png" alt="Admin" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/admin/settings" style="color: black;">Settings</v-list-item>  <!-- Set text color to black for visibility -->
          <v-list-item to="/admin/help" style="color: black;">Help</v-list-item>  <!-- Set text color to black for visibility -->
          <v-list-item to="/logout" style="color: black;">Logout</v-list-item>  <!-- Set text color to black for visibility -->
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <!-- Add Dashboard Cards Here -->
        <!-- <v-row>
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
        </v-row> -->

        <Nuxt />
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer padless>
      <v-col class="text-center" cols="12" style="background-color: #009688; color: white;">
        &copy;2024 EasyFix MotorShop - All Rights Reserved.
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "AdminPanelLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      search: "",
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/admin/dashboard",
        },
        {
          icon: "mdi-package-variant-closed",
          title: "Products",
          to: "/admin/productRecord/productList",
        },
        {
          icon: "mdi-cart-outline",
          title: "Orders",
          to: "/admin/orders",
        },
        {
          icon: "mdi-account-group",
          title: "Users",
          to: "/admin/user/user_type",
        },
        {
          icon: "mdi-chart-line",
          title: "Reports",
          to: "/admin/reports",
        },
      ],
      miniVariant: false,
      title: "",
    };
  },
};
</script>

<style scoped>
.profile {
  background: "primary";
}
</style>
