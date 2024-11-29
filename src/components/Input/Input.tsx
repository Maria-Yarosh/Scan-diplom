import { ChangeEvent, FC } from "react";
import classNames from "classnames";

import style from "./Input.module.scss";

export enum EInputSize {
  large,
  medium, //default
  small,
}

export enum EInputType {
  text, //default
  password,
  number,
}

interface IInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  size?: EInputSize;
  maxNumber?: number;
  minNumber?: number;
  disabled?: boolean;
  error?: string | null;
  pending?: boolean;
  type?: EInputType;
  className?: string;
  label?: string;
}

export const Input: FC<IInputProps> = (props) => {
  const {
    value,
    size = EInputSize.medium,
    maxNumber,
    minNumber,
    disabled,
    error,
    pending,
    onChange,
    id,
    type = EInputType.text,
    className,
    label,
  } = props;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const formatInputType = (type: EInputType): string => {
    switch (type) {
      case EInputType.text:
        return "text";
      case EInputType.password:
        return "password";
      case EInputType.number:
        return "number";
      default:
        return "text";
    }
  };

  const inputClasses = classNames(
    style.input,
    {
      [style.large]: size === EInputSize.large,
      [style.medium]: size === EInputSize.medium,
      [style.small]: size === EInputSize.small,
      [style.disabled]: disabled,
      [style.error]: error,
    },
    className
  );

  return (
    <div className={inputClasses}>
      <label htmlFor={id}>{label}</label>
      <input className={style.field} name={id} value={value} onChange={handleChange} type={formatInputType(type)} />
      {error && <span className={style.error_text}>{error}</span>}
    </div>
  );
};
