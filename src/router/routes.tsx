import { Navigate, createBrowserRouter, redirect, useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts";
import { AuthPage } from "../pages";
import { EPage } from ".";
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { MainPage } from "../pages/MainPage/MainPage";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { SearchDocument } from "../pages/SearchDocument/SearchDocument";
import { getInfo } from "../redux/slices/info/infoSlice";
import { selectUserInfo } from "../redux/slices/auth/selectors";
import { initialAuthState, updateAuthState } from "../redux/slices/auth/authSlice";
import { ArticleResultPage } from "../pages/ArticleResultPage/ArticleResultPage";

interface IPrivateRouteProps {
  children: React.ReactNode;
}

export const isTokenExpired = (expireDate: string | null): boolean => {
  const now = new Date();
  let expirationDate;
  if (expireDate) {
    expirationDate = new Date(expireDate);
    return now > expirationDate;
  }
  return false;
};

export const checkExpireToken = (isExpired: boolean): boolean => {
  if (isExpired) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expire");
    return true;
  }
  return false;
};

const PrivateRoute: FC<IPrivateRouteProps> = (props) => {
  const { children } = props;
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const expireDate = localStorage.getItem("expire");
  const isExpired = isTokenExpired(expireDate);
  const userData = useAppSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isExpired && accessToken) {
      dispatch(getInfo());
    }
  }, [location.pathname, userData]);

  if (!accessToken || checkExpireToken(isExpired)) {
    dispatch(updateAuthState(initialAuthState));
    return <Navigate to={EPage.auth} />;
  }

  return <>{children}</>;
};

const AuthWrapper: FC<IPrivateRouteProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserInfo);
  //Опираемся на данные пользователя, которые возвращает бек
  useEffect(() => {
    if (userData) {
      navigate(EPage.index, { replace: true });
    }
  }, [userData]);
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: EPage.index,
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: EPage.search,
        element: <SearchDocument />,
      },
      {
        path: EPage.result,
        element: <ArticleResultPage />,
      },
    ],
  },
  {
    path: EPage.auth,
    element: (
      <AuthWrapper>
        <AuthLayout />
      </AuthWrapper>
    ),
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
    ],
  },
]);
