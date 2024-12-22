import { set_tooltip, send_mail } from '../../functions/actions.js';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <button type="submit" disabled={pending} className="btn btn-primary m-2">
        {pending ? "Submitting..." : "Submit"}
      </button>
    );
}

function MailForm({ element, loadMails }) {

    function subjectName(element) {
        if (element.subject) {
            if (element.subject.includes("Re: ")) {
                return element.subject
            } else {
                return `Re: ${element.subject}`
            }
        } else {
            return '';
        }
    }

    tooltip = set_tooltip('trigger-compose-recipients', 'tooltip-compose-recipients');

    tooltip.init()

    return (
        <div>
            <h3 id="compose-title" className="text-xl">{element ? 'New answer' : 'New email'}</h3>
            <form id="compose-form" name="mail_submit" action={send_mail.then(() => { loadMails("Sent") })}>
                <div className="form-group">
                    From: <input disabled className="form-control" name="remitent" value={document.getElementById('user-email').innerHTML} />
                </div>
                <div className="form-group">
                    To: <input required id="trigger-compose-recipients" className="form-control" name="destinatary" value={element && `${element.recipients.replace(document.getElementById('user-email').innerHTML, element.sender)}`} />
                    <div id="tooltip-compose-recipients" role="tooltip" className="absolute transition-opacity duration-300 z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white bg-gray-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Separate just with commas all the recipients.
                    </div>
                </div>
                <div className="form-group">
                    <input required className="form-control" id="compose-subject" placeholder="Subject" name="subject" value={element && subjectName(element)} />
                </div>
                <textarea required id="compose-body" placeholder="Body" name="body" className="form-control whitespace-pre-wrap">
                    {element && `On ${element.timestamp} ${element.sender} wrote: ${element.body}`}
                </textarea>
                <SubmitButton />
            </form>
        </div>
    );
}

export default MailForm