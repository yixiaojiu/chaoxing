import { existsSync } from 'node:fs'
import { chromium } from 'playwright'
import chalk from 'chalk'
import { getCourseList, login, sleep, waitHomePage } from './src'

mian()

async function mian() {
  const browser = await chromium.launch({
    headless: false,
    channel: 'chrome',
  })

  const isExisted = existsSync('./storageState.json')

  const context = await browser.newContext({
    storageState: isExisted ? './storageState.json' : undefined,
  })
  const page = await context.newPage()

  if (isExisted) {
    await page.goto('http://i.mooc.chaoxing.com/')
    await waitHomePage(page)
    console.log(chalk.cyan('进入首页成功'))
  }
  else {
    await login(page)
    await context.storageState({
      path: './storageState.json',
    })
  }

  await sleep(1234)

  const courseList = await getCourseList(page)
  // await browser.close()
}
