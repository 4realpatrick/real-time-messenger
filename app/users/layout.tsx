import getUsers from "../actions/get-users";
import Sidebar from "../components/sidebar/side-bar";
import UserList from "./components/user-list";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full ">
        <UserList users={users!} />
        {children}
      </div>
    </Sidebar>
  );
}
