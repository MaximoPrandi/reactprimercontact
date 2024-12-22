import {MailForm} from '../components/mails/mail_form.jsx';

export default function Compose({ data, loadMails }) {

    if (data.active === true) {
        return (
            <div class="p-2">
                <MailForm loadMails={loadMails} data={data.data && data.data} />
            </div>
        );
    } else {
        return null
    }
}