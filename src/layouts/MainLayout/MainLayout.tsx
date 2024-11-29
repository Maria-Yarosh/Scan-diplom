import { Outlet } from "react-router-dom";
import { Header } from "../../components";

import style from "./MainLayout.module.scss";
import { useAppSelector } from "../../redux/hooks/hooks";
import { selectCompanyLimit, selectLoading, selectUsedCompanyCount } from "../../redux/slices/info/selectors";
import { Footer } from "../../components/Footer/Footer";
import { LoaderWrapper } from "../../components/LoaderWrapper/LoaderWrapper";
import { selectUserInfo } from "../../redux/slices/info/selectors";

export const MainLayout = () => {
  const isLoading = useAppSelector(selectLoading);
  const companyLimit = useAppSelector(selectCompanyLimit);
  const usedCompanyCount = useAppSelector(selectUsedCompanyCount);
  const userInfo = useAppSelector(selectUserInfo);

  if (isLoading) {
    return <LoaderWrapper />;
  }

  const renderAuthHeaderContent = () => {
    return (
      <div className={style.wrapper}>
        <div className={style.header}>
          <p className={style.header_text}>
            Использовано компаний <span className={style.header_text_limit}>{companyLimit}</span>
          </p>
          <p className={style.header_text}>
            Лимит по компаниям <span className={style.header_text_count}>{usedCompanyCount}</span>
          </p>
        </div>
        <div className={style.user_info}>
          <div className={style.user_info_text}>
            <div>{userInfo?.name}</div>
            <div className={style.out_info}>выйти</div>
          </div>
          <div className={style.avatar}>
            <img
              src={
                userInfo?.avatar ||
                "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              }
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={style.main_layout}>
        <Header headerContent={renderAuthHeaderContent()} />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

