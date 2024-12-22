import { useState } from 'react'
import ArchiveView from './mail/archive_view.jsx';
import ReadView from './mail/read_view.jsx';
import SenderView from './mail/sender_view.jsx';


function MailRow({ element, loadMail }) {
    const [state] = useState({
        mail_id: element.id,
        sender: element.sender,
        sender_name: element.sender.split("@")[0],
        sender_view: <SenderView data={{mail: element.sender, name: element.sender.split("@")[0]}} />,
        timestamp: `${element.timestamp.split(" ")[1]} ${element.timestamp.split(" ")[0]}`,
        subject: element.subject,
        body: element.body,
        archive_view: <ArchiveView data={{is_archive: element.archive, tooltip_id: element.id}} />,
        read_view: <ReadView data={{is_read: element.read, tooltip_id: element.id}} />
   } );

    return(
        <div data-archive-status={state.is_archive ? 'archived' : 'unarchived'} data-read-status={state.is_read ? 'read' : 'unread'} id={state.mail_id} className="relative flex items-stretch justify-between bg-gray-50 h-10 content-center group hover:shadow-inner hover:drop-shadow hover:z-10">
            <div className="pl-2 content-center">
                <button className="w-48">
                    <p className="text-start">{state.sender_view}</p>
                </button>
                <a id={`get-email-${state.mail_id}`} onClick={loadMail(state.mail_id)} className="hover:no-underline hover:text-black">
                    {state.subject}
                </a>
            </div>
            <div className="pr-2 content-center">
                <p className="group-hover:hidden">{state.timestamp}</p>
                {state.read_view}
                {state.archive_view}
            </div>
        </div>
    );
}

export default MailRow