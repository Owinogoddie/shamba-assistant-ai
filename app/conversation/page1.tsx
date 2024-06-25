import { ChatWindow } from "@/components/ChatWindow";

export default function AgentsPage() {
  const InfoCard = (
    <div className="p-4 md:p-8 rounded bg-[#25252d] w-full max-h-[85%] overflow-hidden">
      <h1 className="text-3xl md:text-4xl mb-4">
        🎄 Your coffee assistant
      </h1>
    </div>
  );
  return (
   <div className="bg-gray-400 min-h-full">
     <div className="w-full md:max-w-5xl mx-auto">
        <ChatWindow
      endpoint="api/chat"
      emptyStateComponent={InfoCard}
      showIngestForm={true}
      placeholder={
        'Ask me anything concerning coffee, "....."'
      }
      emoji="👮‍♂️"
      titleText="Your coffee assistant at hand"
    ></ChatWindow>
    </div>
   </div>
  );
}
