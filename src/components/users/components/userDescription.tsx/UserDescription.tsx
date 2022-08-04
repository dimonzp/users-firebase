import Meta from "antd/lib/card/Meta";
import { FC } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { IUser } from "../../../../types/user";

interface Props {
  user: IUser;
}

export const UserDescription: FC<Props> = ({ user }) => {
  return (
    <Meta
      title={user.name}
      description={
        <>
          <p>{`Country: ${user.country}`}</p>
          <p>
            Active:{" "}
            {user.isActive ? (
              <CheckOutlined style={{ color: "green" }} />
            ) : (
              <CloseOutlined style={{ color: "red" }} />
            )}
          </p>
        </>
      }
    />
  );
};
