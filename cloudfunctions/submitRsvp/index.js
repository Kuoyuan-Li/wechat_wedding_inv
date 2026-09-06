const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()
const chineseNamePattern = /^[\u3400-\u4dbf\u4e00-\u9fff]{2,4}$/u
const allowedGuestCounts = new Set(['无法赴约', '1', '2', '3', '4', '5', '更多'])

exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  const submitterOpenId = wxContext.OPENID || ''
  const guestName = typeof event.guestName === 'string'
    ? event.guestName.trim().replace(/\s+/g, '')
    : ''
  const guestCount = typeof event.guestCount === 'string' ? event.guestCount : ''

  if (!chineseNamePattern.test(guestName)) {
    return {
      success: false,
      error: '姓名须为 2–4 个中文字符，不能包含数字、英文或特殊符号。',
    }
  }

  if (!allowedGuestCounts.has(guestCount)) {
    return {
      success: false,
      error: '请选择有效的宾客数量。',
    }
  }

  const recordId = submitterOpenId
    ? `openid_${submitterOpenId}`
    : `guest_${Buffer.from(guestName).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')}`

  await db.collection('rsvps').doc(recordId).set({
    data: {
      guestName,
      guestCount,
      submitterOpenId,
      submittedAt: db.serverDate(),
      updatedAt: db.serverDate(),
    },
  })

  return { success: true }
}
