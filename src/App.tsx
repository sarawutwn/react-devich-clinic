import { useState } from "react";
import Routes from "./routes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./utils/loading";
import { ConfigProvider } from "antd";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(false);

  axios.interceptors.request.use(
    async function (config) {
      setLoading(true);
      return config;
    },
    function (error) {
      setLoading(false);
      toast.error(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      setLoading(false);
      return response;
    },
    async function (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  return (
    <>
      <Loading open={loading} />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ff725c",
            colorBgContainer: "#ffffff",
            // fontFamily: "'IBM Plex Sans Thai', 'Poppins', Arial, sans-serif",
            fontFamily: "'IBM Plex Sans Thai', Helvetica, Arial, sans-serif",
            // fontFamily: "'Noto Sans Thai', sans-serif",
            boxShadow: "rgba(76, 78, 100, 0.22) 0px 2px 10px 0px",
            colorText: "rgba(76, 78, 100, 0.87)",
            borderRadius: 5,
          },
        }}
      >
        <Routes />
      </ConfigProvider>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
