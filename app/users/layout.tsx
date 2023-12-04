import Sidebar from "../components/sidebar/side-bar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="h-full ">{children}</div>
    </Sidebar>
  );
}
