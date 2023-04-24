export {}

declare global {
  interface Data<T = any> {
    [key: string]: T
  }
}
