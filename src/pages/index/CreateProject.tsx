import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import TinyMce from "../../components/TinyMce";
import { apiCreateProjectAuthorize, apiGetProjectCategory } from "../../utils/api/projectApi";
import { Category, CreProject } from "../../utils/type/TypeProject";



const { Option } = Select;

type Props = {};

const CreateProject = ({}: Props) => {
  const editorRef = useRef<any>(null);
  const [category, setCategory] = useState<Category[]>();

  const getCategory = async () => {
    let category = await apiGetProjectCategory();
    if (category.data) {
      setCategory(category.data.content);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onFinish = async (values: CreProject) => {
    if (editorRef.current) {
      values.description = editorRef.current.getContent();
    }
    try {
      if (values.projectName !== " ") {
        await apiCreateProjectAuthorize(values);
        alert("project created success");
      } else {
        alert("input project");
      }
    } catch (e) {
      alert("project failed");
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-semibold bg-white ">Create Project</h2>
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
            initialValue={" "}
          >
            <Input className="rounded-sm" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ message: "Please input your Description!" }]}
            className="formItem"
            initialValue={" "}
          >
            <TinyMce editorRef={editorRef} initialValue={""} />
          </Form.Item>
          <Form.Item name="categoryId" label="Category" className="formItem ">
            <Select defaultValue="Dự án web" className="w-full">
              {category?.map((item: Category) => {
                return (
                  <Option value={item.id} key={item.id} className="mt-1 ">
                    {item.projectCategoryName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Alias"
            name="alias"
            rules={[{ message: "Please input your alias!" }]}
            className="formItem"
            initialValue={" "}
          >
            <Input className="rounded-sm" size="small" />
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
};

export default CreateProject;
