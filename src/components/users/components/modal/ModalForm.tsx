import { Modal } from "antd";
import { FC } from "react";
import { IUser } from "../../../../types/user";
import { UserForm } from "../userForm/UserForm";

interface Props {
  visible: boolean;
  onCancel: any;
  updateUsers?: Function;
  user?: IUser;
}

export const ModalForm: FC<Props> = ({
  visible,
  onCancel,
  updateUsers,
  user,
}) => {
  return (
    <Modal visible={visible} footer={false} onCancel={onCancel}>
      <UserForm user={user} onClose={onCancel} updateUsers={updateUsers} />
    </Modal>
  );
};
