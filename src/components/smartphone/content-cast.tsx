import { Button, Card, Col, Input, Row, Space, Typography } from "antd";
import CardLayout from "./card-layout";

type Props = {
    background: string;
    textColor: string;
    color: string;
    colorBtn: string;
    cardColor: string;
    elementColor: string;
}

const ContentCastCard = ({elementColor, background, textColor, color, colorBtn, cardColor}: Props) => {
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
                flexDirection: "row",
                justifyContent: "center",
                borderRadius: "3px",
              }}
            >
              <Typography.Text style={{ fontSize: "16px", color: textColor }}>
                ส่งรูปขึ้นจอ
              </Typography.Text>
            </Space>
            <Row justify={"space-between"}>
              <Typography.Text style={{ color: textColor }}>
                เลือกรูปภาพ
              </Typography.Text>
              <Button
                size="small"
                style={{
                  background: color,
                  color: colorBtn,
                  border: 0,
                  borderRadius: "10px",
                  fontSize: "11px",
                }}
              >
                ข้อแนะนำ
              </Button>
            </Row>
            <Card
              style={{
                marginTop: "5px",
                background: cardColor,
                color: "#FFF",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: "-10px",
                border: 0,
              }}
            >
              <div
                style={{
                  marginLeft: "-10px",
                  marginTop: "-10px",
                  marginBottom: "-10px",
                  width: "114px",
                  height: "114px",
                  background: elementColor,
                  borderRadius: "10px",
                  border: "1px dashed #d9d9d9",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography.Text style={{ color: "#424242", fontSize: "24px" }}>
                  +
                </Typography.Text>
                <Typography.Text style={{ fontSize: "12px" }}>
                  เลือกรูปภาพ
                </Typography.Text>
                <Typography.Text style={{ fontSize: "10px" }}>
                  แนะนำเป็นรูปนาดด้านเท่า
                </Typography.Text>
              </div>
            </Card>
            <Row justify={"start"} style={{ marginTop: "5px" }}>
              <Typography.Text style={{ color: textColor }}>
                แจกวาร์ปของคุณ
              </Typography.Text>
            </Row>
            <Card
              style={{
                marginTop: "5px",
                color: "#FFF",
                background: cardColor,
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                padding: "-10px",
                border: 0,
              }}
            >
              <Row
                gutter={[0, 0]}
                style={{ marginTop: "-10px", marginLeft: "-10px" }}
              >
                <Col xs={6} style={{ cursor: "pointer", borderRadius: "20px" }}>
                  <Row justify={"center"}>
                    <img
                      src="/images/sender-type/instagram.svg"
                      style={{
                        filter: "grayscale(0%)",
                        opacity: "1",
                      }}
                      width={40}
                      height={40}
                    />
                  </Row>
                </Col>

                <Col xs={6} style={{ cursor: "pointer", borderRadius: "20px" }}>
                  <Row justify={"center"}>
                    <img
                      src="/images/sender-type/facebook.svg"
                      style={{
                        filter: "grayscale(100%)",
                        opacity: "0.4",
                      }}
                      width={40}
                      height={40}
                    />
                  </Row>
                </Col>
                <Col xs={6} style={{ cursor: "pointer", borderRadius: "20px" }}>
                  <Row justify={"center"}>
                    <img
                      src="/images/sender-type/tiktok.svg"
                      style={{
                        filter: "grayscale(100%)",
                        opacity: "0.4",
                      }}
                      width={40}
                      height={40}
                    />
                  </Row>
                </Col>
                <Col xs={6} style={{ cursor: "pointer", borderRadius: "20px" }}>
                  <Row justify={"center"}>
                    <img
                      src="/images/sender-type/onlyfans.svg"
                      style={{
                        filter: "grayscale(100%)",
                        opacity: "0.4",
                      }}
                      width={40}
                      height={40}
                    />
                  </Row>
                </Col>
              </Row>
              <Input
                style={{ marginTop: "15px" }}
                placeholder="กรุณากรอกชื่อบัญชี instagram"
              />
            </Card>
            <CardLayout color={color} main={false} />
          </>
        </div>
      </Card>
    </Row>
  );
};

export default ContentCastCard;
