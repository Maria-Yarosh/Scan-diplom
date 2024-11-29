import { FC } from "react";
import logo from "../../assets/logo_footer.png";
import style from '../Footer/Footer.module.scss'


interface IFooterProps {
    footerContent?: React.ReactNode;
  }
  
  export const Footer: FC<IFooterProps> = (props) => {
    const { footerContent } = props;
    return (
      <div className={style.footer}>
        <a href="/" className={style.logo}>
          <img src={logo} alt="/" />
        </a>
        <div className={style.foter_info}>
        г. Москва, Цветной б-р, 40 
        +7 495 771 21 11
        info@skan.ru
        <br />
        <br />
        Copyright. 2022
        </div>
        {footerContent}
      </div>
    );
  };