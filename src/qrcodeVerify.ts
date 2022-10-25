import type { Page } from 'playwright'
import chalk from 'chalk'
import { logQRcode } from './logQRcode'

const loginUrl = 'https://passport2.chaoxing.com'

export const login = async (page: Page) => {
  await page.goto(loginUrl)

  const qrImage = await page.$('#quickCode')
  const qrcodeUrl = await qrImage?.getAttribute('src')
  await logQRcode(loginUrl + qrcodeUrl)

  await waitHomePage(page)
  console.log(chalk.green('登录成功'))
}

// export const faceVerification = async (page: Page, url: string) => {
// }

export async function waitForElement(page: Page, selector: string) {
  await page.waitForSelector(selector, {
    timeout: 60000,
  })
}

export async function waitHomePage(page: Page) {
  await page.waitForURL(/chaoxing/g, {
    timeout: 60000,
  })
}
