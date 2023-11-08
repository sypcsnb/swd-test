import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LayoutAndStyle.scss";
import { Col, Row, Flex, Typography, Select } from "antd";

const LayoutAndStyle = () => {
  const { t, i18n } = useTranslation();
  const [shapesArr, setShapesArr] = useState([1, 2, 3, 4, 5, 6]);
  const [movePosition, setMovePosition] = useState(false);

  const handleLeft = () => {
    const shiftedArray = [...shapesArr];
    const firstElement: number = shiftedArray.shift()!;
    shiftedArray.push(firstElement);
    setShapesArr(shiftedArray);
  };

  const handleRight = () => {
    const shiftedArray = [...shapesArr];
    const lastElement: number = shiftedArray.pop()!;
    shiftedArray.unshift(lastElement);
    setShapesArr(shiftedArray);
  };

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleShuffle = () => {
    const shuffledArray = [...shapesArr];
    shuffleArray(shuffledArray);
    setShapesArr(shuffledArray);
  };

  const changeLanguageHandler = (lang: any) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="container">
      <Flex justify="space-between">
        <Typography.Title level={2}>{t("Layout & Style")}</Typography.Title>
        <Select
          defaultValue="en"
          style={{ width: 120 }}
          // onChange={changeLanguageHandler}
          options={[
            { value: "en", label: "EN" },
            { value: "th", label: "TH" },
          ]}
        />
      </Flex>

      <Flex vertical gap="large" style={{ marginTop: "32px" }}>
        <Row gutter={16} justify="center">
          <Col span={5}>
            <div className="shape-container" onClick={handleLeft}>
              <div className="left-arrow" />
            </div>
          </Col>
          <Col span={10}>
            <div
              className="shape-container"
              onClick={() => setMovePosition(!movePosition)}
            >
              <Flex justify="center" align="center" style={{ width: "100%" }}>
                <div className="top-arrow" />
              </Flex>
              <Flex justify="center" align="center" style={{ width: "100%" }}>
                <div className="down-arrow" />
              </Flex>
            </div>
          </Col>
          <Col span={5}>
            <div className="shape-container" onClick={handleRight}>
              <div className="right-arrow" />
            </div>
          </Col>
        </Row>

        <Flex vertical gap="middle">
          <Row gutter={16} justify="center">
            <Col span={5} offset={movePosition ? 2.5 : 5}>
              <div className="shape-container" onClick={handleShuffle}>
                <div className={`shape-${shapesArr[0]}`} />
              </div>
            </Col>
            <Col span={5}>
              <div className="shape-container" onClick={handleShuffle}>
                <div className={`shape-${shapesArr[1]}`} />
              </div>
            </Col>
            <Col span={5}>
              <div className="shape-container" onClick={handleShuffle}>
                <div className={`shape-${shapesArr[2]}`} />
              </div>
            </Col>
          </Row>
          <Row gutter={16} justify="center">
            <Col span={5} offset={movePosition ? 5 : 2.5}>
              <div className="shape-container" onClick={handleShuffle}>
                <div className={`shape-${shapesArr[3]}`} />
              </div>
            </Col>
            <Col span={5}>
              <div className="shape-container" onClick={handleShuffle}>
                <div className={`shape-${shapesArr[4]}`} />
              </div>
            </Col>
            <Col span={5}>
              <div className="shape-container" onClick={handleShuffle}>
                <div className={`shape-${shapesArr[5]}`} />
              </div>
            </Col>
          </Row>
        </Flex>
      </Flex>
    </div>
  );
};

export default LayoutAndStyle;
