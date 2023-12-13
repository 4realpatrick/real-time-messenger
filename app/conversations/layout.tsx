import getConversations from "../actions/get-conversation";
import getUsers from "../actions/get-users";
import Sidebar from "../components/sidebar/side-bar";
import ConversationList from "./components/conversation-list";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users!} />
        {children}
      </div>
    </Sidebar>
  );
}
