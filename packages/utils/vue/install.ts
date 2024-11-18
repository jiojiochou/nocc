import type { App } from 'vue'
import type { SFCWithInstall } from './type'

export function withInstall<Comp extends Record<string, any>>(components: Comp) {
  ;(components as SFCWithInstall<Comp>).install = (app: App): void => {
    app.component(components.name, components)
  }

  return components as SFCWithInstall<Comp>
}
