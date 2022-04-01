<template>
  <section class="container">
    <TodoList name="Мой список №1"/>
  </section>
</template>

<script>
import TodoList from "@/components/Todo/TodoList";

export default {
  name: 'App',
  components: {
    TodoList,
  }
}
</script>

<style>
body {
  background-color: ghostwhite;
}

.container {
  max-width: 1140px;
  padding: 0 30px;
  margin: 0 auto;
}
</style>
