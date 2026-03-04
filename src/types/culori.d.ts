declare module 'culori' {
  export type Color = Record<string, unknown> & { mode: string; alpha?: number }

  export function parse(color: string): Color | undefined
  export function formatHex(color: Color | string | undefined): string | undefined
  export function formatHex8(color: Color | string | undefined): string | undefined
}
