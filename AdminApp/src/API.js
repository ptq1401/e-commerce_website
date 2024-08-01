//api to fetch
const api = {
  server: "http://localhost:5000/",
  //AddProduct
  addProduct: "http://localhost:5000/add-product",
  //DashBoard
  getAllOrder: "http://localhost:5000/get-all-order",
  //EditProduct
  updateProduct: "http://localhost:5000/update-product",
  getDetail: "http://localhost:5000/get-detail",
  //Login-Logout
  login: "http://localhost:5000/login-admin",
  logout: "http://localhost:5000/logout",
  //Product
  deleteProduct: "http://localhost:5000/delete-product",
  getProductAdmin: "http://localhost:5000/get-product-admin",
  //Sidebar
  checkLogin: "http://localhost:5000/check-login",
  //LiveChat
  getRoomChat: "http://localhost:5000/get-room-chat",
  postMessageAdmin: "http://localhost:5000/post-message-admin",
};
export default api;
