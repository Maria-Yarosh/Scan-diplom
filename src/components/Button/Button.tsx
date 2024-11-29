import { FC, MouseEventHandler } from "react";
import classNames from "classnames";
import style from "./Button.module.scss";
import { Loader } from "../index";

export enum EButtonSize {
  large,
  medium,
  small,
}

export enum EButtonStyle {
  filled,
  link,
  linkBorder,
}

export enum EButtonType {
  primary,
  secondary,
}

interface IButtonProps {
  text: string;
  size?: EButtonSize;
  isWaiting?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: EButtonStyle;
  fullWidth?: boolean;
  type?: EButtonType;
}

export const Button: FC<IButtonProps> = (props) => {
  const { size = EButtonSize.medium, text, disabled, variant, className, fullWidth, type, onClick, isWaiting } = props;
  const btnClasses = classNames(
    style.button,
    {
      [style.large]: size === EButtonSize.large,
      [style.medium]: size === EButtonSize.medium,
      [style.small]: size === EButtonSize.small,
      [style.disabled]: disabled,
      [style.filled]: variant === EButtonStyle.filled,
      [style.link]: variant === EButtonStyle.link,
      [style.linkBorder]: variant === EButtonStyle.linkBorder,
      [style.full_width]: fullWidth,
      [style.primary]: type === EButtonType.primary,
      [style.secondary]: type === EButtonType.secondary,
    },
    className
  );
  return (
    <button className={btnClasses} onClick={onClick}>
      {isWaiting ? <Loader /> : text}
    </button>
  );
};
