import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../../api/config";
import { IUser } from "../auth/authSlice";

interface IInfoSlice {
  usedCompanyCount: number | null;
  companyLimit: number | null;
  isLoading: boolean;
  error: string | null;
  userInfo: IUser | null;
}

interface IInfoResponse {
  eventFiltersInfo: {
    usedCompanyCount: number;
    companyLimit: number;
  };
}

export const getInfo = createAsyncThunk<IInfoResponse, void, { rejectValue: string }>(
  "info/user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/v1/account/info");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || "Ошибка авторизации");
      }
      return rejectWithValue("Ошибка авторизации");
    }
  }
);

const initialState: IInfoSlice = {
  usedCompanyCount: null,
  companyLimit: null,
  isLoading: false,
  error: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<IInfoSlice>>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getInfo.fulfilled, (state, action: PayloadAction<IInfoResponse>) => {
        state.isLoading = false;
        state.companyLimit = action.payload.eventFiltersInfo.companyLimit;
        state.usedCompanyCount = action.payload.eventFiltersInfo.usedCompanyCount;
        state.userInfo = {
          name: "Алексей А.",
          avatar: "",
          id: "user_id",
        };
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

const { reducer } = authSlice;
export const infoReducer = reducer;
