import { RootState } from "../../store";
import { IUser } from "../auth/authSlice";

export const selectLoading = (state: RootState): boolean => state.info.isLoading;

export const selectCompanyLimit = (state: RootState): number | null => state.info.companyLimit;

export const selectUsedCompanyCount = (state: RootState): number | null => state.info.usedCompanyCount;

export const selectUserInfo = (state: RootState): IUser | null => state.info.userInfo;
