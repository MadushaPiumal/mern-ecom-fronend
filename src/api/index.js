import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/" });

// const API = axios.create({
//   baseURL: "https://economi-centre-sl-api.herokuapp.com",
// });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userInfo")).token
    }`;
  }

  return req;
});

//USER

export const userLoginAPI = (email, password) =>
  API.post(`api/admin/users/login`, { email, password });

export const listUsersAPI = () => API.get("/api/admin/users");

export const listUserDetailsAPI = (id) => API.get(`/api/admin/users/${id}`);

export const RegisterAPI = (name, email, centreName, password) =>
  API.post("/api/admin/users/", { name, email, centreName, password });

export const DeleteUsersAPI = (id) => API.delete(`/api/admin/users/${id}`);

export const UpdateUsersAPI = (user) =>
  API.put(`/api/admin/users/profile`, user);

export const SearchUserAPI = (userName) =>
  API.post("/api/admin/users/search", { userName });

//Centre

export const ImageuploadAPI = () => API.get("/api/admin/imageupload");

export const listCentreAPI = () => API.get("/api/admin/centres");

export const CertreDetailsAPI = (id) => API.get(`/api/admin/centres/${id}`);

//export const CertreRegisterAPI = (centreName,centreAddress) => API.post("/api/admin/centres/register", { centreName,centreAddress });
export const CertreRegisterAPI = (
  centreName,
  centreAddress,
  openDays,
  secureUrl,
  assetId
) =>
  API.post("/api/admin/centres/register", {
    centreName,
    centreAddress,
    openDays,
    secureUrl,
    assetId,
  });
export const CertreDeleteAPI = (id) => API.delete(`/api/admin/centres/${id}`);

export const CertreUpdateAPI = (centre) =>
  API.put(`/api/admin/centres/${centre._id}`, centre);

export const CertreSearchAPI = (centreName) =>
  API.post("/api/admin/centres/search", { centreName });

//Items

export const listItemsAPI = () => API.get("/api/admin/items");

export const ItemsDetailsAPI = (id) => API.get(`/api/admin/items/${id}`);

export const ItemRegisterAPI = (itemName) =>
  API.post("/api/admin/items/register", { itemName });

export const ItemDeleteAPI = (id) => API.delete(`/api/admin/items/${id}`);

export const ItemUpdateAPI = (item) =>
  API.put(`/api/admin/items/${item._id}`, item);

export const ItemSearchAPI = (itemName) =>
  API.post("/api/admin/iems/search", { itemName });

//Price

export const listPricesAPI = (dateTime) =>
  API.post("/api/admin/price", { dateTime });

export const PriceDetailsAPI = (id) => API.get(`/api/admin/price/${id}`);

export const PriceRegisterAPI = (item, centre, price, dateTime) =>
  API.post("/api/admin/price/register", { item, centre, price, dateTime });

export const PriceDeleteAPI = (id) => API.delete(`/api/admin/price/${id}`);

export const PriceUpdateAPI = (price) =>
  API.put(`/api/admin/price/${price._id}`, price);

export const PriceSearchAPI = (price) =>
  API.post("/api/admin/price/search", { price });
