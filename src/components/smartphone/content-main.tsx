import { Button, Card, Row, Space, Typography } from "antd";
import CardLayout from "./card-layout";

type Props = {
  background: string;
  mainHeader: string;
  textColor: string;
  cardColor: string;
  color: string;
};

const ContentMainCard = ({ background, mainHeader, textColor, color, cardColor }: Props) => {
  return (
    <Row justify={"center"}>
      <Card
        style={{
          borderRadius: "36px",
          border: "1px solid #b0afaf",
          width: "310px",
          height: "620px",
          marginTop: "20px",
          marginBottom: "20px",
          background: "#000",
        }}
      >
        <div className="theme-smartphone-ear"></div>
        <div
          className="theme-smartphone-content"
          style={{ backgroundColor: background }}
        >
          <>
            <Space
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "3px",
                width: "100%",
              }}
            >
              <div
                style={{
                  marginTop: "-15px",
                  borderRadius: "3px 3px 0px 0px",
                  width: "285px",
                  height: "170px",
                  background: mainHeader,
                }}
              ></div>
              <img
                width={150}
                style={{ borderRadius: "10px", marginTop: "-240px" }}
                src="data:image/png;base64,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"
              />
              <Typography.Text style={{ color: textColor }}>Fullhouse</Typography.Text>
            </Space>
            <Row
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
              }}
              justify={"start"}
            >
              <Typography.Text style={{ textAlign: "start", color: textColor }}>
                5 โพสล่าสุด
              </Typography.Text>
            </Row>
            <Card
              style={{
                marginTop: "5px",
                background: cardColor,
                color: "#FFF",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: "-10px",
                border: 0,
                marginBottom: "5px",
              }}
              title={
                <Row justify={"space-between"}>
                  <Typography.Text style={{ color: textColor }}>Example</Typography.Text>
                  <Button size="small">ดูโปรไฟล์</Button>
                </Row>
              }
            ></Card>
            <CardLayout color={color} main={true} />
          </>
        </div>
      </Card>
    </Row>
  );
};

export default ContentMainCard;
