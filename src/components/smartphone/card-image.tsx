import { Card, Col, Divider, Row, Typography } from "antd";

type Props = {
  store_name: string;
};

const CardImage = ({ store_name }: Props) => {
  return (
    <>
      <Card
        style={{
          boxShadow: "rgba(149, 157, 165, 0.15) 0px 8px 24px",
          padding: 0,
        }}
      >
        <Row gutter={[16, 10]}>
          <Col xs={6}>
            <img
              src="/images/admin.jpg"
              width={40}
              style={{ borderRadius: "50px" }}
            />
          </Col>
          <Col xs={18} style={{ marginLeft: "-5px", marginTop: "-2px" }}>
            <Typography.Text style={{ fontSize: "16px" }}>
              {store_name || "ชื่อร้านค้า"}
            </Typography.Text>
            <br />
            <Typography.Text style={{ fontSize: "12px", color: "#AAAAAA" }}>
              ระบบสะสมคะแนน
            </Typography.Text>
          </Col>
          <Divider style={{ marginTop: 0, marginBottom: 0 }} />
          <Col xs={24} style={{ marginBottom: "-15px" }}>
            <Typography.Text style={{ fontSize: "16px" }}>
              คงเหลือ 100 คะแนน
            </Typography.Text>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CardImage;
