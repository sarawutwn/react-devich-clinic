import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_DETAIL } from "../../endpoint";
import { Container, Stack } from "@mui/material";
import { Button, Card, Tag, Typography } from "antd";
import dayjs from "dayjs";
import ConfirmModal from "../../components/transaction/confirm-modal";

const Detail = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<any>(null);
  const [openConfirm, setOpenComfirm] = useState(false);
  const [confirmTramsaction, setConfirmTransaction] = useState({
    type: "",
    transaction_id: "",
  });

  const handleOptionTransaction = async (
    type: string,
    transaction_id: string
  ) => {
    setConfirmTransaction({ type, transaction_id });
    setOpenComfirm(true);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(GET_DETAIL + `${param.transaction_id}`);
      if (data.status === "success") {
        setDetail(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container maxWidth="sm">
        <Stack direction="column" sx={{ mt: 1, mb: 5 }}>
          <Stack direction="row" justifyContent="start">
            <Typography.Text style={{ fontSize: "20px" }}>
              รายละเอียดรายการ
            </Typography.Text>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Stack direction="column">
              <Typography.Text style={{ fontSize: "12px", color: "#888" }}>
                รหัสรายการ
              </Typography.Text>
              <Typography.Text>
                {detail !== null && detail.payments.payment_reference_no}
              </Typography.Text>
            </Stack>
            <Stack direction="column">
              {detail !== null && (
                <Tag
                  style={{
                    padding: "5px",
                    marginRight: "-3px",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                  color={
                    detail.status === "PENDING"
                      ? "orange"
                      : detail.status === "WAIT_PAYMENT"
                      ? "orange"
                      : detail.status === "SUCCESS"
                      ? "green"
                      : detail.status === "SUCCESS-AI"
                      ? "green"
                      : "red"
                  }
                >
                  {detail.status === "PENDING"
                    ? "รอยืนยัน"
                    : detail.status === "WAIT_PAYMENT"
                    ? "รอจ่ายเงิน"
                    : detail.status === "SUCCESS"
                    ? "สำเร็จ"
                    : detail.status === "SUCCESS-AI"
                    ? "เล่นโดย AI"
                    : detail.status === "CANCEL-AI"
                    ? "ยกเลิกโดย AI"
                    : "ยกเลิก"}
                </Tag>
              )}
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Stack direction="column">
              <Typography.Text style={{ fontSize: "12px", color: "#888" }}>
                เวลาที่สร้างรายการ
              </Typography.Text>
              <Typography.Text>
                {detail !== null &&
                  dayjs(detail.created_at).format("DD/MM/YYYY HH:mm")}
              </Typography.Text>
            </Stack>
            <Stack direction="column" justifyContent="end" alignItems="end">
              <Typography.Text style={{ fontSize: "12px", color: "#888" }}>
                ดำเนินการล่าสุด
              </Typography.Text>
              <Typography.Text>
                {detail !== null &&
                  dayjs(detail.updated_at).format("DD/MM/YYYY HH:mm")}
              </Typography.Text>
            </Stack>
          </Stack>
          <Card>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Stack direction="column" sx={{ ml: -1 }}>
                <Typography.Text style={{ fontSize: "12px", color: "#888" }}>
                  ผู้ส่ง
                </Typography.Text>
                <Stack direction="row" sx={{ ml: -0.5 }}>
                  {detail !== null && (
                    <img
                      src={`/images/sender-type/${detail.transaction_sender_type}.svg`}
                      width={25}
                    />
                  )}
                  <Typography.Text style={{ marginTop: "3px" }}>
                    {detail !== null && detail.transaction_sender_name}
                  </Typography.Text>
                </Stack>
              </Stack>
              <Stack direction="column" justifyContent="end" alignItems="end">
                <Typography.Text style={{ fontSize: "12px", color: "#888" }}>
                  จำนวนเงิน
                </Typography.Text>
                <Typography.Text>
                  {detail !== null && detail.payments.payment_amount} BAHT
                </Typography.Text>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Stack direction="column" sx={{ ml: -1 }}>
                <Typography.Text style={{ fontSize: "12px", color: "#888" }}>
                  ข้อความ
                </Typography.Text>
                <Stack direction="row">
                  <Typography.Text>
                    {detail !== null && detail.transaction_text}
                  </Typography.Text>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Stack direction="column" sx={{ ml: -1, width: "100%" }}>
                <Typography.Text style={{ fontSize: "12px", color: "#888" }}>
                  {detail !== null && detail.transaction_type === "image"
                    ? "รูปภาพ"
                    : "วิดีโอ"}
                </Typography.Text>
                <Stack direction="row" justifyContent="center">
                  {detail !== null && detail.transaction_type === "image"
                    ? detail !== null && (
                        <img
                          src={detail.url}
                          width={`100%`}
                          style={{ borderRadius: "10px" }}
                        />
                      )
                    : detail !== null && (
                        <video
                          src={detail.url}
                          style={{ display: "block", margin: "0 auto" }}
                          width={"100%"}
                          autoPlay
                          loop
                          muted
                        />
                      )}
                </Stack>
              </Stack>
            </Stack>
            {detail !== null && (
              <>
                {detail.status === "SUCCESS" ||
                detail.status === "SUCCESS-AI" ? (
                  <Button
                    onClick={() =>
                      handleOptionTransaction("PLAY", detail.transaction_id)
                    }
                    type="primary"
                    size="large"
                    style={{ width: "100%", background: "#666CFF", }}
                  >
                    เล่นซ้ำ
                  </Button>
                ) : null}
                {detail.status === "PENDING" ||
                detail.status === "CANCEL-AI" ? (
                  <>
                    <Button
                      onClick={() =>
                        handleOptionTransaction("APPROVE", detail.transaction_id)
                      }
                      type="primary"
                      className="btn-success"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      อนุมัติ
                    </Button>
                    <Button
                      onClick={() =>
                        handleOptionTransaction("CANCEL", detail.transaction_id)
                      }
                      type="primary"
                      className="btn-danger"
                      size="large"
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      ปฏิเสธ
                    </Button>
                  </>
                ) : null}
              </>
            )}
            <Button
              size="large"
              style={{ width: "100%", marginTop: "10px" }}
              onClick={() => navigate(`/dashboard`)}
            >
              ไปที่ dashboard
            </Button>
          </Card>
        </Stack>
      </Container>
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

export default Detail;
