import { useNavigate } from "react-router";
import { Button, EButtonStyle, EButtonType } from "../../components";
import { EPage } from "../../router";
import style from "../MainPage/MainPage.module.scss";
import { Slider } from "../../components/Slider/Slider";
import { CardTariffs } from "../../components/CardsTariffs/CardTariffs";


export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={style.first_block}>
        <div>
          <h1 className={style.main_header}>сервис по поиску публикаций о компании по его ИНН</h1>
          <p>
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </p>
          <Button
            onClick={() => navigate(EPage.search)}
            text="Запросить данные"
            variant={EButtonStyle.filled}
            type={EButtonType.primary}
          />
        </div>
        <img src="src/assets/mainPage/2398 1.png" />
      </div>
      <div className={style.second_block}>
        <h2 className={style.header}>почему именно мы</h2>
        <div className={style.slider}>
        {/* <img src="src/assets/mainPage/leftSlider.png" /> */}
          <Slider />
          {/* <img src="src/assets/mainPage/rightSlider.png" /> */}
        </div>
      </div>
      <div className={style.third_block}>
        <img src="src/assets/mainPage/Group 14.png" />
      </div>
      <div className={style.fourth_block}>
        <h2 className={style.header}>наши тарифы</h2>
        <div className={style.card_conteiner}>
          <CardTariffs />
        </div>
      </div>
    </div>
  );
};
