import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import "./header.scss";

export const Header: FC = () => {
  const navigate = useNavigate();
  const goToMain = useCallback(() => {
    navigate(PATH.MAIN);
  }, []);
  return (
    <header onClick={goToMain}>
      <p className="text">Firebase Test</p>
    </header>
  );
};
