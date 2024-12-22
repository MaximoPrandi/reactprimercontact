import { set_tooltip, send_mail } from '../../functions/actions.js';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <button type="submit" disabled={pending} class="btn btn-primary m-2">
        {pending ? "Submitting..." : "Submit"}
      </button>
    );
}

export default function MailForm({ element, loadMails }) {

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
            <h3 id="compose-title" class="text-xl">{element ? 'New answer' : 'New email'}</h3>
            <form id="compose-form" name="mail_submit" action={send_mail.then(() => { loadMails() })}>
                <div class="form-group">
                    From: <input disabled class="form-control" name="remitent" value={document.getElementById('user-email').innerHTML} />
                </div>
                <div class="form-group">
                    To: <input required id="trigger-compose-recipients" class="form-control" name="destinatary" value={element && `${element.recipients.replace(document.getElementById('user-email').innerHTML, element.sender)}`} />
                    <div id="tooltip-compose-recipients" role="tooltip" class="absolute transition-opacity duration-300 opacity-0 z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white bg-gray-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                        Separate just with commas all the recipients.
                    </div>
                </div>
                <div class="form-group">
                    <input required class="form-control" id="compose-subject" placeholder="Subject" name="subject" value={element && subjectName(element)} />
                </div>
                <textarea required id="compose-body" placeholder="Body" name="body" class="form-control whitespace-pre-wrap">
                    {element && `On ${element.timestamp} ${element.sender} wrote: ${element.body}`}
                </textarea>
                <SubmitButton />
            </form>
        </div>
    );
}