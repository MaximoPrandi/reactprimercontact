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
    fetch('/emails', {
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
    const response = await fetch(`/emails/${mailbox}`);
  
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  
    return await response.json();
}
  
export async function return_mail(id) {
    const response = await fetch(`/emails/${id}`);

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
}