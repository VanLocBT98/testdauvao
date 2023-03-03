import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiGetAllUser } from "../../utils/api/userApi";
import { getStoreJSON, http, USER_LOGIN } from "../../utils/setting";
import { user, userLogin } from "../../utils/type/typeUser";
import { AppDispatch } from "../configStore";

export interface userState {
  userLogin: userLogin | any;
  userAll:user[];
  userInTask:user[]
}

const initialState: userState = {
  userLogin: getStoreJSON(USER_LOGIN) || null,
  userAll:[],
  userInTask:[]
};

const userAdminReducer = createSlice({
  name: "userAdminReducer",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<user>) => {
      state.userLogin = action.payload;
    },
    getAllUser:(state,action:PayloadAction<user[]>)=>{
      state.userAll= action.payload
    },
    getUserInTask:(state,action :PayloadAction<user[]>)=>{
       
    }
  },
});

export const {getAllUser,getUser
} = userAdminReducer.actions;

export default userAdminReducer.reducer;

//-------action api------------


export const getAllUserApi=()=>{
   return async(dispatch: AppDispatch)=>{
    let result = await apiGetAllUser();
    let listUser = result.data.content;
    // console.log(listUser)
    const action = getAllUser(listUser);
    dispatch(action);
   }
}