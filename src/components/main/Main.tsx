import { Button } from "antd";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import "./main.scss";

export const Main: FC = () => {
  const navigate = useNavigate();
  const onClickHandler = useCallback(() => {
    navigate(PATH.USERS);
  }, []);
  return (
    <div className="main">
      <p>This is another Firebase App for Test</p>
      <Button type="primary" onClick={onClickHandler}>
        Go to Users
      </Button>
    </div>
  );
};
