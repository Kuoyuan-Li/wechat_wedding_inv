// app.ts
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
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})
