import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Button, Image } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../../App";
import { PATH } from "../../../../routes/path";
import { IUser } from "../../../../types/user";
import { UserDescription } from "../userDescription.tsx/UserDescription";
import "./user.scss";

export const UserPage: FC = () => {
  const [users] = useContext(Context);
  const [user, setUser] = useState<IUser>({} as IUser);
  const navigate = useNavigate();
  const params = useParams();

  const onUsersBack = useCallback(() => {
    navigate(PATH.USERS);
  }, []);

  useEffect(() => {
    const currentUser = users.find((user) => user.id === params.userId);
    if (currentUser) {
      setUser(currentUser);
    } else {
      onUsersBack();
    }
  }, []);
  return (
    <div className="user">
      <Button onClick={onUsersBack} icon={<RollbackOutlined />}>
        Back
      </Button>
      <div>
        <Image placeholder src="https://joeschmoe.io/api/v1/random" />
        <UserDescription user={user} />
      </div>
    </div>
  );
};
