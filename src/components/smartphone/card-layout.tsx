import { Col, Row, Typography } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { FiInbox } from "react-icons/fi";

type Props = {
  color: string;
  main: boolean;
};

const CardLayout = ({ color, main }: Props) => {
  return (
    <Row justify="center">
      <div
        style={{
          marginTop: "70px",
          height: "65px",
          width: "100%",
          borderRadius: "35px 35px 0px 0px",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Row gutter={[0, 0]} style={{ marginTop: "10px" }}>
          <Col xs={12} style={{ cursor: "pointer", borderRadius: "20px" }}>
            <Row justify="center">
              <HomeFilled
                style={{
                  marginBottom: "3px",
                  fontSize: "20px",
                  marginTop: "5px",
                  color: main ? color : "#AAAAAA",
                }}
              />
            </Row>
            <Typography
              style={{
                textAlign: "center",
                color: main ? color : "#AAAAAA",
                fontSize: "11px",
              }}
            >
              หน้าหลัก
            </Typography>
          </Col>
          <Col xs={12} style={{ cursor: "pointer", borderRadius: "20px" }}>
            <Row justify="center">
              <FiInbox
                style={{
                  fontSize: "22px",
                  marginTop: "5px",
                  color: !main ? color : "#AAAAAA",
                }}
              />
            </Row>
            <Typography
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: !main ? color : "#AAAAAA",
              }}
            >
              ส่งรูปขึ้นจอ
            </Typography>
          </Col>
        </Row>
      </div>
    </Row>
  );
};

export default CardLayout;
