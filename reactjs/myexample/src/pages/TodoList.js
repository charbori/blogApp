import React, { Component } from 'react';
import { Form, TodoListTemplate, TodoItemList }  from 'components';
import { Pallete } from 'pages';
class TodoList extends Component {
    id = 1 // 이미 0이 존재함

    componentDidUpdate () {
        /*
        fetch ('https://couhensoft.com/mysqlApi/userSetData.php')
            .then (response => response.json ())
            .then (response => this.setState ({users: res}));
        */
        console.log('componentDidUpdate');
    }

    state = {
        input: '',
        pallete: '',
        todos: [
            { id: 0, text: ' 리액트 소개', checked: false }
        ],
        color: '',
        todoListTemplateStyle: {
            background: 'blue'
        }
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value // input 의 다음 바뀔 값
        });
    }

    handleCreate = () => {
        const { input, todos } = this.state;
        this.setState({
            input: '', // 인풋 비우고
            // concat 을 사용하여 배열에 추가
            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false
            })
        });
    }

    handleKeyPress = (e) => {
        // 눌려진 키가 Enter 면 handleCreate 호출
        if(e.key === 'Enter') {
            this.handleCreate();
        }
    }

    handleToggle = (id) => {
        const { todos } = this.state;

        // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index]; // 선택한 객체

        const nextTodos = [...todos]; // 배열 복사

        // 기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };

        this.setState({
            todos: nextTodos
        });
    }

    handleRemove = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    }

    handleColor = (selected) => {
        const { todoListTemplateStyle } = this.state;
        console.log('handleColor ' + selected);
        this.setState({
            todoListTemplateStyle: {
                background: selected
            }
        });
    }

    render() {
        const { color, pallete, input, todos, todoListTemplateStyle } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove,
            handleColor
        } = this;
        console.log('render start');
        return (
            <TodoListTemplate
                color={color}
                todoListTemplateStyle={todoListTemplateStyle}
                pallete={(
                    <Pallete
                        color={color}
                        handleColor={handleColor}
                    />
                )}
                form={(
                    <Form
                        value={input}
                        onKeyPress={handleKeyPress}
                        onChange={handleChange}
                        onCreate={handleCreate}
                    />
            )}>
                <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove}/>
            </TodoListTemplate>
        );
    }
}

export default TodoList;
