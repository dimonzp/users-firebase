import { UserPage } from "./../components/users/components/userPage/UserPage";
import { Users } from "../components/users/Users";
import { Main } from "../components/main/Main";
import { PATH } from "./path";

export const PUBLIC_ROUTES = [
  {
    path: PATH.MAIN,
    element: Main,
  },
  {
    path: PATH.USERS,
    element: Users,
  },
  {
    path: PATH.USER_PAGE,
    element: UserPage,
  },
];
