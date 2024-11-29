import { FC } from "react";
import logo from "../../assets/logo.png";
import style from "./Header.module.scss";

interface IHeaderProps {
  headerContent?: React.ReactNode;
}

export const Header: FC<IHeaderProps> = (props) => {
  const { headerContent } = props;
  return (
    <div className={style.header}>
      <a href="/" className={style.logo}>
        <img src={logo} alt="/" />
      </a>
      <ul className={style.header_list}>
        <li>Главная</li>
        <li>Тарифы</li>
        <li>FAQ</li>
      </ul>
      {headerContent}
    </div>
  );
};
