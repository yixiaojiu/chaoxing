import { createInterface } from 'node:readline'
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

export function prompt() {
  return new Promise((resolve: (value: string) => void) => {
    rl.once('line', (input) => {
      resolve(input)
      rl.close()
    })
  })
}

export const sleep = (second: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(), second)
  })
}
