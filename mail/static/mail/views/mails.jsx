import {MailRow} from '../components/mails/mail_row.jsx';
import {return_mails} from '../functions/actions.js';


export default function Mails({ data, loadMail }) {
    if (data.active === true) {
        return_mails(data.mailbox).then((elements) => {
            let mails_rows = elements.map((element) => { return <MailRow element={element} loadMail={loadMail} /> })

            return (
                <div class="grid grid-flow-row auto-rows-max">
                    {mails_rows}
                </div>
            );
        })
    } else {
        return null
    }
}