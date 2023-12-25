export interface IEnv {
  get: (key: string) => string | undefined
  getOrThrow: (key: string) => string
}
