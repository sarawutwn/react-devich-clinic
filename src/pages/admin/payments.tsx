import { Stack } from "@mui/material";
import Warper from "../../utils/warpper-page";
import { Select, Table, Tag, Typography } from "antd";
import dayjs from "dayjs";

const AdminPayments = () => {
  return (
    <Warper pointer={["หน้าหลัก", "รายการจ่ายเงิน"]}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-between" },
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: { xs: "center", md: "start" },
            marginTop: "-10px",
            mb: { xs: 1, md: 0 },
          }}
        >
          <img src="/images/free-tax.png" width={70} height={70} />
          <Stack direction="column" sx={{ marginTop: "-16px" }}>
            <Typography.Title
              style={{ marginBottom: "0", marginLeft: "12px" }}
              level={2}
            >
              รายการจ่ายเงิน
            </Typography.Title>
            <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
              รายการที่ต้องจ่ายให้ร้านค้าในแต่ละเดือน
            </Typography.Text>
          </Stack>
        </Stack>
        <Stack sx={{ mt: 1, width: { xs: "100%", md: "200px" } }}>
          <Select
            size="large"
            style={{ width: "100%", height: "40px" }}
            defaultValue="ALL"
            options={[
              {
                label: "ทั้งหมด",
                value: "ALL",
              },
              {
                label: "รอชำระเงิน",
                value: "WAIT_PATMENT",
              },
              {
                label: "ชำระเงินสำเร็จ",
                value: "SUCCESS",
              },
            ]}
          />
        </Stack>
      </Stack>
      <Table
        scroll={{ x: true }}
        style={{ marginTop: "10px" }}
        columns={[
          {
            title: "รอบการจ่าย",
            dataIndex: "prefix_receipt_name",
            key: "prefix_receipt_name",
          },
          {
            title: "สถานะ",
            dataIndex: "status",
            key: "status",
            render: (value, record: any) => {
              return (
                <Stack direction="column">
                  <Stack direction="row" justifyContent="center">
                    <Tag color={value === "WAIT_PAYMENT" ? "orange" : "green"}>
                      {value === "WAIT_PAYMENT"
                        ? "รอชำระเงิน"
                        : "ชำระเงินสำเร็จ"}
                    </Tag>
                  </Stack>
                  <Stack direction="row" justifyContent="center">
                    <Typography.Text
                      style={{
                        fontSize: "12px",
                        color: "rgba(76, 78, 100, 0.6)",
                      }}
                    >
                      {dayjs(record.updated_at).format("DD/MM/YYYY HH:mm")}
                    </Typography.Text>
                  </Stack>
                </Stack>
              );
            },
          },
          {
            title: "ร้าน",
            dataIndex: "prefix",
            key: "prefix",
            render: (value) => value.prefix_name,
          },
        ]}
      />
    </Warper>
  );
};

export default AdminPayments;
