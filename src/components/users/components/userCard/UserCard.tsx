import { FC, useCallback, useState } from "react";
import { Button, Popover } from "antd";
import Card from "antd/lib/card";
import { EditOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../../types/user";
import { UserDescription } from "../userDescription.tsx/UserDescription";
import { deleteDoc, doc } from "firebase/firestore";
import { COLLECTIONS, db } from "../../../../firebase.config";
import { ModalForm } from "../modal/ModalForm";

interface Props {
  updateUsers: Function;
  user: IUser;
}

export const UserCard: FC<Props> = ({ user, updateUsers }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const onDeleteHandler = useCallback(async () => {
    const userDoc = doc(db, COLLECTIONS.USERS, user.id);
    await deleteDoc(userDoc);
    updateUsers();
  }, []);

  const onUpdateHandler = useCallback(() => {
    setShowModal(false);    
  }, []);

  const showEditModal = useCallback(() => setShowModal(true), []);

  const onNavigate = useCallback(() => {
    navigate(user.id);
  }, []);

  return (
    <Card
      actions={[
        <>
          <EditOutlined onClick={showEditModal} />
          <ModalForm
            visible={showModal}
            user={user}
            onCancel={onUpdateHandler}
            updateUsers={updateUsers}
          />
        </>,
        <UserOutlined onClick={onNavigate} />,
        <Popover
          content={
            <div>
              <Button
                onClick={onDeleteHandler}
                type="primary"
                danger
                size="small"
              >
                Delete
                <DeleteOutlined />
              </Button>
            </div>
          }
          title="Delete user?"
          trigger="click"
        >
          <Button danger size="small">
            <DeleteOutlined />
          </Button>
        </Popover>,
      ]}
    >
      <UserDescription user={user} />
    </Card>
  );
};
