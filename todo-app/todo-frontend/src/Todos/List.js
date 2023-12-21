import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => (
    <>
      {todos.map((todo, i) => {
        return (
          <div key={i}>
            <br />
            <Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} key={todo.id} />
            <hr />
          </div>
        )
      })}
    </>
)

export default TodoList
