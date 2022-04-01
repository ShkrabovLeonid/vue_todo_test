const actions = {
    fetchTodoList({commit}) {
        const todos = [
            {
                id: 1,
                content: 'test1',
                status: true,
                position: 0,
                parent: 0,
            },
            {
                id: 2,
                content: 'test2',
                status: false,
                position: 0,
                parent: 0,
            },
            {
                id: 3,
                content: 'test3',
                status: true,
                position: 1,
                parent: 0,
            },
            {
                id: 4,
                content: 'test4',
                status: true,
                position: 1,
                parent: 2,
            },
            {
                id: 5,
                content: 'test5',
                status: true,
                position: 0,
                parent: 4,
            },
            {
                id: 6,
                content: 'test6',
                status: true,
                position: 0,
                parent: 2,
            }
        ];
        commit('updatedTodo', todos);
    }
}
const mutations = {
    updatedTodo(state, todos) {
        state.todos = todos;
    },
    addTodo(state, todo) {
        state.todos.push(todo);
    },
    removeTodo(state, id) {
        state.todos = state.todos.filter((item) => id !== item.id);
    }
}
const state = {
    todos: []
}
const getters = {
    getTodoList(state) {
        return Object.assign([], state.todos);
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters,
}