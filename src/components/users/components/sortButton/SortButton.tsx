import { Button } from "antd";
import { FC, useContext, useState } from "react";
import { Context } from "../../../../App";

export const SortButton: FC = () => {
  const [users, setUsers] = useContext(Context);
  const [sorted, setSorted] = useState(false);
  const onSort = () => {
    if (sorted) {
      setUsers(users.sort((a, b) => a.createdAt - b.createdAt).concat());
    } else {
      setUsers(users.sort((a, b) => (a.name > b.name ? 1 : -1)).concat());
    }
    setSorted((prevSort) => !prevSort);
  };
  return (
    <Button type={sorted ? "primary" : "default"} onClick={onSort}>
      Sort by name
    </Button>
  );
};
