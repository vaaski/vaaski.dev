<template>
  <div id="nav-bar">
    <div class="left">
      <AutoLink to="/">vaaski.dev</AutoLink>
    </div>
    <div class="spacer"></div>
    <div class="right">
      <AutoLink to="https://github.com/vaaski">projects</AutoLink>
      <AutoLink to="https://github.com/vaaski">contact</AutoLink>
      <AutoLink to="https://github.com/vaaski">github</AutoLink>
    </div>
  </div>
</template>

<style scoped>
#nav-bar {
  position: fixed;
  display: flex;
  z-index: 5;
  padding: 1.25rem 0;
  margin-top: 1rem;
  width: 100%;
  max-width: min(750px, 90vw);

  font-style: normal;
  font-weight: 400;
  font-size: 1.1rem;
  color: hsla(0, 0%, 100%, 0.5);

  background: linear-gradient(
    216.04deg,
    rgba(255, 255, 255, 0.06) 18.89%,
    rgba(255, 255, 255, 0.012) 87.3%
  );
  box-shadow: 0px -1px 2px rgba(255, 255, 255, 0.25);
  border-radius: 100px;

  .spacer {
    flex-grow: 1;
  }
}

.left,
.right {
  display: flex;
  gap: 1rem;
  margin: 0 2rem;
}
</style>
