import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Button } from "antd";
import { IUser } from "../../types/user";
import { collection, getDocs } from "firebase/firestore";
import { COLLECTIONS, db } from "../../firebase.config";
import { Context } from "../../App";
import { UserCard } from "./components/userCard/UserCard";
import { SortButton } from "./components/sortButton/SortButton";
import { ModalForm } from "./components/modal/ModalForm";
import "./users.scss";

export const Users: FC = () => {
  const [users, setUsers] = useContext(Context);
  const [createNew, setCreateNew] = useState<boolean>(false);
  const usersCollection = collection(db, COLLECTIONS.USERS);

  const getUsersCollection = useCallback(async () => {
    const data = await getDocs(usersCollection);
    const users = data.docs
      .map((doc) => ({ ...doc.data(), id: doc.id } as IUser))
      .sort((a, b) => a.createdAt - b.createdAt);
    setUsers(users);
  }, []);

  useEffect(() => {
    !users.length && getUsersCollection();
  }, []);

  const onAddUserHandler = useCallback(() => {
    setCreateNew((prevState) => !prevState);
  }, []);

  return (
    <div className="users">
      <Button onClick={onAddUserHandler}>Add New User</Button>
      <SortButton />
      <ModalForm
        visible={createNew}
        updateUsers={getUsersCollection}
        onCancel={onAddUserHandler}
      ></ModalForm>
      {users.length === 0 ? (
        <div>No User ...</div>
      ) : (
        users.map((user) => (
          <UserCard
            key={user.id}
            updateUsers={getUsersCollection}
            user={user}
          ></UserCard>
        ))
      )}
    </div>
  );
};
