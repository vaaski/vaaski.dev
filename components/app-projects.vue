<script setup lang="ts">
import HomeIcon from "@/assets/icons/home.vue"
import HowtfIcon from "@/assets/icons/howtf.vue"
import LocalpenIcon from "@/assets/icons/localpen.vue"
import NoVoiceIcon from "@/assets/icons/no-voice.vue"
import PresetIcon from "@/assets/icons/preset.vue"
import PublicIcon from "@/assets/icons/public.vue"
import YtdlIcon from "@/assets/icons/ytdl.vue"

type Project = {
  name: string
  description: string
  icon: typeof LocalpenIcon
  externalLink: string
  externalLinkText: string
}

const projects: Project[] = [
  {
    name: "localpen",
    description: "Quickly run and evaluate code with the speed of Bun.",
    icon: LocalpenIcon,
    externalLink: "https://localpen.is",
    externalLinkText: "localpen.is",
  },
  {
    name: "howtf",
    description: "Look up console commands using the GPT API.",
    icon: HowtfIcon,
    externalLink: "https://github.com/vaaski/howtf",
    externalLinkText: "vaaski/howtf",
  },
  {
    name: "telegram-ytdl",
    description: "A simple & fast YouTube download Telegram bot.",
    icon: YtdlIcon,
    externalLink: "https://github.com/vaaski/telegram-ytdl",
    externalLinkText: "vaaski/telegram-ytdl",
  },
  {
    name: "vaaski.dev",
    description: "This website.",
    icon: HomeIcon,
    externalLink: "https://github.com/vaaski/vaaski.dev",
    externalLinkText: "vaaski/vaaski.dev",
  },
  {
    name: "Apollo Studio Website",
    description: "The official homepage and blog for Apollo Studio.",
    icon: PublicIcon,
    externalLink: "https://github.com/vaaski/apollo-studio-web",
    externalLinkText: "vaaski/apollo-studio-web",
  },
  {
    name: "fuckvoicemessages",
    description: "Convert voice messages to text using the openai API and Telegram.",
    icon: NoVoiceIcon,
    externalLink: "https://github.com/vaaski/fuckvoicemessages",
    externalLinkText: "vaaski/fuckvoicemessages",
  },
  {
    name: "go-yt-dlp",
    description: "A small Terminal UI wrapper around yt-dlp.",
    icon: YtdlIcon,
    externalLink: "https://github.com/vaaski/go-yt-dlp",
    externalLinkText: "vaaski/go-yt-dlp",
  },
  {
    name: "userscript-template",
    description: "Opinionated userscript template for browser userscripts.",
    icon: PresetIcon,
    externalLink: "https://github.com/vaaski/userscript-template",
    externalLinkText: "vaaski/userscript-template",
  },
]
</script>

<template>
  <div class="app-projects">
    <div id="projects"></div>
    <h1>past work</h1>

    <ul class="project-list">
      <li class="project-item" v-for="(item, index) of projects" :key="item.name + index">
        <AutoLink :to="item.externalLink">
          <div class="icon">
            <component :is="item.icon" />
          </div>
          <div class="text">
            <h2>{{ item.name }}</h2>
            <p>{{ item.description }}</p>
          </div>
          <div class="external-link">
            {{ item.externalLinkText }}
          </div>
        </AutoLink>
      </li>
    </ul>

    <div class="backdrop"></div>
  </div>
</template>

<style scoped lang="scss">
.app-projects {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: black;
  z-index: 3;
  position: relative;
}

h1 {
  margin: 1em auto;
  font-weight: 200;
  font-size: 3rem;
  text-align: center;
  letter-spacing: 0.4em;
  text-shadow: 0px 0px 30px hsla(0, 0%, 100%, 0.75);
}

ul {
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  margin-bottom: 6rem;
  width: 100%;
  max-width: min(900px, 90vw);
  gap: 1.5rem;
  display: flex;
  flex-direction: column;
}

li.project-item a {
  display: flex;
  align-items: center;
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px -1px 0px rgba(255, 255, 255, 0.25);
  border-radius: 1em;
  transition: 150ms ease-in-out;

  .icon svg {
    height: 4rem;
    width: auto;
    margin: 1.5rem 2rem;
    filter: drop-shadow(0 0 32px hsla(0, 0%, 100%, 0.25));
    transform: translateZ(0);
  }

  .text {
    margin-right: 1em;
  }

  h2 {
    font-weight: 250;
    font-size: 1.75em;
    margin-bottom: 0.125em;
  }

  p {
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 0.9rem;
  }

  .external-link {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5em 1.5em;
    border-radius: 0 1em 0 1em;
    background: hsla(0, 0%, 100%, 0.05);
    border: 1px solid hsla(0, 0%, 100%, 0.15);
    border-top-width: 0;
    border-right-width: 0;
    backdrop-filter: blur(10px);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.125);
    box-shadow: 0px -1px 0px rgba(255, 255, 255, 0.25), 0 0 150px hsla(0, 0%, 100%, 0.1);
  }
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  background: radial-gradient(
    357.3% 137.24% at 50% 100%,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: 0.6;
}

@media (max-width: 900px) {
  h1 {
    font-size: 2em;
  }

  li.project-item a {
    padding: 1em 0;

    .icon svg {
      height: 2.5rem;
      margin: 1rem;
    }

    h2 {
      font-size: 1.25rem;
    }

    p {
      font-size: 0.75rem;
    }

    .external-link {
      padding: 0.25em 1.25em;
      font-size: 0.75rem;
      border-radius: 0 1em 0 1em;
      background: hsla(0, 0%, 100%, 0.05);
      border: 1px solid hsla(0, 0%, 100%, 0.15);
      border-top-width: 0;
      border-right-width: 0;
      backdrop-filter: blur(10px);
    }
  }
}

#projects {
  position: absolute;
  top: -60px;
}
</style>
