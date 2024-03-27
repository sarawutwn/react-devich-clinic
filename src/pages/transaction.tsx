import {
  Button,
  Col,
  DatePicker,
  Pagination,
  Row,
  Select,
  Switch,
  Table,
  Tag,
  Typography,
} from "antd";
import Warper from "../utils/warpper-page";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_AI_DETAIL, GET_TRANSACTION, UPDATE_AI_DETAIL } from "../endpoint";
import { Stack } from "@mui/material";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  PlayCircleFilled,
  SettingOutlined,
} from "@ant-design/icons";
import AiConfigModal from "../components/transaction/ai-config-modal";
import ConfirmModal from "../components/transaction/confirm-modal";

dayjs.extend(weekday);
dayjs.extend(localeData);

const dateFormat = "DD/MM/YYYY";

const Transaction = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("ALL");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [order, setOrder] = useState("DESC");
  // const [pageTotal, setPageTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [aiDetail, setAiDetail] = useState({
    prefix_ai_amount: 0,
    prefix_ai_rate: 0,
    prefix_ai_transaction: false,
  });
  const [aiRateCache, setAiRateCache] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [openConfirm, setOpenComfirm] = useState(false);
  const [confirmTramsaction, setConfirmTransaction] = useState({
    type: "",
    transaction_id: "",
  });

  const switchAiDetail = async (checked: boolean) => {
    setAiDetail({ ...aiDetail, prefix_ai_transaction: checked });
    try {
      await axios.put(UPDATE_AI_DETAIL, {
        ...aiDetail,
        prefix_ai_transaction: checked,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptionTransaction = async (
    type: string,
    transaction_id: string
  ) => {
    setConfirmTransaction({ type, transaction_id });
    setOpenComfirm(true);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.post(GET_TRANSACTION, {
        type: status,
        start_date: dayjs(startDate).toDate(),
        end_date: dayjs(endDate).toDate(),
        order_by: order,
        page,
      });
      setData(data.result);
      setCount(data.count);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [status, startDate, endDate, order, page]);

  useEffect(() => {
    const fetchAiSetting = async () => {
      try {
        const { data } = await axios.get(GET_AI_DETAIL);
        if (data.status === "success") {
          setAiDetail(data.result);
          setAiRateCache(data.result.prefix_ai_rate);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAiSetting();
  }, []);

  return (
    <>
      <Warper pointer={["หน้าหลัก", "รายการ"]}>
        <Row justify={"space-between"}>
          <Col xs={24} lg={11}>
            <Col style={{ marginTop: "-24px" }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: { xs: "center", md: "start" },
                  width: { md: "auto", xs: "100%" },
                }}
              >
                <Typography.Title
                  style={{ marginBottom: "0", fontSize: "24px" }}
                  level={2}
                >
                  รายการ
                </Typography.Title>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  justifyContent: { xs: "center", md: "start" },
                  width: { md: "auto", xs: "100%" },
                }}
              >
                <Switch
                  checked={aiDetail.prefix_ai_transaction}
                  onChange={(checked) => switchAiDetail(checked)}
                />
                <Typography.Text
                  style={{
                    marginTop: 2,
                    marginLeft: 10,
                    color: "rgba(76, 78, 100, 0.6)",
                  }}
                >
                  ใช้งาน AI อนุมัติรายการ
                </Typography.Text>
                <SettingOutlined
                  style={{
                    fontSize: "25px",
                    marginLeft: "5px",
                    color: "rgba(76, 78, 100, 0.6)",
                    cursor: "pointer",
                  }}
                  onClick={() => setAiOpen(true)}
                />
              </Stack>
              <Stack
                direction="row"
                sx={{
                  justifyContent: { xs: "center", md: "start" },
                  textAlign: { xs: "center", md: "start" },
                  width: { md: "auto", xs: "100%" },
                }}
              >
                <Typography.Text
                  style={{
                    color: "rgba(76, 78, 100, 0.6)",
                    fontSize: "12px",
                  }}
                >
                  {aiDetail.prefix_ai_amount === 0 ? (
                    "ไม่มีค่าบริการในการใช้ AI "
                  ) : (
                    <>
                      ค่าบริการ
                      <span
                        style={{ color: "black" }}
                      >{` ${aiDetail.prefix_ai_amount} บาท / รายการ `}</span>
                    </>
                  )}
                  สามารถใช้เป็นตัวช่วยในการอนุมัติรูปภาพและวีดีโอได้
                </Typography.Text>
              </Stack>
            </Col>
          </Col>
          <Col xs={24} lg={13}>
            <Row gutter={[16, 10]}>
              <Col xs={24} lg={6}>
                <Typography.Text>สถานะ</Typography.Text>
                <Select
                  size="large"
                  value={status}
                  onChange={(value) => setStatus(value)}
                  style={{ width: "100%" }}
                  options={[
                    { value: "ALL", label: "ทั้งหมด" },
                    { value: "PENDING", label: "รออนุมัติ" },
                    { value: "SUCCESS", label: "เล่นแล้ว" },
                    { value: "SUCCESS-AI", label: "เล่นแล้ว (AI)" },
                    { value: "CANCEL-AI", label: "ยกเลิกโดย (AI)" },
                    { value: "CANCEL", label: "ยกเลิกแล้ว" },
                  ]}
                />
              </Col>
              <Col xs={24} lg={10}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography.Text>ช่วงเวลา</Typography.Text>
                  <DatePicker.RangePicker
                    size="large"
                    onChange={(value: any) => {
                      setStartDate(dayjs(value[0].$d));
                      setEndDate(dayjs(value[1].$d));
                    }}
                    value={[startDate, endDate]}
                    format={dateFormat}
                  />
                </div>
              </Col>
              <Col xs={24} lg={8}>
                <Typography.Text>เรียงตาม</Typography.Text>
                <Select
                  size="large"
                  value={order}
                  onChange={(value) => setOrder(value)}
                  style={{ width: "100%" }}
                  defaultValue={"ASC"}
                  options={[
                    { value: "DESC", label: "ล่าสุด" },
                    { value: "ASC", label: "เก่าสุด" },
                  ]}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Table
          dataSource={data}
          pagination={false}
          scroll={{ x: true }}
          style={{ marginTop: "10px" }}
          columns={[
            {
              title: "รายการ",
              dataIndex: "transaction_id",
              key: "transaction_id",
              render: (_, record: any) => (
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "130px",
                  }}
                >
                  <Typography.Text
                    style={{ fontSize: "14px", color: "#4C4E64DE" }}
                  >
                    {record.payments.payment_reference_no}
                  </Typography.Text>
                  <Typography.Text
                    style={{ fontSize: "12px", color: "#4C4E6499" }}
                  >{`${record.transaction_amount} BAHT`}</Typography.Text>
                </Col>
              ),
            },
            {
              title: "ผู้ส่ง",
              dataIndex: "transaction_id",
              key: "transaction_id",
              render: (_, record: any) => (
                <Row style={{ width: "150px" }}>
                  <img
                    src={`/images/sender-type/${record.transaction_sender_type}.svg`}
                    width={32}
                    height={32}
                  />
                  <Typography.Text
                    style={{
                      fontSize: "14px",
                      color: "#4C4E6499",
                      marginTop: "5px",
                    }}
                  >
                    {record.transaction_sender_name}
                  </Typography.Text>
                </Row>
              ),
            },
            {
              title: "ข้อมูล",
              dataIndex: "transaction_id",
              key: "transaction_id",
              align: "left" as const,
              render: (_, record: any) => (
                <Row
                  style={{
                    width: "400px",
                  }}
                >
                  {record.transaction_type === "image" ? (
                    <img
                      src={`${record.url}`}
                      width={80}
                      style={{ minHeight: "80px", borderRadius: "3px" }}
                    />
                  ) : (
                    <video
                      src={`${record.url}`}
                      loop
                      autoPlay
                      muted
                      width={80}
                      style={{ minHeight: "80px", borderRadius: "3px" }}
                    />
                  )}

                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text
                      style={{
                        fontSize: "14px",
                        color: "#4C4E6499",
                        textAlign: "center",
                      }}
                    >
                      {record.transaction_text}
                    </Typography.Text>
                  </Col>
                </Row>
              ),
            },
            {
              title: "สถานะ",
              dataIndex: "transaction_id",
              key: "transaction_id",
              render: (_, record) => {
                let color = "green";
                let text = "สำเร็จ";
                if (record.status === "WAIT_PAYMENT") {
                  color = "orange";
                  text = "รอชำระเงิน";
                }
                if (record.status === "PENDING") {
                  color = "orange";
                  text = "รอยืนยัน";
                }
                if (record.status === "SUCCESS-AI") {
                  color = "green";
                  text = "สำเร็จ (AI)";
                }
                if (record.status === "CANCEL-AI") {
                  color = "red";
                  text = "บล็อคโดย AI";
                }
                if (record.status === "CANCEL") {
                  color = "red";
                  text = "ยกเลิกแล้ว";
                }
                return (
                  <div
                    key={`status-${record.transaction_id}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Row justify={"center"} style={{ marginRight: "-10px" }}>
                      <Tag color={color}>{text}</Tag>
                    </Row>
                    <Row justify={"center"}>
                      <Typography.Text
                        style={{ fontSize: "12px", color: "#4C4E6499" }}
                      >
                        {record.date}
                      </Typography.Text>
                    </Row>
                    <Row justify={"center"}>
                      <Typography.Text
                        style={{ fontSize: "12px", color: "#4C4E6499" }}
                      >
                        {dayjs(record.updated_at).format("DD MMM YYYY HH:mm")}
                      </Typography.Text>
                    </Row>
                  </div>
                );
              },
            },
            {
              title: "สร้างเมื่อ",
              dataIndex: "created_at",
              key: "created_at",
              render: (value) => (
                <Row style={{ width: "200px" }}>
                  <Typography.Text
                    style={{ fontSize: "14px", color: "#4C4E64DE" }}
                  >
                    {dayjs(value).format("DD MMM YYYY HH:mm")}
                  </Typography.Text>
                </Row>
              ),
            },
            {
              title: "",
              dataIndex: "",
              key: "",
              render: (_, record) => {
                return (
                  <Row key={record.transaction_id}>
                    {record.status === "CANCEL-AI" ||
                    record.status === "PENDING" ? (
                      <>
                        <Button
                          type="primary"
                          className="btn-success"
                          style={{
                            width: "100px",
                            marginRight: 5,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                          onClick={() =>
                            handleOptionTransaction(
                              "APPROVE",
                              record.transaction_id
                            )
                          }
                        >
                          <CheckCircleFilled
                            style={{
                              fontSize: "20px",
                              marginRight: -2,
                              marginTop: 1,
                            }}
                          />
                          อนุมัติ
                        </Button>
                        <Button
                          type="primary"
                          className="btn-cancel"
                          style={{
                            width: "100px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                          onClick={() =>
                            handleOptionTransaction(
                              "CANCEL",
                              record.transaction_id
                            )
                          }
                        >
                          <CloseCircleFilled
                            style={{
                              fontSize: "20px",
                              marginRight: -2,
                              marginTop: 1,
                            }}
                          />
                          ปฏิเสธ
                        </Button>
                      </>
                    ) : record.status !== "CANCEL" || record.status !== "WAIT_PAYMENT" ? (
                      <Button
                        type="primary"
                        style={{
                          width: "100px",
                          background: "#666CFF",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                        onClick={() =>
                          handleOptionTransaction("PLAY", record.transaction_id)
                        }
                      >
                        <PlayCircleFilled
                          style={{
                            fontSize: "20px",
                            marginRight: -2,
                            marginTop: 1,
                          }}
                        />
                        เล่นซ้ำ
                      </Button>
                    ) : null}
                  </Row>
                );
              },
            },
          ]}
        />
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Pagination
            size="default"
            onChange={(page, _) => setPage(page)}
            current={page}
            total={count}
            showSizeChanger={false}
          />
        </Stack>
      </Warper>
      <AiConfigModal
        aiConfig={aiDetail}
        setAiConfig={setAiDetail}
        cache={aiRateCache}
        setCache={setAiRateCache}
        open={aiOpen}
        setOpen={setAiOpen}
      />
      <ConfirmModal
        open={openConfirm}
        setOpen={setOpenComfirm}
        callback={fetchData}
        type={confirmTramsaction.type}
        transaction_id={confirmTramsaction.transaction_id}
      />
    </>
  );
};

export default Transaction;
