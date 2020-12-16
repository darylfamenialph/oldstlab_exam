import React, { FC } from "react";
import { Layout } from "antd";
import HeaderMenu from "./menu/menu";
import "./header.scss";
const { Header } = Layout;

const HeaderLayout: FC = () => {
  return (
    <Header>
      <div className="logo">Faces Marketplace</div>
    </Header>
  );
};

export default React.memo(HeaderLayout);
