import { http } from "../setting";
import { CreProject, CreTask, UpdProject, UpdTask } from "../type/TypeProject";

const apiCreateProject = () => {
  let uri = `/Project/createProject`;
  return http.post(uri);
};

const apiDeleteProject = (id: number) => {
  let uri = `/Project/deleteProject?projectId=${id}`;
  return http.delete(uri);
};

const apiGetAllProject = () => {
  let uri = `/Project/getAllProject`;
  return http.get(uri);
};

const apiGetProjectDetail = (id: number) => {
  let uri = `/Project/getProjectDetail?id=${id}`;
  return http.get(uri);
};

const apiCreateProjectAuthorize = (project: CreProject) => {
  let uri = "/Project/createProjectAuthorize";
  return http.post(uri, project);
};
const apiCreateTask = (data: CreTask) => {
  let uri = "/Project/createTask";
  return http.post(uri, data);
};
const apiUpdateTask = (data: UpdTask) => {
  let uri = "/Project/updateTask";
  return http.post(uri, data);
};

const apiGetAllStatus = () => {
  let uri = "/Status/getAll";
  return http.get(uri);
};
const apiGetAllPriority = () => {
  let uri = "/Priority/getAll";
  return http.get(uri);
};
const apiGetAllTaskType = () => {
  let uri = "/TaskType/getAll";
  return http.get(uri);
};
const apiGetTaskDetail = (taskId: number) => {
  let uri = `/Project/getTaskDetail?taskId=${taskId}`;
  return http.get(uri);
};

const apiGetProjectCategory = () => {
  let uri = "/ProjectCategory";
  return http.get(uri);
};

const apiUpdateProject = (project: UpdProject, id: number) => {
  let uri = `/Project/updateProject?projectId=${id}`;
  return http.put(uri, project);
};



export {
  apiCreateProject,
  apiUpdateProject,
  apiDeleteProject,
  apiCreateTask,
  apiGetAllProject,
  apiCreateProjectAuthorize,
  apiUpdateTask,
  apiGetAllStatus,
  apiGetAllPriority,
  apiGetAllTaskType,
  apiGetTaskDetail,
  apiGetProjectDetail,
  apiGetProjectCategory,
};
