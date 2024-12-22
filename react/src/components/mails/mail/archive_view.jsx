import { useState } from 'react'
import { set_tooltip, alternate_archive } from '../../../functions/actions.js';


function ArchiveView({ data }) {
    const [state, setState] = useState({
        mail_id: data.id,
        is_archive: data.is_archive,
        tooltip_id: data.tooltip_id,
        tooltip: set_tooltip_archive()
    } );

    function set_tooltip_archive() {
        const tooltip_var = set_tooltip(`trigger-${state.tooltip_id}-ar`, `tooltip-${state.tooltip_id}-ar`)
        tooltip_var.init()

        return tooltip_var
    }

    function updateArchive() {
        setState({
            ...state,
            is_archive: !state.is_archive
        });

        alternate_archive(state);

        state.tooltip.init();
    }
    
    return (
    <button onClick={updateArchive} id={`trigger-${state.tooltip_id}-ar`} data-tooltip-placement="bottom" className="rounded-full w-8 h-8 hover:bg-gray-200 hover:text-slate-500">
        {state.is_archive ? '<i className="fa-solid relative fa-box-open"></i>' : '<i className="fa-solid fa-box"></i>'}
        <div id={`tooltip-${state.tooltip_id}-ar`} role="tooltip" className="absolute transition-opacity duration-300 opacity-0 z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white bg-gray-600 rounded-lg shadow-sm tooltip dark:bg-gray-700">
        {state.is_archive ? 'Unarchive email' : 'Archive email'}
        </div>
    </button>
    );
}

export default ArchiveView