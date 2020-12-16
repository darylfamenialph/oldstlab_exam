import React, { FC } from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterLayout: FC = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      ©2020 Created by Kim Daryl Famenial
    </Footer>
  );
};

export default React.memo(FooterLayout);
