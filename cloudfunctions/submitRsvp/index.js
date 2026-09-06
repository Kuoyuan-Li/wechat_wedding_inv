const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
})

const db = cloud.database()
const chineseNamePattern = /^[\u3400-\u4dbf\u4e00-\u9fff]{2,4}$/u
const allowedGuestCounts = new Set(['无法赴约', '1', '2', '3', '4', '5', '更多'])

exports.main = async (event) => {
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

  await db.collection('rsvps').add({
    data: {
      guestName,
      guestCount,
      submittedAt: db.serverDate(),
    },
  })

  return { success: true }
}
