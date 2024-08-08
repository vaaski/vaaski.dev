<template>
  <div id="nav-bar">
    <div class="left">
      <AutoLink class="wordmark" to="/">vaaski.dev</AutoLink>
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
  gap: 1.2rem;
  margin: 0 2rem;
}

a {
  --background-x-pad: 0.55em;
  --background-y-pad: 0.2em;

  font-style: normal;
  font-weight: 400;
  font-size: 1.1rem;
  color: hsla(0, 0%, 100%, 0.5);
  padding: var(--background-y-pad) var(--background-x-pad);
  margin: calc(var(--background-y-pad) * -1) calc(var(--background-x-pad) * -1);
  border-radius: 1em;
  transition: 75ms linear;
  transition-property: color, background, text-shadow, box-shadow;

  &:not(.wordmark):where(:hover, :focus, :active),
  &.wordmark:where(:focus, :active) {
    color: hsla(0, 0%, 100%, 1);
    background: hsla(0, 0%, 100%, 0.1);
    text-shadow: 0 0 15px hsla(0, 0%, 100%, 0.75);
    box-shadow: 0 0 10px hsla(0, 0%, 100%, 0.125);
  }
}
</style>
