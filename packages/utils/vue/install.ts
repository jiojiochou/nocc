import type { App } from 'vue'
import type { SFCWithInstall } from './types'

export function foo() {
  console.log('foo')
}

export function withInstall<T, E extends Record<string, any>>(components: T, extra?: E) {
  ;(components as SFCWithInstall<T>).install = (app: App): void => {
    for (const comp of [components, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }
}
