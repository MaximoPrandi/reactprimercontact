import RecipientView from './mail/recipient_view.jsx';
import ArchiveView from './mail/archive_view.jsx';
import AnswerView from './mail/answer_view.jsx';


export default function MailView({ element }) {
    const [state, setState] = React.useState({
        mail_id: element.id,
        sender_email: element.sender,
        sender_name: element.sender.split("@")[0],
        recipients: element.recipients,
        recipients_name: element.recipients.split("@")[0],
        recipients_view: <RecipientView data={{mail: element.recipients, name: element.recipients.split("@")[0]}} />,
        timestamp: element.timestamp,
        subject: element.subject,
        body: element.body,
        is_archive: element.archive,
        archive_view: <ArchiveView data={{is_archive: element.archive, tooltip_id: "mail"}} />,
        answer_view: <AnswerView data={{ sender: element.sender, element: element}} />
   } );

    if (state.recipients.contains(",")) {
        const recipients_array = state.recipients.split(",");
        const recipients_names = recipients_array.map((recipient) => { return recipient.split("@")[0] });
        const recipients_view = recipients_array.map((mail, index) => { return { mail: mail, name: recipients_names[index] } }).map((data) => { return <RecipientView data={data} /> } )


        setState({
            ...state,
            recipients: recipients_array,
            recipients_name: recipients_names,
            recipients_view: recipients_view
        });
    }

    return (
    <div>
        <div class="text-3xl p-2 font-medium">
            {state.subject}
        </div>
        <div data-archive-status={data.is_archive ? 'archive' : 'unarchive'} id={state.mail_id}  class="relative flex items-stretch justify-between p-2">
            <div>
                <p class="text-sm"><span class="text-lg font-medium">{state.sender_name}</span> {state.sender}</p>
                <p class="text-xs">For {state.recipients_view}</p>
            </div>
            <div>
                {state.timestamp}
                {state.archive_view}
            </div>
        </div>
        <div class="p-2">
            {state.body}
        </div>
        {state.answer_view}
    </div>
    );
}