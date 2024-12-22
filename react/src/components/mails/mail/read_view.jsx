import { useState } from 'react'
import { set_tooltip, alternate_read } from '../../../functions/actions.js';


function ReadView({ data }) {
    const [state, setState] = useState({
        mail_id: data.id,
        is_read: data.is_read,
        tooltip_id: data.tooltip_id,
        tooltip: set_tooltip_read()
    } );

    function updateRead() {
        setState({
            ...state,
            is_read: !state.is_read
        });

        alternate_read(state);

        state.tooltip.init();
    }

    function set_tooltip_read() {
        const tooltip_var = set_tooltip(`trigger-${state.tooltip_id}-re`, `tooltip-${state.tooltip_id}-re`)
        tooltip_var.init()


        return tooltip_var
    }

    return (
    <button onClick={updateRead} id={`trigger-${state.tooltip_id}-re`} data-tooltip-placement="bottom" className="rounded-full w-8 h-8 hover:bg-gray-200 hover:text-slate-500">
        {state.is_read ? '<i className="fa-solid fa-envelope-open"></i>' : '<i className="fa-solid fa-envelope"></i>'}
        <div id={`tooltip-${state.tooltip_id}-re`} role="tooltip" className="absolute transition-opacity duration-300 z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white bg-gray-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        {state.is_read ? 'Mark as unread' : 'Mark as read'}
        </div>
    </button>
    );
}

export default ReadView