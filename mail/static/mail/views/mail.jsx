import MailView from '../components/mails/mail_view.jsx';

export default function Mail({ data }) {
    if (data.active === true) {
        return (
            <div class="grid grid-flow-row auto-rows-max">
                <MailView data={data.element} />
            </div>
        );
    } else {
        return null
    }
}