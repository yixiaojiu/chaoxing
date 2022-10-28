import type { ElementHandle, Page } from 'playwright'
import chalk from 'chalk'
import { config } from '../config'
import { calcSecond, delay, getTime, isNumber, prompt } from './utils'
import { waitPage } from './qrcodeVerify'

export async function getSelectCourse(courseList: ElementHandle<SVGElement | HTMLElement>[]): Promise<ElementHandle<SVGElement | HTMLElement>> {
  console.log(chalk.magenta(`请选择课程序号 0~${courseList.length}`))
  const res = await prompt()
  if (!isNumber(res)) {
    console.log(chalk.red('请输入数字'))
    return await getSelectCourse(courseList)
  }
  const index = parseInt(res)
  if (index < 0 || index >= courseList.length) {
    console.log(chalk.red('请输入正确索引'))
    return await getSelectCourse(courseList)
  }
  return courseList[index]
}

export async function getChapterUnit(page: Page) {
  await delay(1022)
  const frame = await page.frame({
    url: (url) => {
      return url.pathname === '/mooc2-ans/mycourse/studentcourse'
    },
  })
  return await frame!.$$('.chapter_unit')
}

let courseUnitPageUrl = ''
export async function watchCourseTask(page: Page) {
  while (true) {
    try {
      const chapterList = await getChapterUnit(page)
      if (config.midnightPause) {
        const hour = new Date().getHours()
        if (hour < 7) {
          console.log(chalk.green('当前深夜，退出程序'))
          process.exit(0)
        }
      }
      await delay(1011)
      courseUnitPageUrl = page.url()
      await watchOneClass(chapterList, page)
      await waitPage(page, (url) => {
        return url.pathname === '/mycourse/stu'
      })
      await delay(1212)
    }
    catch (err) {
      await page.goto(courseUnitPageUrl)
    }
  }
}

async function watchOneClass(chapterList: ElementHandle<SVGElement | HTMLElement>[], page: Page) {
  const LiElement = await getWatchCourse(chapterList)
  if (!LiElement) {
    console.log(chalk.red('没有可观看的课程'))
    process.exit(0)
  }
  const catalogNameElement = await LiElement.$('.catalog_name')
  const text = await catalogNameElement?.innerText()
  console.log(chalk.yellow(`${getTime()} 当前课程 ${text}`))
  await LiElement.click()
  await waitPage(page, (url) => {
    return url.pathname === '/mycourse/studentstudy'
  })
  const frame = await page.frame({
    url: (url) => {
      return url.pathname === '/ananas/modules/video/index.html'
    },
  })
  const button = await frame!.$('button.vjs-big-play-button')
  button?.click()
  const span = await frame!.$('.vjs-duration-display')
  let durationText = '0:00'
  while (true) {
    await delay(512)
    durationText = await span!.innerText()
    if (durationText !== '0:00') {
      break
    }
  }
  const currentSpan = await frame!.$('.vjs-current-time-display')
  const currentText = await currentSpan?.innerText()
  const secends = calcSecond(durationText) - calcSecond(currentText!)
  await delay(secends * 1000)
  await delay(5123)
  console.log(chalk.yellow(`${getTime()} 视频播放完成`))
  await page.goto(courseUnitPageUrl)
}

let chapteCache = 0
let LiCache = 0
async function getWatchCourse(chapterList: ElementHandle<SVGElement | HTMLElement>[]) {
  for (let chapterIndex = chapteCache; chapterIndex < chapterList.length; chapterIndex++) {
    const chapterElement = chapterList[chapterIndex]
    const LiElements = await chapterElement.$$('li')
    for (let LiIndex = chapterIndex === chapteCache ? LiCache : 0; LiIndex < LiElements.length; LiIndex++) {
      const LiElement = LiElements[LiIndex]
      const inputElement = await LiElement.$('.catalog_task input')
      const inputValue = await inputElement!.getAttribute('value')
      if (inputValue === '2') {
        chapteCache = chapterIndex
        LiCache = LiIndex
        return LiElement
      }
    }
  }
  return null
}

