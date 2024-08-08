<script setup lang="ts">
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from "vue-router"

import Hamburger from "@/assets/icons/hamburger.vue"

import { Popover, PopoverContent } from "@/components/ui/popover"

const hamburgerOpen = ref(false)

type Link = {
  name: string
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}
const links: Link[] = [
  { name: "projects", to: { path: "/", hash: "#projects" } },
  { name: "contact", to: "/contact" },
  { name: "github", to: "https://github.com/vaaski" },
]

const route = useRoute()
const router = useRouter()
const wordmarkClick = async () => {
  if (route.path !== "/") await router.push("/")
  window.scrollTo({ top: 0, behavior: "smooth" })
}
</script>

<template>
  <div id="nav-bar">
    <div class="left">
      <NuxtLink class="wordmark" @click.native="wordmarkClick">vaaski.dev</NuxtLink>
    </div>
    <div class="spacer"></div>
    <div class="right">
      <AutoLink v-for="link in links" :key="link.name" :to="link.to">{{
        link.name
      }}</AutoLink>
    </div>
    <div class="hamburger">
      <Popover :open="hamburgerOpen" @update:open="hamburgerOpen = $event">
        <PopoverTrigger>
          <Hamburger />
        </PopoverTrigger>
        <PopoverContent align="end">
          <div class="popover-links">
            <AutoLink
              v-for="link in links"
              :key="link.name"
              @click="hamburgerOpen = false"
              :to="link.to"
            >
              {{ link.name }}
            </AutoLink>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  </div>
  <div class="navlight"></div>
</template>

<style scoped lang="scss">
#nav-bar {
  display: flex;
  z-index: 5;
  padding: 1.25rem 0;
  margin-top: 1rem;
  width: 100%;
  max-width: min(750px, 90vw);
  backdrop-filter: blur(10px);

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

.navlight {
  z-index: 4;
  background: radial-gradient(
    50% 28.82% at 50% 0%,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: 0.75;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.left,
.right {
  display: flex;
  gap: 1.2rem;
  margin: 0 2rem;

  a {
    --background-x-pad: 0.55em;
    --background-y-pad: 0.2em;

    font-style: normal;
    font-weight: 400;
    font-size: 1.1rem;
    color: hsla(0, 0%, 100%, 0.5);
    text-shadow: 0 0 20px hsla(0, 0%, 0%, 1);
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
}

.hamburger {
  display: none;
  margin: 0 2rem;
  color: hsla(0, 0%, 100%, 0.5);
}

@media (max-width: 500px) {
  .right {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}

.popover-links {
  display: flex;
  flex-direction: column;

  a {
    color: hsla(0, 0%, 100%, 0.75);
    margin: 0.5rem 0;
  }
}
</style>
