import React, { FC } from "react";
import { Layout, Row, Switch } from "antd";
import Cards from "./card/card";
import "./content.scss";
import { ItemsStore } from "../../stores/items_store";
import { observer } from "mobx-react";
import moment from "moment";

const { Content } = Layout;

interface itemsStoreType {
  itemsStore: ItemsStore;
  isLoading: boolean;
}

const getRelativeTime = (date: Date) => {
  let dateAdded = moment(date, "YYYY-MM-DD hh:mm:ss");
  let dateToday = moment(new Date(), "YYYY-MM-DD hh:mm:ss");
  let dateDiff = dateToday.diff(dateAdded, "days");
  if (dateDiff >= 7) {
    return date;
  } else {
    let relativeDate = moment(date, "YYYYMMDDhhmmss").fromNow();
    return relativeDate;
  }
};

const ContentLayout: FC<itemsStoreType> = observer(
  ({ itemsStore, isLoading }) => {
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
                Loading={isLoading}
                Price={item.price}
                addToCart={() => {
                  itemsStore.addToCart(item.id);
                }}
                isAddedToCart={item.isAdded}
                dateAdded={getRelativeTime(item.dateAdded).toString()}
              />
            );
          })}
        </Row>
      </Content>
    );
  }
);

export default ContentLayout;
