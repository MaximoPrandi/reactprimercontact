export default function AnswerView({ data }) {

    if (data.sender != document.getElementById('user-email').innerHTML) {
        return (
            <div class="p-2"><button class="btn btn-sm btn-outline-primary" id="compose-answer" data-answer={JSON.stringify(data.element)}>Answer</button></div>
        );
    } else {
        return null;
    }
}