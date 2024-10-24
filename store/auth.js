// // store/auth.js

// const state = {
//     user: null,
//   };
  
//   const getters = {
//     isAuthenticated: state => !!state.user,
//     userRole: state => (state.user ? state.user.role : null),
//   };
  
//   const actions = {
//     async login({ commit }, credentials) {
//       // Make API call to Strapi to authenticate the user
//       const response = await axios.post('http://localhost:1337/auth/local', credentials);
//       const user = response.data.user;
//       commit('setUser', user);
//     },
//     logout({ commit }) {
//       commit('setUser', null);
//     },
//   };
  
//   const mutations = {
//     setUser(state, user) {
//       state.user = user;
//     },
//   };
  
//   export default {
//     state,
//     getters,
//     actions,
//     mutations,
//   };
  