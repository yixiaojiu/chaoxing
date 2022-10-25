import { existsSync } from 'node:fs'
import { chromium } from 'playwright'
import { login, sleep } from './src'

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
    await page.goto('https://i.chaoxing.com/')
    // await page.waitForSelector('#mainphoto', {
    //   timeout: 60000,
    // })
  }
  else {
    await login(page)
    await context.storageState({
      path: './storageState.json',
    })
  }

  await sleep(1234)

  await sleep(5000)
  await page.screenshot({
    path: './shoot.png',
  })
  console.log('截图完成')

  // await browser.close()
}
