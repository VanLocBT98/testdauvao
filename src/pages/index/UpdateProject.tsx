import { Button, Form, Input, Select } from "antd";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import TinyMce from "../../components/TinyMce";
import { useAppDispatch, useAppSelector } from "../../Hooks/HooksRedux";
import {
  getAllProjectManager,
  getProjectByIdApi,
} from "../../redux/Reducers/projectReducer";
import {
  apiGetProjectCategory,
  apiUpdateProject,
} from "../../utils/api/projectApi";
import { http } from "../../utils/setting";
import { Category, UpdProject } from "../../utils/type/TypeProject";

const { Option } = Select;
type Props = {};

function UpdateProject({}: Props) {
  const editorRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [category, setCategory] = useState<Category[]>();
  const { arrProject } = useAppSelector((state) => state.projectReducer);
  const { detailProject } = useAppSelector((state) => state.projectReducer);

  const getCategory = async () => {
    let category = await apiGetProjectCategory();
    if (category.data) {
      setCategory(category.data.content);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onFinish = async (values: UpdProject) => {
    if (editorRef.current) {
      values.description = editorRef.current.getContent();
    }
    values.id = Number(id);
    try {
      await apiUpdateProject(values, Number(id));
      alert("update success");
    } catch (e) {
      alert(
        "update failure, you cannot update project ,because you are not allowed to participate "
      );
    }
  };
  const getProject = () => {
    dispatch(getProjectByIdApi(Number(id)));
  };

  useEffect(() => {
    if (arrProject.length === 0) {
      //get all user
      dispatch(getAllProjectManager());
    }
    getProject();
  }, [id]);

  return (
    <div className="">
      <h2 className="text-3xl font-semibold bg-white ">Update Project</h2>
      <div className="ml-2 content-container overflow-y-auto">
        <Form
          name="vertical"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="projectName"
            rules={[{ message: "Please input your name!" }]}
            className="formItem"
          >
            <Input
              className="rounded-sm"
              placeholder={detailProject?.projectName}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ message: "Please input your Description!" }]}
            className="formItem"
          >
            <TinyMce
              editorRef={editorRef}
              initialValue={detailProject?.description}
            />
          </Form.Item>

          <Form.Item name="categoryId" label="Category" className="formItem ">
            <Select
              defaultValue={detailProject?.projectCategory.name}
              className="w-full"
              placeholder={detailProject?.projectCategory.name}
            >
              {category?.map((item: Category) => {
                return (
                  <Option value={item.id} key={item.id} className="mt-1 ">
                    {item.projectCategoryName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{}} className="mt-1">
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

export default UpdateProject;
