import type { ElementHandle } from 'playwright'
import chalk from 'chalk'

export async function getSelectCourse(courseList: ElementHandle<SVGElement | HTMLElement>[]) {
  console.log(chalk.magenta(`请选择课程序号 0~${courseList.length}`))
}
