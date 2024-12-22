import Compose from './views/compose.jsx';
import Mail from './views/mail.jsx';
import Mails from './views/mails.jsx';


function App() {
    const [state, setState] = React.useState({
        activeComponent: 0,
        user_email: document.querySelector('#user-email').innerHTML, // This is wrong by all means, but i should need a way in the API to retrieve user info. (I didn't put one because of the requeriment of only do html/css/js)
        mailbox: "Inbox",
        mail: null,
        answerMail: null
    } );

    const loadMail = (id) => {
        setState({...state, activeComponent: 2, mail: id})
    }

    const loadMails = () => {
        setState({...state, activeComponent: 0, mailbox: "Sent"})
    }

    const loadAnswer = (data) => {
        setState({...state, activeComponent: 1, answerMail: data})
    }

   return (
    <div>
        <div class="p-2">
            <h2 class="text-3xl font-medium p-2" >{state.user_email}</h2>

            <nav>
                <button class="btn btn-sm btn-outline-primary" onClick={setState({...state, activeComponent: 0, mailbox: "Inbox"})}>Inbox</button>
                <button class="btn btn-sm btn-outline-primary" onClick={setState({...state, activeComponent: 1, answerMail: null})}>Compose</button>
                <button class="btn btn-sm btn-outline-primary" onClick={setState({...state, activeComponent: 0, mailbox: "Sent"})}>Sent</button>
                <button class="btn btn-sm btn-outline-primary" onClick={setState({...state, activeComponent: 0, mailbox: "Archived"})}>Archived</button>
                <a class="btn btn-sm btn-outline-primary" href="{% url 'logout' %}">Log Out</a>
            </nav>
        </div>
        <hr class="my-2"></hr>

        <div id="panel">
            <Compose loadMails={loadMails} data={ { active: (state.activeComponent === 1), data: state.answerMail } } />

            <Mail loadAnswer={loadAnswer} data={ { active: (state.activeComponent === 2), mail: state.mail } } />

            <Mails loadMail={loadMail} data={ { active: (state.activeComponent === 0), mailbox: state.mailbox } } />
        </div>
    </div>
   );
}

ReactDOM.render(<App />, document.querySelector('#app'))