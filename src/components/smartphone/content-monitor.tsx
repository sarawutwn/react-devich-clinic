import { Card, Col, Row, Typography } from "antd";

type Props = {
  monitorBg: string;
  background: string;
  monitorTextOne: string;
  monitorTextTwo: string;
  scanBg: string;
  scanText: string;
};

const ContentMonitor = ({
  monitorBg,
  background,
  monitorTextOne,
  monitorTextTwo,
  scanBg,
  scanText,
}: Props) => {
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "600px",
        background: monitorBg === "" ? background : `url('${monitorBg}')`,
        backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
      }}
    >
      <Row justify={"start"}>
        <img
          src="/images/example.png"
          width={100}
          style={{ borderRadius: "10px" }}
        />
        <Col
          style={{
            display: "flex",
            marginLeft: "10px",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography.Text
            style={{
              fontSize: "40px",
              marginTop: "-10px",
              color: monitorTextOne,
            }}
          >
            แจกวาร์ปขึ้นจอ
          </Typography.Text>
          <Typography.Text
            style={{ marginTop: "-30px", color: monitorTextTwo }}
          >
            IG, Facebook, Tiktok, Onlyfans
          </Typography.Text>
          <Typography.Text
            style={{
              width: "90px",
              textAlign: "center",
              border: 0,
              borderRadius: "10px",
              color: scanText,
              background: scanBg,
              animation: "pulsepulse 2s ease-in-out infinite alternate both",
            }}
          >
            SCAN เลย
          </Typography.Text>
        </Col>
      </Row>
    </Card>
  );
};

export default ContentMonitor;
