import React, { FC } from "react";
import { Layout } from "antd";
import HeaderMenu from "./menu/menu";
import "./header.scss";
const { Header } = Layout;

const HeaderLayout: FC = () => {
  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo">Faces Marketplace</div>
    </Header>
  );
};

export default React.memo(HeaderLayout);
