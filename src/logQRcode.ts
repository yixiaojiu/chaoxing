import jsQR from 'jsqr'
import Jimp from 'jimp'
import qrcode from 'qrcode-terminal'
import axios from 'axios'
import chalk from 'chalk'

export const logQRcode = async (qrcodeUrl: string) => {
  console.log(chalk.green('开始获取二维码'))
  const { data } = await axios.get(qrcodeUrl, {
    responseType: 'arraybuffer',
  })
  const blockimg = await Jimp.read(data)
  const bitmap = blockimg.bitmap
  const width = bitmap.width
  const height = bitmap.height
  const imgData = bitmap.data
  const code = jsQR(imgData as unknown as Uint8ClampedArray, width, height)
  qrcode.generate(code!.data, { small: true })
}

