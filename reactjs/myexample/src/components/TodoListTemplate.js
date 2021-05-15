import React from 'react';
import './TodoListTemplate.css';

const TodoListTemplate = ({todoListTemplateStyle, color, pallete, form, children}) => {
    return (
        <main className="todo-list-template">
            <div className="title" style={ todoListTemplateStyle }>
                오늘 할 일
            </div>
            <section className="color-wrapper">
                { pallete }
            </section>
            <section className="form-wrapper">
                { form }
            </section>
            <section className="todos-wrapper">
                { children }
            </section>
        </main>
    );
};

export default TodoListTemplate;
