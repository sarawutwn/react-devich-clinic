import { Button, Col, Row, Space, Table, Tag, Typography } from "antd";
import { EditFilled } from "@ant-design/icons";
import Warper from "../../utils/warpper-page";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_ROLES, GET_USER_BY_STORE_ID } from "../../endpoint";
import UpdateRoleModal from "../../components/member/update-role-modal";
import store from "../../redux/store";
import { connect } from "react-redux";
import MemberProfile from "../../components/member/update-profile-modal";
import UpdateStatusModal from "../../components/member/update-status-modal";

type Props = {
  Profile: any;
  Roles: any;
};

const MemberList = (props: Props) => {
  const [users, setUsers] = useState([]);
  const [openUpdateRole, setopenUpdateRole] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [openProfile, setOpenProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [openStatus, setOpenStatus] = useState(false);
  const [updateStatus, setUpdateStatus] = useState({});

  const handleProfile = async (record: any) => {
    setProfileData(record);
    setOpenProfile(true);
  };

  const handleUpdateRole = async (record: any) => {
    try {
      if (props.Roles.length === 0) {
        const { data } = await axios.get(GET_ALL_ROLES);
        if (data.status === "success") {
          store.dispatch({ type: "SET_ROLES", payload: data.result });
        }
      }
      setUpdateData(record);
      setopenUpdateRole(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateStatus = async (record: any) => {
    setUpdateStatus({ user_id: record.user_id, status: !record.status });
    setOpenStatus(true);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(GET_USER_BY_STORE_ID);
      if (data.status === "success") {
        setUsers(data.result);
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
      <Warper pointer={["หน้าหลัก", "ผู้ใช้งานระบบ", "ผู้ใช้งานทั้งหมด"]}>
        <Row>
          <img src="/images/member/people.png" width={70} height={70} />
          <Col style={{ marginTop: "-16px" }}>
            <Typography.Title
              style={{ marginBottom: "0", marginLeft: "12px" }}
              level={2}
            >
              ผู้ใช้งานทั้งหมด
            </Typography.Title>
            <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
              รายชื่อพนักงานทั้งหมดของคุณ
            </Typography.Text>
          </Col>
        </Row>
        <Table
          style={{ marginTop: "20px" }}
          dataSource={users}
          scroll={{ x: true }}
          size="small"
          columns={[
            {
              title: "สถานะ",
              dataIndex: "status",
              key: "status",
              render: (_, { status }) => {
                return (
                  <Tag color={status ? "green" : "red"}>
                    {status ? "เปิดใช้งาน" : "ปิดการใช้งาน"}
                  </Tag>
                );
              },
            },
            {
              title: "บัญชีผู้ใช้งาน",
              dataIndex: "user_username",
              key: "user_username",
            },
            {
              title: "เบอร์โทรศัพท์",
              dataIndex: "user_telephone",
              key: "user_telephone",
            },
            {
              title: "ตั้งค่า",
              key: "action",
              render: (_, record: any) => (
                <Space
                  size="middle"
                  style={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Button
                    type="primary"
                    className="btn-info"
                    style={{ width: "100px" }}
                    onClick={() => handleUpdateRole(record)}
                    disabled={
                      props.Profile?.user_id === record?.user_id ? true : false
                    }
                  >
                    จัดการสิทธ์
                  </Button>
                  <Button
                    type="primary"
                    className="btn-warning"
                    icon={<EditFilled />}
                    style={{ width: "100px" }}
                    onClick={() => handleProfile(record)}
                    disabled={
                      props.Profile?.user_id === record?.user_id ? true : false
                    }
                  >
                    แก้ไข
                  </Button>
                  <Button
                    type="primary"
                    className={record.status === false ? "btn-success" : "btn-danger"}
                    style={{ width: "100px" }}
                    onClick={() => handleUpdateStatus(record)}
                    disabled={
                      props.Profile?.user_id === record?.user_id ? true : false
                    }
                  >
                    {record.status === false ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </Warper>
      <UpdateRoleModal
        open={openUpdateRole}
        setOpen={setopenUpdateRole}
        data={updateData}
        setData={setUpdateData}
        callback={fetchData}
      />
      <MemberProfile
        open={openProfile}
        setOpen={setOpenProfile}
        data={profileData}
        setData={setProfileData}
        callback={fetchData}
      />
      <UpdateStatusModal
        open={openStatus}
        setOpen={setOpenStatus}
        formData={updateStatus}
        setFormData={setUpdateStatus}
        callback={fetchData}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    Profile: state.profile,
    Roles: state.roles,
  };
};
export default connect(mapStateToProps)(MemberList);
