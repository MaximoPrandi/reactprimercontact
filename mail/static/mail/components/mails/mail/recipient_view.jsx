import { set_tooltip } from '../../../functions/actions.js';


export default function RecipientView({ data }) {

    tooltip = set_tooltip(`trigger-${data.name}-span`, `tooltip-${data.name}-span`)

    tooltip.init()

    return (
        <span id={`trigger-${data.name}-span`} data-tooltip-placement="bottom">
            {data.name}
            <div id={`tooltip-${data.name}-span`} role="tooltip" class="absolute transition-opacity duration-300 opacity-0 z-10 invisible inline-block px-2 py-1 text-xs font-medium text-white bg-gray-600 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                {data.mail}
            </div>
        </span>
    );
}