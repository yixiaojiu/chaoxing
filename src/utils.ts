import { createInterface } from 'node:readline'
import dayjs from 'dayjs'

export function prompt() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((resolve: (value: string) => void) => {
    rl.once('line', (input) => {
      resolve(input)
      rl.close()
    })
  })
}

export const delay = (second: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => resolve(), second + getRandomInt(-1000, 1000))
  })
}

export function isNumber(input: string) {
  return /^[0-9]*$/g.test(input)
}

export function getTime() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export function calcSecond(time: string) {
  const times = time.split(':')
  return parseInt(times[0]) * 60 + parseInt(times[1])
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
