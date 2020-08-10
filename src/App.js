import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DetailArticle from "./pages/DetailArticle";
import AdminPage from "./pages/AdminPage";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/:id(\\d+)"} component={DetailArticle} />
        <Route path={"/admin"} component={AdminPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
