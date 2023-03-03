import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, getStoreJSON, USER_LOGIN } from "../../utils/setting";
import NavTapLeft from "./NavTapLeft";


type Props = {};

export default function DashBoard({}: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    let userLogin = getStoreJSON(USER_LOGIN);
    let accessToken = getStoreJSON(ACCESS_TOKEN);
    if (!userLogin || ! accessToken) {
      navigate("/user/login");
    }
  }, []);

  return (
    <div className="h-screen">
      <div className="grid grid-cols-8 justify-center ">
        <div className="col-span-2 justify-center ">
          <NavTapLeft />
        </div>
        <div className="col-span-6 mt-8 ml-6 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
