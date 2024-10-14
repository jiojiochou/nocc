import type { SFCWithInstall } from './typescript'

export function withInstall<A, B extends Record<string, any>>(main: A, extra?: B) {
  (main as SFCWithInstall<A>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra || {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp
    }
  }

  return main as SFCWithInstall<A> & B
}

export function foo() {
  return 'foo'
}
