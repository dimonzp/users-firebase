import { Form, Input, Button, Checkbox } from "antd";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FC, useEffect } from "react";
import { COLLECTIONS, db } from "../../../../firebase.config";
import { IUser } from "../../../../types/user";
import "./user-form.scss";

interface Props {
  user?: IUser;
  onClose: Function;
  updateUsers?: Function;
}

export const UserForm: FC<Props> = ({ user, onClose, updateUsers }) => {
  const [form] = Form.useForm();
  const usersCollection = collection(db, COLLECTIONS.USERS);

  const onFinish = async (newUser: IUser) => {
    const sendRequest: boolean = JSON.stringify(newUser) !== JSON.stringify(user);
    if (user && sendRequest) {
      const userDoc = doc(db, COLLECTIONS.USERS, user.id);
      await updateDoc(userDoc, newUser as { [key: string]: any });
    } else {
      await addDoc(usersCollection, { ...newUser, createdAt: +new Date() });
    }
    onClose();
    form.resetFields();

    updateUsers && sendRequest && updateUsers();
  };

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  return (
    <div className="create-new-box">
      <h1>{user ? "Update" : "Create New"}</h1>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please input users name!" },
            { min: 2, message: "Length must be longer than 2 chars" },
            { max: 100, message: "Length must be shoter than 100 chars" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Please input users country!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="isActive" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {user ? "Edit" : "Create New"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
