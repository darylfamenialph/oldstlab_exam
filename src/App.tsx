import "antd/dist/antd.css";
import { Layout } from "antd";
import "./App.scss";
import ContentLayout from "./components/content/content";
import FooterLayout from "./components/footer/footer";
import HeaderLayout from "./components/header/header";
import { itemsStore } from "./stores/items_store";
import { useEffect } from "react";

function App() {
  const getData = () => {
    fetch("items.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        itemsStore.setStore(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout className="layout">
      <HeaderLayout />
      <ContentLayout itemsStore={itemsStore} />
      <FooterLayout />
    </Layout>
  );
}

export default App;
