// Generated by Nuxt'
import type { Plugin } from '#app'

type Decorate<T extends Record<string, any>> = { [K in keyof T as K extends string ? `$${K}` : never]: T[K] }

type InjectionType<A extends Plugin> = A extends {default: Plugin<infer T>} ? Decorate<T> : unknown

type NuxtAppInjections = 
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.16.1_@parcel+watcher@2.5.1_db0@0.3.1_ioredis@5.6.0_lightningcss@1.29.2_magicast@_0a5cd05ecc2a44b2a0cb79f1671fa147/node_modules/nuxt/dist/app/plugins/revive-payload.client.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.16.1_@parcel+watcher@2.5.1_db0@0.3.1_ioredis@5.6.0_lightningcss@1.29.2_magicast@_0a5cd05ecc2a44b2a0cb79f1671fa147/node_modules/nuxt/dist/head/runtime/plugins/unhead.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.16.1_@parcel+watcher@2.5.1_db0@0.3.1_ioredis@5.6.0_lightningcss@1.29.2_magicast@_0a5cd05ecc2a44b2a0cb79f1671fa147/node_modules/nuxt/dist/app/plugins/router.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.16.1_@parcel+watcher@2.5.1_db0@0.3.1_ioredis@5.6.0_lightningcss@1.29.2_magicast@_0a5cd05ecc2a44b2a0cb79f1671fa147/node_modules/nuxt/dist/app/plugins/browser-devtools-timing.client.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.16.1_@parcel+watcher@2.5.1_db0@0.3.1_ioredis@5.6.0_lightningcss@1.29.2_magicast@_0a5cd05ecc2a44b2a0cb79f1671fa147/node_modules/nuxt/dist/app/plugins/navigation-repaint.client.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.16.1_@parcel+watcher@2.5.1_db0@0.3.1_ioredis@5.6.0_lightningcss@1.29.2_magicast@_0a5cd05ecc2a44b2a0cb79f1671fa147/node_modules/nuxt/dist/app/plugins/check-outdated-build.client.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.16.1_@parcel+watcher@2.5.1_db0@0.3.1_ioredis@5.6.0_lightningcss@1.29.2_magicast@_0a5cd05ecc2a44b2a0cb79f1671fa147/node_modules/nuxt/dist/app/plugins/revive-payload.server.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.16.1_@parcel+watcher@2.5.1_db0@0.3.1_ioredis@5.6.0_lightningcss@1.29.2_magicast@_0a5cd05ecc2a44b2a0cb79f1671fa147/node_modules/nuxt/dist/app/plugins/chunk-reload.client.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/@nuxt+ui@3.0.1_@babel+parser@7.27.0_change-case@5.4.4_db0@0.3.1_embla-carousel@8.5.2_io_b92069a658b85442ce95475bc2a8453e/node_modules/@nuxt/ui/dist/runtime/plugins/colors.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/@nuxtjs+color-mode@3.5.2_magicast@0.3.5/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.server.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/@nuxtjs+color-mode@3.5.2_magicast@0.3.5/node_modules/@nuxtjs/color-mode/dist/runtime/plugin.client.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/@nuxt+icon@1.11.0_magicast@0.3.5_vite@6.2.3_jiti@2.4.2_lightningcss@1.29.2_terser@5.39._e1f89c4a2d494c96a9fb9c79ec9e0946/node_modules/@nuxt/icon/dist/runtime/plugin.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.16.1_@parcel+watcher@2.5.1_db0@0.3.1_ioredis@5.6.0_lightningcss@1.29.2_magicast@_0a5cd05ecc2a44b2a0cb79f1671fa147/node_modules/nuxt/dist/app/plugins/dev-server-logs.js")> &
  InjectionType<typeof import("../../../node_modules/.pnpm/nuxt@3.16.1_@parcel+watcher@2.5.1_db0@0.3.1_ioredis@5.6.0_lightningcss@1.29.2_magicast@_0a5cd05ecc2a44b2a0cb79f1671fa147/node_modules/nuxt/dist/app/plugins/check-if-layout-used.js")>

declare module '#app' {
  interface NuxtApp extends NuxtAppInjections { }

  interface NuxtAppLiterals {
    pluginName: 'nuxt:revive-payload:client' | 'nuxt:head' | 'nuxt:router' | 'nuxt:browser-devtools-timing' | 'nuxt:revive-payload:server' | 'nuxt:chunk-reload' | 'nuxt:global-components' | '@nuxt/icon' | 'nuxt:checkIfLayoutUsed'
  }
}

declare module 'vue' {
  interface ComponentCustomProperties extends NuxtAppInjections { }
}

export { }
