import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ItemsScreen from "./screens/ItemsScreen";
import ItemEditScreen from "./screens/ItemEditScreen";
import UserScreen from "./screens/UserScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PriceScreen from "./screens/PriceScreen";
import RegisterScreen from "./screens/UserRegisterScreen";
import CentreEditScreen from "./screens/CentreEditScreen";

import AboutUsScreen from "./screens/AboutUsScreen";
import ProductScreen from "./screens/ProductScreen";
import AdminScreen from "./screens/AdminScreen";

import "./index.css";
import { Container } from "react-bootstrap";

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo);
  return (
    <BrowserRouter>
      {userInfo ? (
        <Switch>
          <Container>
            <Header />
            <Route exact path="/home" component={HomeScreen} />
            <Route exact path="/about" component={AboutUsScreen} />
            <Route exact path="/centres" component={HomeScreen} />         
            <Route exact path="/items" component={ItemsScreen} />
            <Route exact path="/item/:id/edit" component={ItemEditScreen} />
            <Route exact path="/users" component={UserScreen} />
            <Route exact path="/user/:id/edit" component={UserEditScreen} />
            <Route exact path="/price" component={PriceScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/admin" component={AdminScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/centre/:id/edit" component={CentreEditScreen} />
            <Footer />
          </Container>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default App;
