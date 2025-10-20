
import EditPublicChat from "./EditPublicChat";
import PublicChatInfo from "./PublicChatInfo";

export default function PublicChatMeNu ({ref , handleChatDialogChange , chatDialog , groupChatData }) {
    
    if (chatDialog === 'info') {
        return <PublicChatInfo ref={ref} handleChatDialogChange={handleChatDialogChange} groupChatData={groupChatData} />
    }

    if (chatDialog === 'admin') {
        return <EditPublicChat ref={ref} handleChatDialogChange={handleChatDialogChange} groupChatData={groupChatData} />
    }

}