// @since v0.0.8
declare module '*.png'
declare module 'window'
declare const global: typeof globalThis & { window: CustomWindow }
