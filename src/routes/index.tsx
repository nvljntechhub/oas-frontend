import { useRoutes } from "react-router";
import authenticationRoutes from "./AuthenticationRoutes";
import adminRoutes from "./AdminRoutes";

export default function AllRoutes() {
  return useRoutes([...authenticationRoutes, ...adminRoutes]);
}
