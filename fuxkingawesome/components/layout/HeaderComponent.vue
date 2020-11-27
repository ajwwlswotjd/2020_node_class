<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <nuxt-link class="navbar-brand" to="/">FUXKINGAWESOME</nuxt-link>
      <button class="navbar-toggler" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/alarm">알람</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/stopwatch">스탑워치</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/timer">타이머</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
    mounted(){
        
    }
};
</script>

<style scoped>

</style>