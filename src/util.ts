import { Pausable, useDocumentVisibility, useFullscreen, useTitle } from "@vueuse/core"
import { computed, Ref, watchEffect } from "vue"

export const useBackgroundTitle = (titleDisplay: Ref<string>, pausable?: Pausable): void => {
  const visibility = useDocumentVisibility()
  const visible = computed(() => visibility.value === "visible")

  const initialTitle = document.title
  const title = computed(() => {
    if (visible.value) return initialTitle
    else return `${titleDisplay.value} - ${initialTitle}`
  })

  if (pausable) watchEffect(() => (visible.value ? pausable.resume() : pausable.pause()))
  useTitle(title)
}

export const fullscreen = useFullscreen(document.body)
