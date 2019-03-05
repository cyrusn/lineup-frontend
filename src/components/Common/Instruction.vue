<template lang="html">
  <div class="btn-group">
    <button type='button' class="btn btn-warning">
      <font-awesome-icon icon="user-plus"/>
      家長已到等候室
    </button>
    <button type='button' class="btn btn-success">
      <font-awesome-icon icon="bell"/>
      請到課室門外等候
    </button>
    <button type='button' class="btn btn-outline-success">
      <font-awesome-icon :icon="['far', 'bell']"/>
      前往課室中 ...
    </button>
    <button type='button' class="btn btn-danger">
      <font-awesome-icon icon="comment-dots"/>
      接見中 ...
    </button>
    <button type='button' class="btn btn-primary">
      <font-awesome-icon icon="check-circle"/>
      完成
    </button>
  </div>
</template>
