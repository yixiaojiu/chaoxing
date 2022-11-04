interface Option {
  midnightPause: boolean
  headless: boolean
  matchValue: '1' | '2'
  maxErrorTime: number
  isNeedFace: boolean
  isNeedCourseClick: boolean
}

export const config: Option = {
  // 是否在0~6点停止脚本，默认开启
  midnightPause: true,
  // 是否开启无头模式, 默认未无头模式
  headless: true,
  // 为完成任务的判断条件，
  matchValue: '2',
  // 最大报错次数
  maxErrorTime: 5,
  // 是否需要人脸识别
  isNeedFace: true,
  // 是否在进入课程页需要点击
  isNeedCourseClick: false,
}
