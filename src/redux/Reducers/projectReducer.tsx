import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiGetAllPriority, apiGetAllProject, apiGetAllStatus, apiGetAllTaskType, apiGetProjectDetail } from "../../utils/api/projectApi";
import { AppDispatch } from "../configStore";

export type Status = {
  statusId: number | string;
  statusName: string;
  alias: string;
  deleted: boolean;
};

export type TaskType = {
  id: number | string;
  taskType: string;
};

export type Priority = {
  priorityId: number | string;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
};

export interface project {
  members: [];
  creator: {
    id: number;
    name: string;
  };
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}


interface Members{
    userId: number;
    name: string;
    avatar: string;
    email: string ;
    phoneNumber: string ;
}
interface listTask{
  lstTaskDeTail: [] ;
  statusId: number;
  statusName: string;
  alias: string;
}

export interface ProjectDetail {
  lstTask:listTask[];
  members:Members [];
  creator: {
    id: number;
    name: string;
  };
  id: number;
  projectName: string;
  description: string;
  projectCategory: {
    id: number;
    name: string;
  };
  alias: string;
}

export interface TaskProject {
  lstTaskDeTail: [];
  statusId: number;
  statusName: string;
  alias: string;
}

export interface CreateTask {
  taskId: number;
  taskName: string;
  alias: string;
  description: string;
  statusId: number;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  deleted: boolean;
  reporterId: number;
  priorityId: number;
}

interface ProjectState {
  arrProject: project[];
  status: Status[];
  taskType: TaskType[];
  priority: Priority[];
  detailProject: ProjectDetail|null;
  taskProject: TaskProject[] | null;
  projectByUserLogin: project[];
  createTask: CreateTask;
}

const initialState: ProjectState = {
  arrProject: [],
  status: [],
  taskType: [],
  priority: [],
  detailProject:null,
  taskProject: null,
  projectByUserLogin: [],
  createTask: {
    taskId: 0,
    taskName: "",
    alias: "",
    description: "",
    statusId: 0,
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: 0,
    typeId: 0,
    deleted: false,
    reporterId: 0,
    priorityId: 0,
  },
};

const projectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    getAllProject: (state, action: PayloadAction<project[]>) => {
      state.arrProject = action.payload;
    },

    setAllProject:(state,action:PayloadAction<number>)=>{
        let newArr= state.arrProject.filter((pro:project)=>pro.id!==action.payload);
        state.arrProject=[...newArr];
    },

    getStatus: (state, action: PayloadAction<Status[]>) => {
      state.status = action.payload;
    },

    getTaskType: (state, action: PayloadAction<TaskType[]>) => {
      state.taskType = action.payload;
    },

    getPriority: (state, action: PayloadAction<Priority[]>) => {
      state.priority = action.payload;
    },

    getProjectById: (state, action: PayloadAction<ProjectDetail>) => {
      state.detailProject = action.payload;
    },

    getTaskProjectId: (state, action: PayloadAction<TaskProject[]>) => {
      state.taskProject = action.payload;
    },

    getProjectByUser: (state, action: PayloadAction<project[]>) => {
      let listProject: project[] = state.arrProject?.filter(
        (project: project) => project.creator.id === Number(action.payload)
      );
      let newList = [...listProject];
      state.projectByUserLogin = newList;
    },

    getCreateTask: (state,action:PayloadAction<CreateTask>)=>{
      state.createTask=action.payload
    }
  },
});

export const {
  getAllProject,
  getStatus,
  getTaskType,
  getPriority,
  getProjectById,
  getTaskProjectId,
  getProjectByUser,
  getCreateTask,
  setAllProject,
} = projectReducer.actions;

export default projectReducer.reducer;

//-------action api------------

export const getAllProjectManager = () => {
  return async (dispatch: AppDispatch) => {
    const result = await apiGetAllProject();
    let listProject = result.data.content;
    const action = getAllProject(listProject);
    dispatch(action);
  };
};

export const getAllStatus = () => {
  return async (dispatch: AppDispatch) => {
    let result = await apiGetAllStatus();
    let listStatus = result.data.content;
    const action = getStatus(listStatus);
    dispatch(action);
  };
};

export const getProjectByIdApi = (id: number) => {
  return async (dispatch: AppDispatch) => {
    let result = await apiGetProjectDetail(id);
    let project: ProjectDetail = result.data.content;
    dispatch(getTaskProjectId(project.lstTask));
    const action = getProjectById(project);
    dispatch(action);
  };
};

export const getAllTaskType = () => {
  return async (dispatch: AppDispatch) => {
    let result = await apiGetAllTaskType();
    let listTask = result.data.content;
    const action = getTaskType(listTask);
    dispatch(action);
  };
};

export const getALLPriority = () => {
  return async (dispatch: AppDispatch) => {
    let result = await apiGetAllPriority();
    let listPriority = result.data.content;
    const action = getPriority(listPriority);
    dispatch(action);
  };
};

