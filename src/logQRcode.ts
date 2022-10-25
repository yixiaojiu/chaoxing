import jsQR from 'jsqr'
import Jimp from 'jimp'
import qrcode from 'qrcode-terminal'
import axios from 'axios'

export const logQRcode = async (qrcodeUrl: string) => {
  console.log('开始获取登录二维码')
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

