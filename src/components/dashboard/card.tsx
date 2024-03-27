import { Avatar, Card, Col, Divider, Row, Typography } from "antd";
import {
  BarChartOutlined,
  PieChartOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import "../../animation/wave.css";
import { Grid, Stack } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";

const DashboardCard = ({ data, type }: any) => {
  return (
    data !== null && (
      <Grid
        id="driver-dashboard-total-amount"
        container
        spacing={1.5}
        sx={{ mt: 1 }}
      >
        <Grid item xs={12} sm={12} lg={6}>
          <Card
            style={{
              height: "154px",
              backgroundColor: "#FFF",
              borderRadius: "20px",
              border: 0,
            }}
          >
            <Row justify={"space-between"}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "114px",
                  justifyContent: "space-between",
                }}
              >
                <Typography.Text style={{ fontSize: "20px" }}>
                  รายได้รวม
                </Typography.Text>
                <Col style={{ display: "flex", flexDirection: "column" }}>
                  <Typography.Text
                    style={{ fontSize: "24px", fontWeight: "bold" }}
                  >
                    {parseFloat(data.owner_amount).toFixed(2)}
                  </Typography.Text>
                  <Typography.Text
                    style={{
                      fontSize: "12px",
                      color: "rgba(76, 78, 100, 0.6)",
                    }}
                  >
                    บาท
                  </Typography.Text>
                </Col>
              </div>
              <img
                src="/images/money.png"
                width={60}
                height={60}
                style={{ marginTop: "15px" }}
              />
            </Row>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Card
            style={{
              backgroundColor: "#FFF",
              borderRadius: "20px",
              border: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "3.5px",
              }}
            >
              <Typography.Text style={{ fontSize: "20px" }}>
                ภาพรวมการขาย
              </Typography.Text>
              <Typography.Text
                style={{ fontSize: "12px", color: "rgba(76, 78, 100, 0.6)" }}
              >
                {data.total_count ? data.total_count : 0} รายการ
              </Typography.Text>
              <Row gutter={[16, 10]} style={{ marginTop: "10px" }}>
                <Col md={8}>
                  <Row justify={"start"}>
                    <Avatar
                      style={{
                        background: "rgba(102, 108, 255, 0.12)",
                        color: "rgb(102, 108, 255)",
                      }}
                      shape="square"
                      size="large"
                      icon={<PieChartOutlined />}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "5px",
                      }}
                    >
                      <Typography.Text style={{ fontSize: "14px" }}>
                        {data.average_amount
                          ? parseFloat(data.average_amount).toFixed(2)
                          : 0.0}
                      </Typography.Text>
                      <Typography.Text
                        style={{
                          fontSize: "12px",
                          color: "rgba(76, 78, 100, 0.6)",
                        }}
                      >
                        ยอดขายเฉลี่ย
                      </Typography.Text>
                    </div>
                  </Row>
                </Col>
                <Col md={8}>
                  <Row justify={"start"}>
                    <Avatar
                      style={{
                        background: "rgba(253, 181, 40, 0.12)",
                        color: "rgb(253, 181, 40)",
                      }}
                      shape="square"
                      size="large"
                      icon={<BarChartOutlined />}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "5px",
                      }}
                    >
                      <Typography.Text style={{ fontSize: "14px" }}>
                        {parseFloat(data.lower_amount).toFixed(2)}
                      </Typography.Text>
                      <Typography.Text
                        style={{
                          fontSize: "12px",
                          color: "rgba(76, 78, 100, 0.6)",
                        }}
                      >
                        ยอดขายขั้นต่ำ
                      </Typography.Text>
                    </div>
                  </Row>
                </Col>
                <Col md={8}>
                  <Row justify={"start"}>
                    <Avatar
                      style={{
                        color: "rgb(34, 137, 171)",
                        background: "rgba(34, 137, 171, 0.12)",
                      }}
                      shape="square"
                      size="large"
                      icon={<RiseOutlined />}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "5px",
                      }}
                    >
                      <Typography.Text style={{ fontSize: "14px" }}>
                        {parseFloat(data.highest_amount).toFixed(2)}
                      </Typography.Text>
                      <Typography.Text
                        style={{
                          fontSize: "12px",
                          color: "rgba(76, 78, 100, 0.6)",
                        }}
                      >
                        ยอดขายสูงสุด
                      </Typography.Text>
                    </div>
                  </Row>
                </Col>
              </Row>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Card
            style={{
              height: "450px",
              backgroundColor: "#FFF",
              borderRadius: "20px",
              border: 0,
              // boxShadow: "rgba(76, 78, 100, 0.22) 0px 2px 10px 0px",
            }}
          >
            <Stack direction="column">
              <Typography.Text style={{ fontSize: "20px" }}>
                รายได้ตามประเภทการขาย
              </Typography.Text>
              <Divider style={{ marginTop: "15px" }}>จำนวนรายได้</Divider>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ p: 3, mt: -4 }}
              >
                <Typography.Text
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(76, 78, 100, 0.6)",
                  }}
                >
                  รายได้รูปภาพ
                </Typography.Text>
                <Typography.Text
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "rgba(76, 78, 100, 0.87)",
                  }}
                >
                  {parseFloat(data.image_amount).toFixed(2)}
                </Typography.Text>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ p: 3, mt: -5 }}
              >
                <Typography.Text
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(76, 78, 100, 0.6)",
                  }}
                >
                  รายได้วิดีโอ
                </Typography.Text>
                <Typography.Text
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "rgba(76, 78, 100, 0.87)",
                  }}
                >
                  {parseFloat(data.video_amount).toFixed(2)}
                </Typography.Text>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ p: 3, mt: -5, mb: 2 }}
              >
                <Typography.Text
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(76, 78, 100, 0.6)",
                  }}
                >
                  รายได้ทั้งหมด
                </Typography.Text>
                <Typography.Text
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "rgba(76, 78, 100, 0.87)",
                  }}
                >
                  {parseFloat(data.total_amount).toFixed(2)}
                </Typography.Text>
              </Stack>
              <Divider style={{ marginTop: "-30px" }}>
                จำนวน transaction
              </Divider>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ p: 3, mt: -4 }}
              >
                <Typography.Text
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(76, 78, 100, 0.6)",
                  }}
                >
                  จำนวนรายการทั้งหมด
                </Typography.Text>
                <Typography.Text
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "rgba(76, 78, 100, 0.87)",
                  }}
                >
                  {data.total_count}
                </Typography.Text>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ p: 3, mt: -5 }}
              >
                <Typography.Text
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(76, 78, 100, 0.6)",
                  }}
                >
                  รายการรูปภาพ
                </Typography.Text>
                <Typography.Text
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "rgba(76, 78, 100, 0.87)",
                  }}
                >
                  {data.image_count}
                </Typography.Text>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ p: 3, mt: -5 }}
              >
                <Typography.Text
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(76, 78, 100, 0.6)",
                  }}
                >
                  รายการวิดีโอ
                </Typography.Text>
                <Typography.Text
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "rgba(76, 78, 100, 0.87)",
                  }}
                >
                  {data.video_count}
                </Typography.Text>
              </Stack>
              <Divider style={{ marginTop: "-30px" }}>
                รายการที่ใช้บริการเพิ่ม
              </Divider>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ p: 3, mt: -4 }}
              >
                <Typography.Text
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(76, 78, 100, 0.6)",
                  }}
                >
                  จำนวนรายการที่ใช้ AI
                </Typography.Text>
                <Typography.Text
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "rgba(76, 78, 100, 0.87)",
                  }}
                >
                  {data.ai_count}
                </Typography.Text>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ p: 3, mt: -5 }}
              >
                <Typography.Text
                  style={{
                    fontSize: "0.875rem",
                    color: "rgba(76, 78, 100, 0.6)",
                  }}
                >
                  คิดเป็นเงิน
                </Typography.Text>
                <Typography.Text
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "rgba(76, 78, 100, 0.87)",
                  }}
                >
                  {parseFloat(data.ai_amount).toFixed(2)} 
                </Typography.Text>
              </Stack>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <Card
            style={{
              height: "450px",
              backgroundColor: "#FFF",
              borderRadius: "20px",
              border: 0,
            }}
          >
            <Stack direction="column">
              <Typography.Text style={{ fontSize: "20px" }}>
                สถิติยอดขาย
              </Typography.Text>
              <div>
                <ReactApexChart
                  options={{
                    dataLabels: {
                      enabled: false,
                    },
                    chart: {
                      toolbar: {
                        show: false,
                      },

                      type: "area",
                      fontFamily:
                        "'IBM Plex Sans Thai', Helvetica, Arial, sans-serif",
                    },
                    stroke: {
                      show: true,
                      curve: "smooth",
                      lineCap: "butt",
                      colors: undefined,
                      width: 1,
                      dashArray: 0,
                    },
                    plotOptions: {
                      bar: {
                        horizontal: false,
                        borderRadius: 3,
                      },
                      area: {},
                    },
                    xaxis: {
                      categories: data.graph.label.map((item: any) => {
                        return type === "today"
                          ? dayjs(item.label).format("HH:mm น.")
                          : type === "custom-year"
                          ? dayjs(item.label).format("MMM")
                          : dayjs(item.label).format("DD-MMM");
                      }),
                    },
                  }}
                  series={[
                    {
                      color: "#ff725c",
                      name: "ยอดขาย",
                      data: data.graph.label.map((item: any) => item.count),
                    },
                  ]}
                  type="area"
                  height={390}
                />
              </div>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    )
  );
};

export default DashboardCard;
