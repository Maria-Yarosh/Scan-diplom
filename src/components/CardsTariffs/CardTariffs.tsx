import classNames from "classnames";
import { Button, EButtonType } from "..";
import style from "../CardsTariffs/CardTariffs.module.scss";

const dataCard = [
  {
    id: "beginer",
    title: "Beginner",
    header: "Для небольшого исследования",
    imageSrc: "src/assets/mainPage/beginner.png",
    salePrice: 799,
    fullPrice: 1200,
    descriptionPrice: `или 279 ₽/мес. при рассрочке на 24 мес.`,
    tariffIncluded: ["Безлимитная история запросов", "Безопасная сделка", "Поддержка 24/7"],
    status: "beginner",
    currentTariff: true,
  },
  {
    title: "Pro",
    header: "Для HR и фрилансеров",
    imageSrc: "src/assets/mainPage/pro.png",
    salePrice: 1299,
    fullPrice: 2600,
    descriptionPrice: "или 279 ₽/мес. при рассрочке на 24 мес.",
    tariffIncluded: ["Все пункты тарифа Beginner", "Экспорт истории", "Рекомендации по приоритетам"],
    status: "pro",
  },
  {
    title: "Business",
    header: "Для корпоративных клиентов",
    imageSrc: "src/assets/mainPage/business.png",
    salePrice: 2379,
    fullPrice: 3700,
    descriptionPrice: "",
    tariffIncluded: ["Все пункты тарифа Pro", "Безлимитное количество запросов", "Приоритетная поддержка"],
    status: "business",
  },
];

enum ETariffStatus {
  beginner = "beginner",
  pro = "pro",
  business = "business",
}

const btnText: Record<string, string> = {
  [ETariffStatus.beginner]: "Перейти в личный кабинет",
  [ETariffStatus.pro]: "Подробнее",
  [ETariffStatus.business]: "Подробнее",
};

export const CardTariffs = () => {
  return (
    <div className={style.card_container}>
      {dataCard.map((item) => {
        return (
          <div
            className={classNames(style.card, {
              [style.beginner]: item.status === ETariffStatus.beginner,
              [style.pro]: item.status === ETariffStatus.pro,
              [style.business]: item.status === ETariffStatus.business,
            })}
          >
            <div className={style.header}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.header}</p>
              </div>
              <img className={style.image} src={item.imageSrc} />
            </div>
            <div className={style.card_description}>
              <div className={style.card_top}>
                <h3>
                  {item.salePrice} ₽ <s>{item.fullPrice} ₽</s>
                </h3>
                {item.currentTariff && <span>Текущий тариф</span>}
              </div>
              <p>{item.descriptionPrice}</p>
              <div>
                <p>В тариф входит:</p>
                {item.tariffIncluded.map((description) => {
                  return (
                    <div className={style.check}>
                      <img className={style.check_mark} src="src/assets/mainPage/check-mark.png" />
                      <p>{description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={style.action}>
              <Button text={btnText[item.status]} type={EButtonType.primary} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
