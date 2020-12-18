import React, { FC, useEffect, useState } from "react";
import { Layout, Row } from "antd";
import Cards from "./card/card";
import "./content.scss";
import { ItemsStore } from "../../stores/items_store";
import { observer } from "mobx-react";
import moment from "moment";
import Ads from "./advertisement/ads";

const { Content } = Layout;

interface itemsStoreType {
  itemsStore: ItemsStore;
  isLoading: boolean;
  Advert: AdsItem[];
}
interface AdsItem {
  title: string;
  description: string;
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
  ({ itemsStore, isLoading, Advert }) => {
    let itemCount = 0;

    return (
      <Content className="content">
        <Row className="Card-content">
          {itemsStore.items.map((item) => {
            itemCount++;
            let remainder = itemCount % 20;

            return remainder != 0 ? (
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
            ) : (
              <Ads ads={Advert} />
            );
          })}
        </Row>
      </Content>
    );
  }
);

export default ContentLayout;
