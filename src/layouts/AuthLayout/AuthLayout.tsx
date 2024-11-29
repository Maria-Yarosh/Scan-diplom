import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { Button, EButtonSize, EButtonStyle, EButtonType, Header } from "../../components";

import style from "./AuthLayout.module.scss";
import { Footer } from "../../components/Footer/Footer";

export const AuthLayout: FC<PropsWithChildren> = (props) => {
  console.log("AuthLayout render");

  return (
    <div>
      <div className={style.auth_layout}>
        <Header
          headerContent={
            <div className={style.header_login}>
              <Button text={"Зарегистрироваться"} size={EButtonSize.large} variant={EButtonStyle.link} />
              <div className={style.line}></div>
              <Button
                text={"Войти"}
                size={EButtonSize.small}
                variant={EButtonStyle.filled}
                type={EButtonType.secondary}
              />
            </div>
          }
        />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
