import type { ElementHandle, Page } from 'playwright'
import chalk from 'chalk'

export async function getCourseList(page: Page) {
  const iframe = await page.$('#frame_content')!
  const courseSrc = await iframe!.getAttribute('src')
  await page.goto(courseSrc!)

  const courseListULElement = await page.waitForSelector('#courseList')
  const courseList = await courseListULElement!.$$('h3 > a')

  if (!courseList.length) {
    console.log(chalk.red('未找到课程'))
    process.exit(0)
  }

  await logCourseTitle(courseList)
  return courseList
}

async function logCourseTitle(courseList: ElementHandle<SVGElement | HTMLElement>[]) {
  console.log('\n')
  let i = 0
  for (const Course of courseList) {
    const title = await (await Course.$('span'))!.innerText()
    console.log(chalk.yellow(`${i}. ${title}`))
    i++
  }
}

