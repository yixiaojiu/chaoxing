import { existsSync } from 'node:fs'
import { chromium } from 'playwright'
import chalk from 'chalk'
import {
  delay,
  faceVerification,
  getCourseList,
  getSelectCourse,
  login,
  waitPage,
  watchCourseTask,
} from './src'
import { config } from './config'

mian()

async function mian() {
  const browser = await chromium.launch({
    headless: config.headless,
    channel: 'chrome',
  })

  const isExisted = existsSync('./storageState.json')

  const context = await browser.newContext({
    storageState: isExisted ? './storageState.json' : undefined,
  })
  const page = await context.newPage()

  if (isExisted) {
    await page.goto('http://i.mooc.chaoxing.com/')
    await waitPage(page, url => url.pathname === '/space/index')
    console.log(chalk.green('进入首页成功'))
  }
  else {
    await login(page)
    await context.storageState({
      path: './storageState.json',
    })
  }

  await delay(2234)

  const courseList = await getCourseList(page)
  const selectedCourse = await getSelectCourse(courseList)
  const courseUrl = await selectedCourse.getAttribute('href')
  page.goto(courseUrl!)

  if (config.isNeedFace) {
    await faceVerification(page)
  }
  await waitPage(page, (url) => {
    return url.pathname === '/mycourse/stu'
  })
  console.log(chalk.green('进入课程页面成功'))

  await watchCourseTask(page)

  await browser.close()
}
