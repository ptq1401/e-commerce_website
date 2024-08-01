//api to fetch
const api = {
  server: "http://localhost:5000/",
  //CartPage
  getCart: "http://localhost:5000/get-cart",
  removeProduct: "http://localhost:5000/remove-product",
  //CheckoutPage
  order: "http://localhost:5000/order",
  //DetailOrder
  detailOrder: "http://localhost:5000/detail-order",
  //DetailPage
  getDetail: "http://localhost:5000/get-detail",
  addToCart: "http://localhost:5000/add-to-cart",
  //HistoryPage
  getOrder: "http://localhost:5000/get-order",
  //HomePage
  productTrending: "http://localhost:5000/product-trending",
  //LiveChat
  getDetailChat: "http://localhost:5000/get-detail-chat",
  postMessage: "http://localhost:5000/post-message",
  //LoginPage
  login: "http://localhost:5000/login",
  logout: "http://localhost:5000/logout",
  signUp: "http://localhost:5000/signup",
  //ShopPage
  getProduct: "http://localhost:5000/get-product",
};
export default api;
