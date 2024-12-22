import { set_tooltip } from '../../../functions/actions.js';


export default function ArchiveView({ data }) {
    const [state, setState] = React.useState({
        mail_id: data.id,
        is_archive: data.is_archive,
        tooltip_id: data.tooltip_id,
        tooltip: null
    } );

    function updateArchive() {
        setState({
            ...state,
            is_archive: !state.is_archive
        });

        fetch(`/emails/${state.mail_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                archive: state.is_archive
            })
        })
        .catch(error => {
            console.log(error);
        });

        state.tooltip.init()
    }

    function set_tooltip_archive() {
        const toltip_var = set_tooltip(`trigger-${state.tooltip_id}-ar`, `tooltip-${state.tooltip_id}-ar`)
        toltip_var.init()

        setState({
            ...state,
            tooltip: toltip_var
        });
    }

    set_tooltip_archive()
    
    return (
    <button onClick={updateArchive} id={`trigger-${state.tooltip_id}-ar`} data-tooltip-placement="bottom" class="rounded-full w-8 h-8 hover:bg-gray-200 hover:text-slate-500">
        {state.is_archive ? '<i class="fa-solid relative fa-box-open"></i>' : '<i class="fa-solid fa-box"></i>'}
        <div id={`tooltip-${state.tooltip_id}-ar`} role="tooltip" class="absolute transition-opacity duration-300 opacity-0 z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white bg-gray-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        {state.is_archive ? 'Unarchive email' : 'Archive email'}
        </div>
    </button>
    );
}