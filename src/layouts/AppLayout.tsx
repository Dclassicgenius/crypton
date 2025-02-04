import { Outlet } from "react-router";
import Content from "./Content";
import Navbar from "@/components/navbar";

const AppLayout = () => {
  return (
    <div className="">
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default AppLayout;
