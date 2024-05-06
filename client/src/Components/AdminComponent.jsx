import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function AdminComponent({ children }) {
  const authUser = useAuthUser();
  const role = authUser?.role;

  if (!role) {
    return null;
  }

  return role.toString() === "admin" ? children : null;
}

export default AdminComponent;
