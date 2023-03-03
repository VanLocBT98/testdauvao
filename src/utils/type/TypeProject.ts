export interface CreTask {
    listUserAsign: [];
    taskName: string;
    description: string;
    statusId: string;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    projectId: number;
    typeId: number;
    priorityId: number;
  };

export interface project {
    members: {
      avatar: string;
      name: string;
      userId: number | string;
    }[];
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

export  type Member = {
    avatar: string;
    name: string;
    userId: number | string;
  };
  
 export type Category = {
    id: number | string;
    projectCategoryName: string;
  };
  
export  interface UpdProject  {
    id: number;
    projectName: string;
    creator: number;
    description: string;
    categoryId: string;
  };

export  interface UpdTask {
    listUserAsign: [];
    taskId: string;
    taskName: string;
    description: string;
    statusId: string;
    originalEstimate: number;
    timeTrackingSpent: number;
    timeTrackingRemaining: number;
    projectId: number;
    typeId: number;
    priorityId: number;
  };

  
 export interface CreProject {
    projectName: string;
    description: string;
    categoryId: number | string;
    alias: string;
  };

  export type RemoveUser = {
    projectId: number;
    userId: number;
  }