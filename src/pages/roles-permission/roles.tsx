import { Button, Col, Row, Space, Table, Typography } from "antd";
import { SaveFilled, EditFilled, DeleteFilled } from "@ant-design/icons";
import Warper from "../../utils/warpper-page";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  DELETE_ROLES,
  GET_ALL_ROLES,
  GET_COMPONENT_BY_ROLE_ID,
  GET_PERMISSION_WITH_COMPONENT,
} from "../../endpoint";
import store from "../../redux/store";
import RolesCreateModal from "../../components/roles-permission/roles/roles-create-modal";
import RolesUpdateModal from "../../components/roles-permission/roles/roles-update-modal";
import RolesDeleteModal from "../../components/roles-permission/roles/roles-delete-modal";
import { toast } from "react-toastify";
import RolePermissionModal from "../../components/roles-permission/roles/roles-permission-modal";

const Roles = (props: any) => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPermission, setOpenPermission] = useState(false);
  const [update, setUpdate] = useState({});
  const [deleteItem, setDeleteItem] = useState("");
  const [permission, setPermission] = useState([]);
  const [configRole, setConfigRole] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(GET_ALL_ROLES);
      if (data.status === "success") {
        await store.dispatch({ type: "SET_ROLES", payload: data.result });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePermission = async (value: any) => {
    try {
      const response = await axios.get(
        GET_COMPONENT_BY_ROLE_ID + `${value.role_id}`
      );
      const { data } = await axios.get(GET_PERMISSION_WITH_COMPONENT);
      if (data.status === "success") {
        let result = data.result;
        await result.sort(function (a: any, b: any) {
          return a.created_at.localeCompare(b.created_at);
        });
        let permissionResult: any = [];
        for (let i = 0; i < result.length; i++) {
          let item = result[i];
          let subResult = [];
          for (let j = 0; j < item.permission_components.length; j++) {
            let component = item.permission_components[j];
            let resultComponent = { ...component, have_permission: false };
            if (response.data.result !== null) {
              for (let component_id of response.data.result) {
                if (component_id === component.permission_component_id) {
                  resultComponent = { ...component, have_permission: true };
                }
              }
            }
            await subResult.push({ ...resultComponent });
          }
          await permissionResult.push({
            ...item,
            permission_components: subResult,
          });
        }
        setConfigRole(value.role_id);
        setPermission(permissionResult);
        setOpenPermission(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async () => {
    setOpenCreate(true);
  };

  const handleUpdate = async (value: any) => {
    setUpdate(value);
    setOpenUpdate(true);
  };

  const handleDelete = async (value: any) => {
    setDeleteItem(value);
    setOpenDelete(true);
  };

  const onDelete = async () => {
    try {
      const { data } = await axios.delete(DELETE_ROLES + deleteItem);
      if (data.status === "success") {
        fetchData();
        setOpenDelete(false);
      }
    } catch (err) {
      toast.error("มีบางอย่างผิดพลาด");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Warper pointer={["หน้าหลัก", "บทบาท"]}>
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
                บทบาท
              </Typography.Title>
              <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
                ตั้งค่าบทบาทใหม่
              </Typography.Text>
            </Col>
          </Row>
          <Row>
            <Button
              type="primary"
              size="large"
              className="btn-success"
              icon={<SaveFilled />}
              style={{
                marginTop: "10px",
                width: "100%",
              }}
              onClick={handleCreate}
            >
              เพิ่มบทบาท
            </Button>
          </Row>
        </Row>
        <Table
          dataSource={props.Roles}
          size="small"
          style={{ background: "#FFF !important" }}
          scroll={{ x: true }}
          columns={[
            {
              title: "บทบาท",
              dataIndex: "role_name",
              key: "role_display_name",
              render: (value) => {
                return <div style={{ whiteSpace: "nowrap" }}>{value}</div>
              }
            },
            {
              title: "ชื่อบทบาท",
              dataIndex: "role_display_name",
              key: "role_display_name",
              render: (value) => {
                return <div style={{ whiteSpace: "nowrap" }}>{value}</div>
              }
            },
            {
              title: "รายละเอียด",
              dataIndex: "role_description",
              key: "role_description",
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
                    className="btn-info"
                    style={{ width: "100px" }}
                    onClick={() => handlePermission(record)}
                  >
                    จัดการสิทธ์
                  </Button>
                  <Button
                    type="primary"
                    className="btn-warning"
                    icon={<EditFilled />}
                    style={{ width: "100px" }}
                    onClick={() => handleUpdate(record)}
                  >
                    แก้ไข
                  </Button>
                  <Button
                    type="primary"
                    icon={<DeleteFilled />}
                    style={{ background: "red", width: "100px" }}
                    onClick={() => handleDelete(record.role_id)}
                  >
                    ลบ
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </Warper>
      <RolesCreateModal
        open={openCreate}
        setOpen={setOpenCreate}
        callback={fetchData}
      />
      <RolesUpdateModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        roles={update}
        setRoles={setUpdate}
        callback={fetchData}
      />
      <RolesDeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        callback={onDelete}
      />
      <RolePermissionModal
        open={openPermission}
        setOpen={setOpenPermission}
        role_id={configRole}
        permission={permission}
        setPermission={setPermission}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    Roles: state.roles,
  };
};
export default connect(mapStateToProps)(Roles);
