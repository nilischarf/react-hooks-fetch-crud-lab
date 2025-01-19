import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
  }, [])

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (updatedQuestion) => {
    setQuestions(questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)))
  }

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onUpdateQuestion={updateQuestion}
          onDeleteQuestion={deleteQuestion}
        />
      )}
    </main>
  );
}

export default App;
