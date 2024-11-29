import { RootState } from "../../store";
import { IUser } from "./authSlice";

export const selectLoading = (state: RootState): boolean => state.auth.isLoading;

export const selectError = (state: RootState): string | null => state.auth.error;

export const selectUserInfo = (state: RootState): IUser | null => state.auth.userInfo;
