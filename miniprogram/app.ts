// app.ts
type FontFile = {
  family: string
  fileID: string
}

type CloudTempFile = {
  fileID: string
  tempFileURL: string
  status: number
  errMsg?: string
}

type CloudTempFileURLResult = {
  fileList: CloudTempFile[]
}

const fontFiles: FontFile[] = [
  {
    family: 'WeddingSerifRegular',
    fileID: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/fonts/SourceHanSerifSC-Regular.otf',
  },
  {
    family: 'WeddingSerifSemiBold',
    fileID: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/fonts/SourceHanSerifSC-SemiBold.otf',
  },
  {
    family: 'WeddingSerifBold',
    fileID: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/fonts/SourceHanSerifSC-Bold.otf',
  },
]

function loadWeddingFonts() {
  const cloudApi = wx.cloud as unknown as {
    getTempFileURL(options: {
      fileList: string[]
      success(result: CloudTempFileURLResult): void
      fail(error: WechatMiniprogram.GeneralCallbackResult): void
    }): void
  }

  cloudApi.getTempFileURL({
    fileList: fontFiles.map((fontFile) => fontFile.fileID),
    success: (result) => {
      fontFiles.forEach((fontFile) => {
        const cloudFile = result.fileList.find((file) => file.fileID === fontFile.fileID)

        if (!cloudFile || cloudFile.status !== 0 || !cloudFile.tempFileURL) {
          console.warn('字体临时链接获取失败', {
            family: fontFile.family,
            cloudFile,
          })
          return
        }

        wx.loadFontFace({
          family: fontFile.family,
          source: `url("${cloudFile.tempFileURL}")`,
          global: true,
          success: () => {
            console.info('字体加载成功', fontFile.family)
          },
          fail: (error) => {
            console.error('字体加载失败', {
              family: fontFile.family,
              error,
            })
          },
        })
      })
    },
    fail: (error) => {
      console.error('获取字体临时链接失败', error)
    },
  })
}

App<IAppOption>({
  globalData: {},
  onLaunch() {
    if (!wx.cloud) {
      console.error('当前微信基础库不支持云开发')
    } else {
      wx.cloud.init({
        env: 'cloud1-d1gek8gnz6aeceff4',
        traceUser: true,
      })

      loadWeddingFonts()
    }
  },
  onHide() {
    wx.getBackgroundAudioManager().stop()
  },
})
