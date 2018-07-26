<template>
  <div>
    <hr v-if='list.length !== 0'>
    <h2 v-if='list.length !== 0'>{{name}}</h2>
    <span>
      <controller
        v-for="(p, key) in list" :key='key'
        :schedule='p' />
    </span>
  </div>
</template>

<script>
import Controller from './Controller.vue'

export default {
  props: {
    'list': Array,
    'name': String
  },
  components: {Controller}
}
</script>
