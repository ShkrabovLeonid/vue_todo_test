<template>
  <li class="todo-item">
    <div class="todo-item__wrapper">
      <div class="todo-item__number">
        <span>{{ todo.id }}</span>
      </div>
      <div class="todo-item__content">
        <p class="todo-item__content-text">
          {{ todo.content }}
        </p>
      </div>
      <div class="todo-item__status">
        <input
            v-model="todo.status"
            type="checkbox"
            name="todo_status"
        >
      </div>
      <div class="todo-item__delete">
        <Button
            text-button="Удалить"
            style-button="light"
            @click="removeTodo(todo.id)"
        />
      </div>
    </div>
    <ul
        v-if="todo.children"
        class="todo-item__children"
    >
      <TodoItem
          v-for="todo_child in todo.children"
          :key="todo_child.id"
          :data="todo_child"
      />
    </ul>
  </li>
</template>

<script>
import Button from "@/components/Button";
import {mapMutations} from 'vuex';

export default {
  name: "TodoItem",
  components: {Button},
  props: {
    data: {
      type: [Object],
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      todo: this.data
    }
  },
  methods: {
    ...mapMutations('todo', [
      'removeTodo'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  flex-flow: wrap;

  p {
    margin: 0;
  }

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row;
    width: auto;
    min-width: 300px;
    padding: 10px;
    margin-bottom: 8px;
    box-shadow: 0 0 3px rgba(180, 180, 180, 0.5);
    border-radius: 12px;
  }

  &__number {
    flex: 10%;
    margin-right: 10px;
  }

  &__content {
    flex: 60%;
    margin-right: 10px;
  }

  &__status {
    flex: 10%;
    display: flex;
    margin-right: 10px;
  }

  &__delete {
    flex: 20%;
  }

  &__children {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 100%;
  }
}
</style>