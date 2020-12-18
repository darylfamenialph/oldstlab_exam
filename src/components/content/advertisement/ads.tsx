import React, { FC, useEffect, useState } from "react";
import { Skeleton, Card, InputNumber, Button, Alert } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./ads.scss";

const { Meta } = Card;

type AdsContentType = {
  Title: string;
  Description: string;
};

const Ads: FC<AdsContentType> = ({ Title, Description }) => {
  return (
    <Card hoverable className="card-style">
      <Skeleton loading={false} active>
        <Meta
          title={Title}
          description={
            <div>
              <p style={{ fontSize: 14, color: "#000" }}>{Description}</p>
            </div>
          }
        />
      </Skeleton>
    </Card>
  );
};

export default Ads;
