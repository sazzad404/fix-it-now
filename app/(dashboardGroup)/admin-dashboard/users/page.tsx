import { getUsers } from "../_action/getUsers";
import UserManagement from "./_components/UserManagement";


const UsersPage = async () => {
  const result = await getUsers();

  return (
    <UserManagement
      users={result.success ? result.data : []}
    />
  );
};

export default UsersPage;