import type { Page } from 'playwright'
import chalk from 'chalk'
import { logQRcode } from './logQRcode'

const url = 'https://mooc1-1.chaoxing.com'
const loginUrl = 'https://passport2.chaoxing.com'

export const login = async (page: Page) => {
  await page.goto(loginUrl)

  const qrImage = await page.$('#quickCode')
  const qrcodeUrl = await qrImage?.getAttribute('src')
  await logQRcode(loginUrl + qrcodeUrl)

  await waitPage(page, url => url.pathname === '/space/index')
  console.log(chalk.green('登录成功'))
}

export async function faceVerification(page: Page) {
  await waitPage(page, (url) => {
    return url.pathname === '/visit/stucoursemiddle'
  })
  console.log(chalk.green('进入人脸识别页面成功'))

  const qrImage = await page.$('#fcqrimg')
  const qrcodeUrl = await qrImage?.getAttribute('src')
  await logQRcode(url + qrcodeUrl)
}

export async function waitForElement(page: Page, selector: string) {
  await page.waitForSelector(selector, {
    timeout: 60000,
  })
}

export async function waitPage(page: Page, url: string | RegExp | ((url: URL) => boolean)) {
  await page.waitForURL(url, {
    timeout: 120000,
  })
}
