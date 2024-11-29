import { Backdrop, CircularProgress } from "@mui/material";
import ReactDOM from "react-dom";

export const LoaderWrapper: React.FC = () => {
    return ReactDOM.createPortal(
      <div className="loader-overlay">
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>,
      document.body
    );
}