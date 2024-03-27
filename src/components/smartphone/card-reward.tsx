import { Button, Col, Empty, Row, Typography } from "antd";

const campaign = [
  {
    image: "/images/theme/861ce023c69643308f64190fd75fab0b.jpg",
    name: "แลกครัวซอง",
    date: "31 ธันวาคม 2023",
    price: 200,
  },
  {
    image: "/images/theme/salad.webp",
    name: "แลกสลัดฟรี",
    date: "31 ธันวาคม 2023",
    price: 400,
  },
];

type Props = {
  color: string
}

const CardReward = ({ color }: Props) => {
  return (
    <Row gutter={[10, 5]} style={{ marginTop: "5px" }}>
      {campaign.length !== 0 ? (
        campaign.map((items) => {
          return (
            <Col span={12}>
              <div className="theme-smartphone-reward" key={items.name}>
                <Row gutter={[0, 0]} style={{ margin: 0 }}>
                  <Col span={24}>
                    <Row justify="center">
                      <img
                        src={items.image}
                        width={"100px"}
                        height={"100px"}
                        style={{ borderRadius: "15px" }}
                      />
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row justify="center">
                      <Typography.Text style={{ fontSize: "12px" }}>
                        {items.name}
                      </Typography.Text>
                    </Row>
                    <Row justify="center">
                      <Typography.Text
                        style={{
                          fontSize: "5px",
                          color: "#AAAAAA",
                        }}
                      >
                        ถึงวันที่ {items.date}
                      </Typography.Text>
                    </Row>
                  </Col>
                  <Button
                    style={{ width: "100%", borderRadius: "20px", fontSize: "12px", background: color }}
                    size="small"
                    type="primary"
                  >
                    ใช้ {items.price} คะแนน
                  </Button>
                </Row>
              </div>
            </Col>
          );
        })
      ) : (
        <Empty />
      )}
    </Row>
  );
};

export default CardReward;
