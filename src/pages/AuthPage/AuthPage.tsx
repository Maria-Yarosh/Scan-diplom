import { AuthForm } from "./AuthForm/AuthForm";
import style from "./AuthPage.module.scss";

export const AuthPage = () => {
  return (
    <div className={style.auth}>
      <div className={style.auth_left_side}>
        <h1 className={style.auth_left_side_title}>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
        <img src="src/assets/authFormPage/two_people_and_key.png" />
      </div>
      <AuthForm />
    </div>
  );
};
