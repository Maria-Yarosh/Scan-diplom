import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../../api/config";
import { AuthApi } from "../../../api/auth/auth";

export interface IUser {
  name: string;
  avatar: string;
  id: string;
}

interface IAuthSlice {
  isLoading: boolean;
  error: string | null;
  userInfo: IUser | null;
}

interface ILoginCredentials {
  login: string;
  password: string;
}

interface ILoginResponse {}

//Поменялось, что не сохраняем токен в редаксе
export const login = createAsyncThunk<void, ILoginCredentials, { rejectValue: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { expire, accessToken } = await AuthApi.getAuthCredentials(credentials);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("expire", expire);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Ошибка авторизации");
      }
      return rejectWithValue("Ошибка авторизации");
    }
  }
);

export const initialAuthState: IAuthSlice = {
  isLoading: false,
  error: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    updateAuthState: (state, action: PayloadAction<Partial<IAuthSlice>>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.userInfo = {
          name: "Алексей А.",
          avatar: "",
          id: "user_id",
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

const { actions, reducer } = authSlice;
export const { updateAuthState } = actions;
export const authReducer = reducer;
