require('dotenv').config()
const childProcess = require('node:child_process')

const captureImageRTSP = (channel) => {
  const filename = `./${channel}.jpg`
  return new Promise((resolve, reject) => {
    const args = [
      '-rtsp_transport',
      'tcp',
      '-i',
      `${process.env.RTSP}${channel}`,
      '-vframes',
      '1',
      filename
    ]

    const ffmpeg = childProcess.spawn('ffmpeg', args, { detached: false, stdio: 'ignore' })

    ffmpeg.once('exit', (code) => {
      resolve(filename)
    })
  })
}

// const getCaptureFileName = () => {
//   getCapture.captureImage(() => {
//     const ffmpegCommand = getCapture.writeStream.spawnargs
//     const fileName = ffmpegCommand.slice(-1).toString()
//     console.log(fileName)
//     return fileName
//   })
// }

module.exports = {
  captureImageRTSP
}
