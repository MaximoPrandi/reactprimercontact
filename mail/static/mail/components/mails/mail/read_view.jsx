import { set_tooltip } from '../../../functions/actions.js';


export default function ReadView({ data }) {
    const [state, setState] = React.useState({
        mail_id: data.id,
        is_read: data.is_read,
        tooltip_id: data.tooltip_id,
        tooltip: null
    } );

    function updateRead() {
        setState({
            ...state,
            is_read: !state.is_read
        });

        fetch(`/emails/${state.mail_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                read: state.is_read
            })
        })
        .catch(error => {
            console.log(error);
        });

        state.tooltip.init()
    }

    function set_tooltip_read() {
        const tooltip_var = set_tooltip(`trigger-${state.tooltip_id}-re`, `tooltip-${state.tooltip_id}-re`)
        tooltip_var.init()

        setState({
            ...state,
            tooltip: tooltip_var
        });
    }

    set_tooltip_read()

    return (
    <button onClick={updateRead} id={`trigger-${state.tooltip_id}-re`} data-tooltip-placement="bottom" class="rounded-full w-8 h-8 hover:bg-gray-200 hover:text-slate-500">
        {state.is_read ? '<i class="fa-solid fa-envelope-open"></i>' : '<i class="fa-solid fa-envelope"></i>'}
        <div id={`tooltip-${state.tooltip_id}-re`} role="tooltip" class="absolute transition-opacity duration-300 opacity-0 z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white bg-gray-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        {state.is_read ? 'Mark as unread' : 'Mark as read'}
        </div>
    </button>
    );
}