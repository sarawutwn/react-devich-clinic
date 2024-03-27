import { Button, Col, Row, Space, Table, Typography } from "antd";
import { SaveFilled, EditFilled } from "@ant-design/icons";
import Warper from "../../utils/warpper-page";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_PERMISSION, GET_COMPONENT_BY_ID } from "../../endpoint";
import PermissionCreateModal from "../../components/roles-permission/permission/permission-create-modal";
import PermissionUpdateModal from "../../components/roles-permission/permission/permission-update-modal";
import PermissionConfigModal from "../../components/roles-permission/permission/permission-config-modal";

const Permission = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);
  const [update, setUpdate] = useState({});
  const [permissionConfig, setPermissionConfig] = useState({});
  const [configData, setConfigData] = useState([]);
  const [permission, setPermission] = useState([]);

  const handleCreate = async () => {
    setOpenCreate(true);
  };

  const handleUpdate = async (value: any) => {
    setUpdate(value);
    setOpenUpdate(true);
  };

  const handleConfig = async (value: any) => {
    setPermissionConfig(value);
    try {
      const { data } = await axios.get(GET_COMPONENT_BY_ID + value.permission_id);
      if (data.status === "success") {
        setConfigData(data.result);
      }
      setOpenConfig(true);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(GET_ALL_PERMISSION);
      if (data.status === "success") {
        setPermission(data.result);
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
      <Warper pointer={["หน้าหลัก", "จัดการสิทธ์"]}>
        <Row justify={"space-between"} style={{ marginBottom: "20px" }}>
          <Row>
            <img
              src="/images/roles-permission/permission.png"
              width={70}
              height={70}
            />
            <Col style={{ marginTop: "-16px" }}>
              <Typography.Title
                style={{ marginBottom: "0", marginLeft: "12px" }}
                level={2}
              >
                สิทธ์การใช้งาน
              </Typography.Title>
              <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
                ตั้งค่าสิทธ์การใช้งานทั้งหมด
              </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Button
              type="primary"
              size="large"
              icon={<SaveFilled />}
              style={{
                marginTop: "10px",
                width: "100%",
                background: "#6fbf73",
              }}
              onClick={handleCreate}
            >
              เพิ่มสิทธ์
            </Button>
          </Row>
        </Row>
        <Table
          dataSource={permission}
          size="small"
          scroll={{ x: true }}
          columns={[
            {
              title: "ชื่อสิทธ์",
              dataIndex: "permission_name",
              key: "permission_name",
            },
            {
              title: "ชื่อแสดงผล",
              dataIndex: "permission_display_name",
              key: "permission_display_name",
              render: (value) => {
                return <div style={{ whiteSpace: "nowrap" }}>{value}</div>
              }
            },
            {
              title: "รายละเอียด",
              dataIndex: "permission_description",
              key: "permission_description",
              render: (value) => {
                return <div style={{ whiteSpace: "nowrap" }}>{value}</div>
              }
            },
            {
              title: "ตั้งค่า",
              key: "action",
              render: (_, record) => (
                <Space
                  size="middle"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Button
                    type="primary"
                    style={{ width: "100px", background: "#1C84C6" }}
                    onClick={() => handleConfig(record)}
                  >
                    ส่วนประกอบ
                  </Button>
                  <Button
                    type="primary"
                    icon={<EditFilled />}
                    style={{ width: "100px" }}
                    onClick={() => handleUpdate(record)}
                  >
                    แก้ไข
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </Warper>
      <PermissionCreateModal
        open={openCreate}
        setOpen={setOpenCreate}
        callback={fetchData}
      />
      <PermissionUpdateModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        permission={update}
        setPermission={setUpdate}
        callback={fetchData}
      />
      <PermissionConfigModal
        open={openConfig}
        setOpen={setOpenConfig}
        permission={permissionConfig}
        configData={configData}
        setConfigData={setConfigData}
        callback={fetchData}
      />
    </>
  );
};

export default Permission;
