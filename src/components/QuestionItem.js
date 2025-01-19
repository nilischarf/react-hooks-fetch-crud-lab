import React from "react";

function QuestionItem({ question, onUpdateQuestion, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" }).then(() =>
      onDeleteQuestion(id)
    );
  };

  const handleCorrectAnswerChange = (event) => {
    const updatedQuestion = { ...question, correctIndex: parseInt(event.target.value, 10) };

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
      .then((response) => response.json())
      .then(onUpdateQuestion)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleCorrectAnswerChange}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
