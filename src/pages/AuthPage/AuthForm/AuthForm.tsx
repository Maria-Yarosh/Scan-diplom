import { ChangeEvent, useState } from "react";
import { Button, EButtonSize, EButtonStyle, EButtonType, Input } from "../../../components";
import { EInputSize, EInputType } from "../../../components/Input/Input";
import LockImage from "../../../assets/authFormPage/lock.png";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { updateAuthState, login } from "../../../redux/slices/auth/authSlice";
import { selectError, selectLoading } from "../../../redux/slices/auth/selectors";

import style from "./AuthForm.module.scss";

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const authLoading = useAppSelector(selectLoading);
  const authError = useAppSelector(selectError);

  const [authForm, setAuthForm] = useState({
    login: "sf_student3",
    password: "6z9ZFRs",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthForm((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    if (authError) {
      dispatch(updateAuthState({ error: null }));
    }
  };

  const setFormData = () => {
    dispatch(login(authForm));
  };

  return (
    <div className={style.form}>
      <div className={style.image}>
        <img src={LockImage} />
      </div>
      <div className={style.action}>
        <Button text={"Войти"} variant={EButtonStyle.linkBorder} />
        <Button text={"Зарегистрироваться"} variant={EButtonStyle.linkBorder} />
      </div>
      <Input
        label="Логин или номер телефона:"
        value={authForm.login}
        id={"login"}
        size={EInputSize.large}
        onChange={handleChange}
        className={style.form_input}
        error={authError}
      />
      <Input
        value={authForm.password}
        id={"password"}
        type={EInputType.password}
        size={EInputSize.large}
        onChange={handleChange}
        label="Пароль: "
        error={authError}
      />

      <Button
        className={style.btn_login}
        text={"Войти"}
        onClick={setFormData}
        variant={EButtonStyle.filled}
        type={EButtonType.primary}
        isWaiting={authLoading}
        disabled={!!authError}
        fullWidth
      />
      <Button
        className={style.btn_restore}
        text={"Восстановить пароль"}
        size={EButtonSize.large}
        variant={EButtonStyle.link}
      />
      <p>Войти через:</p>
      <div className={style.media_container}>
        <img src="src/assets/google_btn.png"></img>
        <img src="src/assets/facebook_btn.png"></img>
        <img src="src/assets/yandex_btn.png"></img>
      </div>
    </div>
  );
};
