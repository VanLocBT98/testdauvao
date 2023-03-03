import { Button, Descriptions, Form, Input, Select, Slider } from "antd";
import { TreeSelect } from "antd";

import React, { useEffect, useRef, useState } from "react";
import {
  getALLPriority,
  getAllProjectManager,
  getAllStatus,
  getAllTaskType,
  getProjectByIdApi,
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
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import { user } from "../../utils/type/typeUser";
import { UpdTask } from "../../utils/type/TypeProject";
import { apiUpdateTask } from "../../utils/api/projectApi";



const { SHOW_PARENT } = TreeSelect;
const { Option } = Select;

type Props = {};

export default function UpdateTask({}: Props) {
  const [inputValue, setInputValue] = useState(1);
  const [value, setValue] = useState<string>();
  const [treeData, setTreeData] =
    useState<
      { title: string | number; value: string | number; key: string | number }[]
    >();

  const { projectByUserLogin } = useAppSelector(
    (state) => state.projectReducer
  );

  //get taskID
  const { createTask } = useAppSelector((state) => state.projectReducer);

  const [userAssign, setUserAssign] = useState<user[]>();
  const editorRef = useRef<any>(null);

  const { status } = useAppSelector((state) => state.projectReducer);
  const { taskType } = useAppSelector((state) => state.projectReducer);
  const { priority } = useAppSelector((state) => state.projectReducer);
  const { userAll } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();
  
  //change list user for render
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

  const onFinish = async (values: UpdTask) => {
    if (editorRef.current) {
      values.description = editorRef.current.getContent();
    }
    values.taskId= createTask.taskId.toString()
    try {
      await apiUpdateTask(values)
      alert("task created success");
    } catch (e) {
      alert("task failed");
    }
  };

  const getUserByProject = async (idProject: number) => {
    try {
      let result = await http.get(
        `/Users/getUserByProjectId?idProject=${idProject}`
      );
      // console.log(result.data.content);
      await setUserAssign(result.data.content);
    } catch (e) {}
  };

  useEffect(() => {
    covertListUser();
  }, [userAssign]);

  useEffect(() => {
    dispatch(getAllProjectManager());
    dispatch(getAllStatus());
    dispatch(getALLPriority());
    dispatch(getAllTaskType());
    dispatch(getAllUserApi());
    dispatch(getProjectByUser(getStoreJSON(USER_LOGIN).content.id));
    if (userAll) {
      covertListUser();
    }
    // dispatch(getProjectByIdApi(11724))
  }, []);

  return (
    <div className=" ">
      <h2 className="text-3xl font-semibold">Update Task</h2>
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
              defaultValue={projectByUserLogin[0]?.projectName}
              onChange={(value) => {
                getUserByProject(Number(value));
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
          >
            <Input className="rounded-sm" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="statusId"
            rules={[{ message: "Please input Status!" }]}
            className="formItem"
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
              className="formItem   "
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
