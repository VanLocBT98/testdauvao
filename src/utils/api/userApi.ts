import { http } from "../setting";
import { RemoveUser } from "../type/TypeProject";

const apiGetAllUser = () => {
  let uri = "/Users/getUser";
  return http.get(uri);
};
const apiAssignUserProject=(data:RemoveUser)=>{
  let uri = `/Project/assignUserProject`;
  return http.post(uri,data);
}

const apiGetUserByProjectId = (id: Number) => {
  let uri = `/Users/getUserByProjectId?idProject=${id}`;
  return http.get(uri);
};

const apiRemoveUserFromProject = (dataDelete:RemoveUser) => {
  let uri = `/Project/removeUserFromProject`;
  return http.post(uri,dataDelete);
};

export { apiGetAllUser, apiGetUserByProjectId, apiRemoveUserFromProject,apiAssignUserProject };
