<template>
  <div class="todo-name">
    <h1 v-if="!showEditName">
      {{ projectName }}
    </h1>
    <input
        v-show="showEditName"
        ref="inputName"
        v-model="projectName"
        @blur="hideName"
        @keydown.enter="hideName"
    >
    <div
        v-if="!showEditName"
        class="todo-name__edit"
        @click="showName"
    >
      Изменить
    </div>
  </div>
  <div class="todo-add">
    <div class="todo-add__textarea">
      <textarea v-model="todoTextarea"/>
    </div>
    <div class="todo-add__button">
      <Button
          text-button="Добавить"
          style-button="primary"
          @click="addTodo({
        id: 121,
        content: todoTextarea,
        status: false,
        position: 0,
        parent: 0
      })"
      />
    </div>
  </div>
  <div class="todo-filter">
    <h2>Фильтер</h2>
    <input
        v-model="filterData"
        type="text"
    >
  </div>
  <ul class="todo-list">
    <TodoItem
        v-for="todo in filterTodo()"
        :key="todo.id"
        :data="todo"
    />
  </ul>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import TodoItem from "@/components/Todo/TodoItem";
import Button from "@/components/Button";

export default {
  name: "TodoList",
  components: {Button, TodoItem},
  props: {
    name: {
      type: [String],
      default: 'Название проекта'
    }
  },
  data() {
    return {
      projectName: this.name,
      showEditName: false,
      filterData: '',
      todoTextarea: ''
    }
  },
  computed: mapGetters('todo', {
    todoLists: 'getTodoList'
  }),
  watch: {
    projectName: {
      immediate: true,
      handler() {
        document.title = this.projectName;
      }
    }
  },
  mounted() {
    this.$store.dispatch('todo/fetchTodoList');
  },
  methods: {
    ...mapMutations('todo', [
      'addTodo',
    ]),
    showName(e) {
      e.preventDefault();
      this.showEditName = true;
      setTimeout(() => {
        this.$refs.inputName.focus();
      }, 0);
    },
    hideName(e) {
      e.preventDefault();
      this.showEditName = false;
    },
    formatData: (data = []) => {
      for (let i = 0; i < data.length; i++) {
        data[i].children = data.filter((subItem) => {
              if (data[i].id === subItem.parent) {
                return subItem;
              }
            }
        ).sort((a, b) => a.position - b.position);
      }
      return data.filter((item) => item.parent === 0).sort((a, b) => a.position - b.position);
    },
    filterTodo() {
      const newTodoLists = JSON.parse(JSON.stringify(this.todoLists));
      if (!this.filterData) {
        return this.formatData(newTodoLists);
      } else {
        return newTodoLists.filter((item) => {
          if (item.content.toLowerCase().includes(this.filterData.toLowerCase())) {
            return item;
          }
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.todo-name {
  display: flex;
  align-items: center;

  &__edit {
    cursor: pointer;
    font-size: 12px;
    margin: 7px 0 0 15px;

    &:hover {
      color: #b4b4b4;
    }
  }

  input {
    font-family: initial;
    font-weight: bold;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    padding: 0;
    border: none;
    background: none;
    outline: none;
  }
}

.todo-add {
  display: flex;

  &__textarea {
    flex: 75%;
    border: 1px solid #e4e4ea;
    border-radius: 15px;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 25%;
  }

  textarea {
    font: inherit;
    letter-spacing: inherit;
    color: currentColor;
    padding: 15px;
    border: 0;
    outline: none;
    background: none;
    display: block;
    min-width: 0;
    width: 100%;
    resize: none;
    height: 150px;
  }
}

.todo-filter {
  margin-top: 15px;

  h2 {
    margin: 0 0 15px;
  }

  input {
    border: 1px solid #e4e4ea;
    border-radius: 15px;
    width: 75%;
    height: 30px;
    padding: 5px 15px;
  }
}

.todo-list {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: #e4e4ea;
  padding: 30px;
  border-radius: 15px;
  max-width: 300px;
  @media screen and (min-width: 375px) {
    max-width: 350px;
  }
  @media screen and (min-width: 576px) {
    max-width: 550px;
  }
  @media screen and (min-width: 768px) {
    max-width: 750px;
  }
  @media screen and (min-width: 992px) {
    max-width: 950px;
  }
  @media screen and (min-width: 1200px) {
    max-width: 1000px;
  }
  overflow: scroll;
}
</style>