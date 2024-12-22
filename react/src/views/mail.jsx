import MailView from '../components/mails/mail_view.jsx';

export default function Mail({ data, loadAnswer }) {
    if (data.active === true) {
        return (
            <div className="grid grid-flow-row auto-rows-max">
                <MailView data={data.element} loadAnswer={loadAnswer} />
            </div>
        );
    } else {
        return null
    }
}