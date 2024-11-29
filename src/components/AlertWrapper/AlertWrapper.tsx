import { AlertTitle } from "@mui/material";
import Alert from "@mui/material/Alert";
import ReactDOM from "react-dom";

import style from "./AlertWrapper.module.scss";

interface IAlertWrapper {
  text: string;
  handleAlertClose: () => void;
  type: EAlertType;
  title: string;
  className?: string;
}
export enum EAlertType {
  error = "error",
}

export const AlertWrapper: React.FC<IAlertWrapper> = (props) => {
  const { text, handleAlertClose, type, title } = props;
  return ReactDOM.createPortal(
    <div className={style.wrapper}>
      <Alert severity={type} onClose={handleAlertClose}>
        <AlertTitle>{title}</AlertTitle>
        {text}
      </Alert>
    </div>,
    document.body
  );
};
