import { Stack } from "@mui/material";
import Warper from "../../utils/warpper-page";
import { Button, Input, Table, Tag, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  GET_ALL_PREFIX,
  SUPER_PREFIX_DETAIL,
  SWITCH_PREFIX_STATUS,
} from "../../endpoint";
import CreatePrefixModal from "../../components/admin-prefix/create-prefix-modal";
import UpdatePrefixModal from "../../components/admin-prefix/update-prefix-modal";
import SwitchPrefixModal from "../../components/admin-prefix/switch-prefix-modal";
import { toast } from "react-toastify";
import ProfilePrefixModal from "../../components/admin-prefix/profile-prefix-modal";

const AdminPrefix = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [openSwitch, setOpenSwitch] = useState(false);
  const [switchID, setSwitchID] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [detail, setDetail] = useState({
    prefix_id: "",
    prefix_name: "",
  });

  const handleUpdate = async (record: any) => {
    setUpdateData(record);
    setOpenUpdate(true);
  };

  const fetch = async () => {
    setSearch("");
    try {
      const { data } = await axios.get(GET_ALL_PREFIX + `?search=`);
      if (data.status === "success") {
        setData(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const SwitchStatus = async () => {
    try {
      const { data } = await axios.put(SWITCH_PREFIX_STATUS + switchID);
      if (data.status === "success") {
        fetch();
        toast.success("บันทึกสำเร็จ");
        setOpenSwitch(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getDetail = async (prefix_id: string) => {
    try {
      const { data } = await axios.get(SUPER_PREFIX_DETAIL + prefix_id);
      if (data.status === "success") {
        setDetail(data.result);
        setOpenDetail(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(GET_ALL_PREFIX + `?search=${search}`);
        if (data.status === "success") {
          setData(data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (data.length === 0) {
      fetchData();
    } else {
      const timer = setTimeout(() => {
        fetchData();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [search]);

  return (
    <>
      <Warper pointer={["หน้าหลัก", "ร้านค้าทั้งหมด"]}>
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
            <img src="/images/README.png" width={70} height={70} />
            <Stack direction="column" sx={{ marginTop: "-16px" }}>
              <Typography.Title
                style={{ marginBottom: "0", marginLeft: "12px" }}
                level={2}
              >
                ร้านค้าทั้งหมด
              </Typography.Title>
              <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
                ตั้งค่่าร้านค้าที่ใช้บริการ
              </Typography.Text>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ height: "40px" }}
              placeholder="ชื่อร้านค้า"
              prefix={<SearchOutlined style={{ color: "#888888" }} />}
            />
            <Button
              size="large"
              type="primary"
              onClick={() => setOpenCreate(true)}
            >
              เพิ่มร้านค้า
            </Button>
          </Stack>
        </Stack>
        <Table
          dataSource={data}
          scroll={{ x: true }}
          style={{ marginTop: "10px" }}
          columns={[
            {
              title: "สถานะ",
              dataIndex: "status",
              key: "status",
              render: (value) => {
                return (
                  <Tag color={value ? "green" : "red"}>
                    {value ? "เปิดใช้งานอยู่" : "ปิดใช้งานอยู่"}
                  </Tag>
                );
              },
            },
            {
              title: "ชื่อร้านค้า",
              dataIndex: "prefix_name",
              key: "prefix_name",
              render: (value) => {
                return (
                  <Stack direction="row" sx={{ width: "200px" }}>
                    <Typography.Text>{value}</Typography.Text>
                  </Stack>
                );
              },
            },
            {
              title: "ค่าคอมมิชชั่นที่ร้านได้รับ",
              dataIndex: "prefix_free_tax",
              key: "prefix_free_tax",
              render: (value) => {
                return (
                  <Stack direction="row" sx={{ width: "160px" }}>
                    <Tag color="blue">{value} %</Tag>
                  </Stack>
                );
              },
            },
            {
              title: "ค่าใช้บริการ AI ",
              dataIndex: "prefix_ai_amount",
              key: "prefix_ai_amount",
              render: (value) => {
                return (
                  <Stack direction="row" sx={{ width: "100px" }}>
                    <Typography.Text>{value} บาท/รายการ</Typography.Text>
                  </Stack>
                );
              },
            },
            {
              title: "เปิดใช้งานเมื่อ",
              dataIndex: "created_at",
              key: "created_at",
              render: (value) => {
                return (
                  <Stack direction="row" sx={{ width: "100px" }}>
                    {moment(value).format("DD MMM YYYY")}
                  </Stack>
                );
              },
            },
            {
              title: "",
              dataIndex: "prefix_id",
              key: "prefix_id",
              render: (_, record: any) => {
                return (
                  <Stack sx={{ display: "flex", flexDirection: "row" }}>
                    <Button
                      type="primary"
                      className="btn-info"
                      style={{ marginRight: "10px" }}
                      onClick={() => getDetail(record.prefix_id)}
                    >
                      โปรไฟล์ร้าน
                    </Button>
                    <Button
                      type="primary"
                      className="btn-warning"
                      style={{ marginRight: "10px" }}
                      onClick={() => handleUpdate(record)}
                      disabled={!record.status}
                    >
                      แก้ไขข้อมูล
                    </Button>
                    <Button
                      type="primary"
                      className={record.status ? "btn-danger" : "btn-success"}
                      onClick={() => {
                        setOpenSwitch(true);
                        setSwitchID(record.prefix_id);
                      }}
                    >
                      {record.status ? "ปิดการใช้งาน" : "เปิดการใช้งาน"}
                    </Button>
                  </Stack>
                );
              },
            },
          ]}
        />
      </Warper>
      <CreatePrefixModal
        open={openCreate}
        setOpen={setOpenCreate}
        callback={fetch}
      />
      <UpdatePrefixModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        data={updateData}
        setData={setUpdateData}
        callback={fetch}
      />
      <SwitchPrefixModal
        open={openSwitch}
        setOpen={setOpenSwitch}
        callback={SwitchStatus}
      />
      <ProfilePrefixModal
        open={openDetail}
        setOpen={setOpenDetail}
        detail={detail}
      />
    </>
  );
};

export default AdminPrefix;
