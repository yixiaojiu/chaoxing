export const sleep = (second: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(), second)
  })
}
