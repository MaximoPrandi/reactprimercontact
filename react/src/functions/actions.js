import { Tooltip } from 'flowbite';

const apiUrl = "http://localhost:7000";

export function set_tooltip(trigger, content) {
    const options = {
        placement: 'bottom',
        triggerType: 'hover',
        onHide: () => {
            console.log('tooltip is shown');
        },
        onShow: () => {
            console.log('tooltip is hidden');
        },
        onToggle: () => {
            console.log('tooltip is toggled');
        },
    };
  
    const instanceOptions = {
      id: content,
      override: true
    };
  
    return new Tooltip(document.getElementById(content), document.getElementById(trigger), options, instanceOptions);
}

export async function send_mail(data) {
    fetch(`${apiUrl}/emails`, {
        method: 'POST',
        body: JSON.stringify({
            recipients: data.destinatary,
            subject: data.subject,
            body: data.body
        })
    })
    .then(response => response.json())
    .then(() => {
        return false;
    })
    .catch(error => {
        console.log(error);
    });
}

export async function return_mails(mailbox) {
    const response = await fetch(`${apiUrl}/emails/${mailbox}`);
  
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  
    return await response.json();
}
  
export async function return_mail(id) {
    const response = await fetch(`${apiUrl}/emails/${id}`);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
}

export async function alternate_archive(state) {
    fetch(`${apiUrl}/emails/${state.mail_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            archive: state.is_archive
        })
    })
    .catch(error => {
        console.log(error);
    });
}

export async function alternate_read(state) {
    fetch(`${apiUrl}/emails/${state.mail_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            read: state.is_read
        })
    })
    .catch(error => {
        console.log(error);
    });
}

export default { return_mail, return_mails, send_mail, set_tooltip, alternate_archive, alternate_read }