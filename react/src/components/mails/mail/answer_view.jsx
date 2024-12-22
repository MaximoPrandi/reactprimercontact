function AnswerView({ data, loadAnswer }) {

    if (data.sender != document.getElementById('user-email').innerHTML) {
        return (
            <div className="p-2"><button className="btn btn-sm btn-outline-primary" id="compose-answer" onClick={loadAnswer(JSON.stringify(data.element))}>Answer</button></div>
        );
    } else {
        return null;
    }
}

export default AnswerView