<template>
  <div>
    <p>something went wrong</p>
    <p>
      please
      <AutoLink to="https://github.com/vaaski/vaaski.dev/issues/new">
        open an issue on github
      </AutoLink>
    </p>
    <br />
    <p><AutoLink to="/">go home</AutoLink></p>
  </div>
</template>

<style scoped lang="scss">
p {
  text-align: center;
}

a {
  text-decoration: underline;
}
</style>
