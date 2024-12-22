

function load_mailbox(mailbox) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3 class="pl-2 content-center text-xl">${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Set the actual mailbox into the element
  document.querySelector('#emails-view').dataset.actualMailbox = mailbox;

  return_mails(mailbox).then((response) => {
    response.forEach(element => {
      document.querySelector('#emails-view').append(mail_row_component(element));

      if (element.sender != document.getElementById('user-email').innerHTML) {
        document.getElementById(`${element.id}-re`).addEventListener('click', (element) => alternate_read(element.currentTarget.parentElement.parentElement).then(() => load_mailbox(document.querySelector('#emails-view').dataset.actualMailbox)));
      }
      document.getElementById(`${element.id}-ar`).addEventListener('click', (element) => alternate_archive(element.currentTarget.parentElement.parentElement).then(() => load_mailbox(document.querySelector('#emails-view').dataset.actualMailbox)));

      document.getElementById(`get-email-${element.id}`).addEventListener('click', (element) => load_mail(element.currentTarget.parentElement.parentElement.id) );

      set_tooltip(`${element.id}-re`, `tooltip-content-${element.id}-re`);
      set_tooltip(`${element.id}-ar`, `tooltip-content-${element.id}-ar`);
    });
  });
}

function load_mail(id) {
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';

  return_mail(id).then((element) => {
    document.querySelector('#email-view').innerHTML = `<h1 class="pl-2 content-center text-2xl">${element.subject}</h3>`;

    document.querySelector('#email-view').append(mail_component(element));

    document.getElementById(`single-${element.id}-ar`).addEventListener('click', (element) => alternate_archive(element.currentTarget.parentElement.parentElement));

    document.getElementById(`compose-answer`).addEventListener('click', (element) => answer_email(JSON.parse(element.currentTarget.dataset.answer)));

    set_tooltip(`single-${element.id}-ar`, `single-tooltip-content-${element.id}-ar`);

    fetch(`/emails/${element.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        read: true
      })
    })
    .catch(error => {
      console.log(error);
    });
  });
}