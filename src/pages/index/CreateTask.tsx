import { Button, Form, Input, Select, Slider } from "antd";
import { TreeSelect } from "antd";

import React, { useEffect, useRef, useState } from "react";
import {
  getALLPriority,
  getAllStatus,
  getAllTaskType,
  getCreateTask,
  getProjectByUser,
  Priority,
  project,
  Status,
  TaskType,
} from "../../redux/Reducers/projectReducer";
import { getAllUserApi } from "../../redux/Reducers/userReducer";
import { getStoreJSON, http, USER_LOGIN } from "../../utils/setting";
import { InputNumber } from "antd";
import TinyMce from "../../components/TinyMce";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import { useNavigate } from "react-router-dom";
import { user } from "../../utils/type/typeUser";
import { CreTask } from "../../utils/type/TypeProject";
import { apiGetUserByProjectId } from "../../utils/api/userApi";
import { apiCreateTask } from "../../utils/api/projectApi";


const { SHOW_PARENT } = TreeSelect;
const { Option } = Select;

type Props = {};

export default function CreateTask({}: Props) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(1);
  const [value, setValue] = useState<string>();
  const [treeData, setTreeData] =
    useState<
      { title: string | number; value: string | number; key: string | number }[]
    >();
  const [userAssign, setUserAssign] = useState<user[]>();
  const editorRef = useRef<any>(null);

  const { status } = useAppSelector((state) => state.projectReducer);
  const { taskType } = useAppSelector((state) => state.projectReducer);
  const { priority } = useAppSelector((state) => state.projectReducer);
  const { projectByUserLogin } = useAppSelector(
    (state) => state.projectReducer
  );
  const dispatch = useAppDispatch();

  const covertListUser = () => {
    let treeData: {
      title: string | number;
      value: string | number;
      key: string | number;
    }[] = [];
    for (let user in userAssign) {
      let userEl = userAssign[Number(user)];
      treeData.push({
        title: userEl.name,
        value: userEl.userId,
        key: userEl.userId,
      });
    }

    setTreeData(treeData);
  };

  const tProps = {
    treeData,
    value,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };

  const onFinish = async (values: CreTask) => {
    if (editorRef.current) {
      values.description = editorRef.current.getContent();
    }
    try {
      let createTask = await apiCreateTask(values);
      await dispatch(getCreateTask(createTask.data.content));
      //create Task success => create user for task
      for (let u in values.listUserAsign) {
        await http.post("/Project/assignUserTask", {
          taskId: createTask.data.content.taskId,
          userId: values.listUserAsign[u],
        });
      }
      alert("task created successfully");
    } catch (e) {
      alert("task failed , you can change task name");
    }
  };

  const getAllDate = async () => {
    await dispatch(getAllStatus());
    await dispatch(getALLPriority());
    await dispatch(getAllTaskType());
    await dispatch(getAllUserApi());
  };

  const getUserByProject = async (idProject: number) => {
    try {
      let result = await apiGetUserByProjectId(idProject)
      // console.log(result.data.content);
      await setUserAssign(result.data.content);
    } catch (e) {}
  };

  useEffect(() => {
    covertListUser();
  }, [userAssign]);

  useEffect(() => {
    if (getStoreJSON(USER_LOGIN)) {
      getAllDate();
      dispatch(getProjectByUser(getStoreJSON(USER_LOGIN).content.id));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className=" ">
      <h2 className="text-3xl font-semibold">Create Task</h2>
      <div className="ml-2 content-container overflow-y-auto">
        <Form
          name="vertical"
          style={{ maxWidth: 700 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Project" name="projectId" className="formItem">
            <Select
              className="w-full"
              defaultValue={"Project"}
              onChange={(value) => {
                if (value) {
                  getUserByProject(Number(value));
                }
              }}
              onFocus={() => {
                if (projectByUserLogin.length == 0) {
                  alert("please create project for you");
                }
              }}
            >
              {projectByUserLogin?.map((item: project) => {
                return (
                  <Option value={item.id} key={item.id} className="mt-1 ">
                    {item.projectName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Task Name"
            name="taskName"
            rules={[{ message: "Please input task name!" }]}
            className="formItem"
            initialValue={""}
          >
            <Input className="rounded-sm" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="statusId"
            rules={[{ message: "Please input Status!" }]}
            className="formItem"
            initialValue={" "}
          >
            <Select className="w-full">
              {status?.map((item: Status) => {
                return (
                  <Option
                    value={item.statusName}
                    key={item.statusId}
                    className="mt-1 "
                  >
                    {item.statusName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <div className="flex justify-between gap-3">
            <Form.Item
              label="Priority"
              name="priorityId"
              className="w-full  formItem"
              initialValue={" "}
            >
              <Select className="w-full">
                {priority?.map((item: Priority) => {
                  return (
                    <Option
                      value={item.priorityId}
                      key={item.priorityId}
                      className="mt-1 "
                    >
                      {item.description}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              className="w-full formItem"
              label="TaskType"
              name="typeId"
              initialValue={" "}
            >
              <Select className="w-full">
                {taskType?.map((item: TaskType) => {
                  return (
                    <Option value={item.id} key={item.id} className="mt-1 ">
                      {item.taskType}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>

          <div className="flex justify-center gap-3">
            <Form.Item
              label="Assignees"
              name="listUserAsign"
              className="formItem w-full"
            >
              <TreeSelect {...tProps} />
            </Form.Item>
            <Form.Item
              label="Time tracking"
              name="timeTracking"
              className="w-full formItem"
              initialValue={0}
            >
              <Slider
                min={1}
                max={20}
                value={typeof inputValue === "number" ? inputValue : 0}
              />
            </Form.Item>
          </div>

          <div className="flex justify-center gap-3">
            <Form.Item
              label="Original Estimate"
              name="originalEstimate"
              className="formItem "
              initialValue={0}
            >
              <InputNumber
                min={0}
                max={100000}
                defaultValue={0}
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Time Spent"
              name="timeTrackingSpent"
              className="formItem "
              initialValue={0}
            >
              <InputNumber
                min={0}
                max={100000}
                defaultValue={0}
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Time Remaining"
              name="timeTrackingRemaining"
              className="formItem"
              initialValue={0}
            >
              <InputNumber
                min={0}
                max={100000}
                defaultValue={0}
                className="w-full"
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ message: "Please input your Description!" }]}
          >
            <TinyMce editorRef={editorRef} initialValue={""} />
          </Form.Item>

          <Form.Item wrapperCol={{}}>
            <Button
              type="default"
              htmlType="submit"
              className="bg-slate-500 text-white"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
