import React, { FC, useEffect, useState } from "react";
import { Skeleton, Card } from "antd";
import "./ads.scss";

const { Meta } = Card;

type AdsContentType = {
  ads: AdsItem[];
};
interface AdsItem {
  title: string;
  description: string;
}

const Ads: FC<AdsContentType> = ({ ads }) => {
  const [adsIndex, setAdsIndex] = useState(0);

  const getRandomIndex = (index: number) => {
    let randomIndex = Math.floor(Math.random() * index);
    while (adsIndex == randomIndex) {
      randomIndex = Math.floor(Math.random() * index);
    }
    return randomIndex;
  };

  useEffect(() => {
    setAdsIndex(getRandomIndex(ads.length));
  }, []);

  return (
    <Card hoverable className="card-style">
      <Skeleton loading={false} active>
        <Meta
          title={ads[adsIndex].title}
          description={
            <div>
              <p style={{ fontSize: 14, color: "#000" }}>
                {ads[adsIndex].description}
              </p>
            </div>
          }
        />
      </Skeleton>
    </Card>
  );
};

export default Ads;
