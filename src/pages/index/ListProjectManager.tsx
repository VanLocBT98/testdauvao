import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { Popover, Select, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getStoreJSON, USER_LOGIN } from "../../utils/setting";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { getAllUserApi } from "../../redux/Reducers/userReducer";
import {
  getAllProjectManager,
  setAllProject,
} from "../../redux/Reducers/projectReducer";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import { user } from "../../utils/type/TypeUser";
import { Member, project } from "../../utils/type/TypeProject";
import {
  apiAssignUserProject,
  apiRemoveUserFromProject,
} from "../../utils/api/userApi";
import { apiDeleteProject } from "../../utils/api/projectApi";

type Props = {};

export default function ListProjectManager({}: Props) {
  const dispatch = useAppDispatch();
  const { arrProject } = useAppSelector((state) => state.projectReducer);
  const { userAll } = useAppSelector((state) => state.userReducer);

  const [content, setContent] = useState<JSX.Element[]>();
  const { Option } = Select;
  const navigate = useNavigate();

  const setContentMember = (id: number) => {
    let findProject = arrProject?.find(
      (project: project) => Number(project.id) == id
    );
    let contentHtml = [
      <>
        <table>
          <tr className="text-center">
            <th>id</th>
            <th>avatar</th>
            <th>name</th>
            <th></th>
          </tr>
          {findProject?.members.map((member: Member, index: number) => {
            return (
              <tr className="text-center border-b-[1px]">
                <td>{member.userId}</td>
                <td className="flex justify-center items-center">
                  <img
                    src={member.avatar}
                    alt="avatar"
                    className="w-7 h-7 rounded-full"
                  />
                </td>
                <td>{member.name}</td>
                <td>
                  <button
                    className=" text-base flex justify-center items-center  "
                    onClick={() => {
                      if (findProject) {
                        deleteMember(findProject?.id, Number(member.userId));
                      }
                    }}
                  >
                    <TiDelete className="text-2xl hover:shadow-lg text-red-700" />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </>,
    ];
    setContent(contentHtml);
  };

  const deleteMember = async (idProject: number, userId: number) => {
    let dataDelete = {
      projectId: idProject,
      userId: userId,
    };
    try {
      if (dataDelete) {
        await apiRemoveUserFromProject(dataDelete);
        alert("deleted user success");
        dispatch(getAllProjectManager());
      }
    } catch (e) {
      alert("deleted user failed");
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await apiDeleteProject(id);
      alert("deleted project success");
      await dispatch(setAllProject(id));
    } catch (e) {
      alert(
        "you cannot delete project,because you are not allowed to participate"
      );
    }
  };

  const columns: ColumnsType<project> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "creator",
      dataIndex: "creator",
      key: "creator",
      render: (_, { creator }) => (
        <div>{creator.name.slice(0, 10) + "..."}</div>
      ),
    },
    {
      title: "members",
      key: "members",
      dataIndex: "members",
      render: (_, { members, id }) => (
        <>
          <div className="flex">
          <Popover
        placement="bottom"
        content={content}
        className="flex"
        title={
          <>
            <span>Member</span>
          </>
        }
        onOpenChange={() => {
          setContentMember(id);
        }}
      >
        {members?.map((member) => {
          return (
            <div>
              <div className=" w-7 h-7 mr-1 relative">
                <img
                  src={member.avatar}
                  alt=""
                  className="w-7 h-7 absolute rounded-full top-0 left-0 inline"
                />
              </div>
            </div>
          );
        })}
      </Popover>
            <Popover
              placement="bottom"
              content={
                <>
                  <Select
                    className="w-full"
                    onChange={async (value) => {
                      let data = {
                        projectId: id,
                        userId: value,
                      };
                      try {
                        await apiAssignUserProject(data);
                        alert("add user success");
                        dispatch(getAllProjectManager());
                      } catch (e) {
                        alert("add user failed, project not for you");
                      }
                    }}
                  >
                    {userAll?.map((item: user) => {
                      return (
                        <Option
                          value={item.userId}
                          key={item.userId}
                          className="mt-1 "
                        >
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </>
              }
              className="flex"
              title={
                <>
                  <span>Add member</span>
                </>
              }
            >
              <button>
                <div className="rounded-full w-7 h-7 bg-slate-100 p-[0.5px] mr-1 ">
                  <div className="flex justify-center items-center w-full h-full">
                    <AiOutlinePlus className="inline" />
                  </div>
                </div>
              </button>
            </Popover>
          </div>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              navigate(`/updateProject/${record.id}`);
            }}
          >
            Update
          </a>
          <a
            onClick={() => {
              deleteProject(record.id);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (getStoreJSON(USER_LOGIN)) {
      dispatch(getAllProjectManager());
      dispatch(getAllUserApi());
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-semibold">Project Manager</h1>
      <div className="content-container overflow-y-auto">
        <Table columns={columns} dataSource={arrProject} />
      </div>
    </div>
  );
}
