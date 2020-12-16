import React, { FC, useEffect, useState } from "react";
import { Skeleton, Card, InputNumber, Button, Alert } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./card.scss";

const { Meta } = Card;

type CardContentType = {
  itemId: number;
  Loading: boolean;
  Title: string;
  Description: string;
  Price: number;
  isAddedToCart: boolean;
  addToCart: (id: number) => void;
};

const Cards: FC<CardContentType> = ({
  Loading,
  Title,
  Description,
  Price,
  itemId,
  addToCart,
  isAddedToCart,
}) => {
  const [fontSize, setFontSize] = useState(14);
  const onChange = (value: any) => {
    if (value > 95 || value < 8) {
      setFontSize(14);
    } else {
      setFontSize(parseInt(value));
    }
  };
  return (
    <Card
      hoverable
      className="card-style"
      actions={[
        <div>
          <InputNumber
            min={8}
            max={95}
            defaultValue={fontSize}
            onChange={onChange}
          />{" "}
          px
        </div>,
        <Button
          disabled={isAddedToCart ? true : false}
          type="primary"
          onClick={() => addToCart(itemId)}
        >
          {isAddedToCart ? (
            "Added to Cart"
          ) : Loading ? (
            <>
              <ShoppingCartOutlined /> 0
            </>
          ) : (
            <>
              <ShoppingCartOutlined /> ${Price.toFixed(2)}
            </>
          )}
        </Button>,
      ]}
    >
      <Skeleton loading={Loading} active>
        <Meta
          title={Title}
          description={<p style={{ fontSize: fontSize }}>{Description}</p>}
        />
      </Skeleton>
    </Card>
  );
};

export default Cards;
