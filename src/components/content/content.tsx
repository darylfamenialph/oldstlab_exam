import React, { FC, useEffect, useState } from "react";
import { Layout, Row, Switch } from "antd";
import Cards from "./card/card";
import "./content.scss";
import { ItemsStore } from "../../stores/items_store";
import { observer } from "mobx-react";

const { Content } = Layout;

interface itemsStoreType {
  itemsStore: ItemsStore;
}

const ContentLayout: FC<itemsStoreType> = observer(({ itemsStore }) => {
  const [loading, setLoading] = useState(true);
  const onChange = () => {
    setLoading(!loading);
  };

  useEffect(() => {
    setTimeout(() => {
      onChange();
    }, 5000);
  }, []);
  return (
    <Content className="content">
      <Row className="Card-content">
        {itemsStore.items.map((item) => {
          return (
            <Cards
              key={item.id}
              itemId={item.id}
              Title={item.title}
              Description={item.description}
              Loading={loading}
              Price={item.price}
              addToCart={() => {
                itemsStore.addToCart(item.id);
              }}
              isAddedToCart={item.isAdded}
            />
          );
        })}
      </Row>
    </Content>
  );
});

export default ContentLayout;
