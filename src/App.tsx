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

interface AdsItem {
  id: number;
  title: string;
  description: string;
  dateAdded: Date;
}

function App() {
  const [adsIndex, setAdsIndex] = useState(0);
  const [currentAd, setCurrentAd] = useState<AdsItem>({
    id: 0,
    title: "",
    description: "",
    dateAdded: new Date(),
  });
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [arrayIndex, setarrayIndex] = useState(0);
  const setItemStore = (itemsArray: [itemsItem[]]) => {
    itemsStore.setStore(itemsArray[arrayIndex]);
    setarrayIndex(arrayIndex + 1);
    arrayIndex === 2 ? setHasMore(false) : setHasMore(true);
    setIsLoading(false);
  };

  const getAds = () => {
    fetch("ads.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        let randomIndex = getRandomIndex(myJson.length);
        while (adsIndex == randomIndex) {
          randomIndex = getRandomIndex(myJson.length);
        }
        setAdsIndex(randomIndex);
        setCurrentAd(myJson[adsIndex]);
      });
  };

  const getRandomIndex = (index: number) => {
    return Math.floor(Math.random() * index);
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
    getAds();
  }, []);

  return (
    <Layout className="layout">
      <HeaderLayout />
      <InfiniteScroll
        dataLength={itemsStore.items.length} //This is important field to render the next data
        next={() => {
          getData();
          getAds();
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
        <ContentLayout
          isLoading={isLoading}
          itemsStore={itemsStore}
          adsTitle={currentAd.title}
          adsDescription={currentAd.description}
        />
      </InfiniteScroll>
      <br />
      {!hasMore ? (
        <div style={{ textAlign: "center" }}>~ end of catalogue ~</div>
      ) : (
        ""
      )}
      <FooterLayout />
    </Layout>
  );
}

export default App;
