import "antd/dist/antd.css";
import { Layout, Spin } from "antd";
import "./App.scss";
import ContentLayout from "./components/content/content";
import FooterLayout from "./components/footer/footer";
import HeaderLayout from "./components/header/header";
import { itemsStore } from "./stores/items_store";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface itemsItem {
  id: number;
  title: string;
  description: string;
  price: number;
  dateAdded: Date;
  isActive: boolean;
  isAdded: boolean;
}

function App() {
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [arrayIndex, setarrayIndex] = useState(0);
  const setItemStore = (itemsArray: [itemsItem[]]) => {
    itemsStore.setStore(itemsArray[arrayIndex]);
    setarrayIndex(arrayIndex + 1);
    arrayIndex === 2 ? setHasMore(false) : setHasMore(true);
    setIsLoading(false);
  };

  const getData = () => {
    setTimeout(() => {
      setIsLoading(true);
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
          setItemStore(myJson);
        });
    }, 1000);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout className="layout">
      <HeaderLayout />
      <InfiniteScroll
        dataLength={itemsStore.items.length} //This is important field to render the next data
        next={() => {
          getData();
        }}
        hasMore={hasMore}
        loader={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin /> <p> Loading Data ... </p>
          </div>
        }
      >
        <ContentLayout isLoading={isLoading} itemsStore={itemsStore} />
      </InfiniteScroll>
      <br />
      {!hasMore ? (
        <div style={{ textAlign: "center" }}>--- No Data to Load ---</div>
      ) : (
        ""
      )}
      <FooterLayout />
    </Layout>
  );
}

export default App;
