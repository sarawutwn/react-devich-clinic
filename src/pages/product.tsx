import { Button, Col, Row, Space, Table, Tag, Typography } from "antd";
import Warper from "../utils/warpper-page";
import { useEffect, useState } from "react";
import axios from "axios";
import { DELETE_PRODUCT, GET_PRODUCT_ALL, UPDATE_PRODUCT } from "../endpoint";
import CreateProductModal from "../components/product/create-product-modal";
import DeleteProductModal from "../components/product/delete-product-modal";
import { toast } from "react-toastify";
import UpdateProductModal from "../components/product/update-product-modal";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [itemUpdate, setItemUpdate] = useState({
    product_id: "",
    product_amount: 0,
    product_time: 0,
    product_description: "",
    product_type: "",
  });
  const [openDelete, setOpenDelete] = useState(false);
  const [itemDelete, setItemDelete] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(GET_PRODUCT_ALL);
      if (data.status === "success") {
        setProduct(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (record: any) => {
    setItemUpdate(record);
    setOpenUpdate(true);
  };

  const onUpdate = async () => {
    if (itemUpdate.product_amount === 0) {
      toast.error("กรุณากรอกราคา");
      return;
    }
    if (itemUpdate.product_description === "") {
      toast.error("กรุณากรอกรายละเอียด");
      return;
    }
    if (itemUpdate.product_time === 0) {
      toast.error("กรุณากรอกเวลาที่แสดงผล");
      return;
    }
    if (itemUpdate.product_type === "") {
      toast.error("กรุณาเลือกประเภทบริการ");
      return;
    }
    let decode: any = await jwtDecode(String(localStorage.getItem("TOKEN")));
    let formData = {
      product_type: itemUpdate.product_type,
      product_time: itemUpdate.product_time,
      product_amount: itemUpdate.product_amount,
      product_description: itemUpdate.product_description,
      prefix_id: decode.prefix_id,
    };
    try {
      const { data } = await axios.put(
        UPDATE_PRODUCT + itemUpdate.product_id,
        formData
      );
      if (data.status === "success") {
        setOpenUpdate(false);
        toast.success("แก้ไขรายการสำเร็จ");
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id: string) => {
    setOpenDelete(true);
    setItemDelete(id);
  };

  const onDelete = async () => {
    try {
      const { data } = await axios.delete(DELETE_PRODUCT + itemDelete);
      if (data.status === "success") {
        setOpenDelete(false);
        toast.success("ลบรายการสำเร็จ");
        fetchData();
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
      <Warper pointer={["หน้าหลัก", "สินค้า & บริการ"]}>
        <Row justify={"space-between"}>
          <Row style={{ marginTop: "-10px" }}>
            <img src="/images/add-to-cart.png" width={70} height={70} />
            <Col style={{ marginTop: "-16px" }}>
              <Typography.Title
                style={{ marginBottom: "0", marginLeft: "12px" }}
                level={2}
              >
                สินค้าและบริการ
              </Typography.Title>
              <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
                ตั้งค่าสินค้าและบริการของคุณ
              </Typography.Text>
            </Col>
          </Row>
          <Button
            size="large"
            type="primary"
            onClick={() => setOpenCreate(true)}
          >
            เพิ่มสินค้า
          </Button>
        </Row>
        <Table
          dataSource={product}
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
              title: "ประเภท",
              dataIndex: "product_type",
              key: "product_type",
            },
            {
              title: "รายละเอียด",
              dataIndex: "product_description",
              key: "product_description",
            },
            {
              title: "ราคา",
              dataIndex: "product_amount",
              key: "product_amount",
            },
            {
              title: "แสดง",
              dataIndex: "product_time",
              key: "product_time",
            },
            {
              title: "options",
              dataIndex: "",
              key: "",
              render: (_, record) => {
                const field: any = record;
                return (
                  <Space>
                    <Button
                      type="primary"
                      className="btn-warning"
                      onClick={() => handleUpdate(field)}
                    >
                      แก้ไข
                    </Button>
                    <Button
                      type="primary"
                      className="btn-danger"
                      onClick={() => handleDelete(field.product_id)}
                    >
                      ลบ
                    </Button>
                  </Space>
                );
              },
            },
          ]}
        />
      </Warper>
      <CreateProductModal
        open={openCreate}
        setOpen={setOpenCreate}
        callback={fetchData}
      />
      <UpdateProductModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        items={itemUpdate}
        setItems={setItemUpdate}
        callback={onUpdate}
      />
      <DeleteProductModal
        open={openDelete}
        setOpen={setOpenDelete}
        callback={onDelete}
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    profile: state.profile,
  };
};
export default connect(mapStateToProps)(Product);
