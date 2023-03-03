import { Menu, MenuProps } from "antd";
import React, { useEffect, useState} from "react";
import { AiFillSetting, AiOutlineMenu } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { GrDocumentUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import people from "../../assets/img/personIcon.jpg";
import { USER_LOGIN } from "../../utils/setting";


type Props = {};

export default function NavTapLeft({}: Props) {
  const navigate = useNavigate();
  const [infouser, setInfoUser] = useState() 

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  useEffect(()=>{
    const getInfo = async()=>{
      const Info = await localStorage.getItem(USER_LOGIN);
     const obInfo = JSON.parse(Info as string)
     setInfoUser(obInfo?.content?.name)
    }
    getInfo()
  },[])

  const onClick = (e: { key: any }) => {
    switch (e.key) {
      case "0":
        {
          navigate("listProject");
        }
        break;
      case "1":
        {
          navigate("createProject");
        }
        break;
      default:
        break;
    }
  };
  const items: MenuItem[] = [
    getItem("Project Manager", "0", <AiFillSetting />),
    getItem("Create Project", "1", <AiFillSetting />),
  ];
  const handleLogout = () =>{
    localStorage.clear();
    window.localStorage.clear();
    navigate('/user/login')
  }

  return (
    <div className="grid grid-cols-2 h-screen justify-center ">
      <div className="col-span-1 bg-slate-700 text-white ">
        <div className="flex justify-end p-2">
          <AiOutlineMenu />
        </div>
        <div className="pl-7 flex flex-col" style={{height:'95%'}}>
          <div>
          <button
            className="flex gap-1 items-center hover:text-blue-500 mb-2"
            onClick={() => {
              navigate("createTask");
            }}
          >
            <BsPlusLg />
            Create Task
          </button>
          <button
            className="flex gap-1 items-center hover:text-blue-500 mb-2"
            onClick={() => {
              navigate("updateTask");
            }}
          >
            <GrDocumentUpdate className="text-white " />
            Update Task
          </button>
          <button className="flex gap-1 items-center hover:text-blue-500">
            <BiSearch />
            Search
          </button>
         </div>
          <button className="flex gap-1 mt-auto items-center hover:text-red-500" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="col-span-1 bg-slate-300 text-black pt-3 ">
        <div className="flex pl-5 overflow-hidden">
          <img
            src={people}
            alt="img"
            className="w-10 h-10 mr-2 rounded-full"
          ></img>
          <div>
            <h3 className="font-bold">{infouser}</h3>
            <p>Report bugs</p>
          </div>
        </div>
        <Menu
          onClick={onClick}
          className=" bg-slate-300 text-black pt-3 w-full "
          defaultOpenKeys={["0"]}
          mode="inline"
          items={items}
        />
      </div>
    </div>
  );
}
