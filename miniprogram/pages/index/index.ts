type MemoryItem = {
  id: string
  image: string
  title: string
  text: string
}

type GuestLetterBook = Record<string, string>

type MemoryDot = {
  id: string
  active: boolean
}

type CoverScrollEvent = WechatMiniprogram.CustomEvent<{
  scrollTop: number
  scrollHeight: number
}>

type CoverImageLoadEvent = WechatMiniprogram.CustomEvent<{
  width: number
  height: number
}>

const memories: MemoryItem[] = [
  {
    id: 'firstday',
    image: '/assets/firstday.jpg',
    title: '2月10号',
    text: '2018 年，在我们来到墨尔本的第二学期，因机缘巧合分到了同一节英语课，成为同学。但或许不是机缘巧合，而是天赐良机。那份双向的一见钟情，是磁铁的正负极彼此吸引。那枚承载心意的潘多拉戒指，让我们在情人节前，从同学变成了恋人。',
  },
  {
    id: 'cities',
    image: '/assets/tianjin-zhuhai.jpg',
    title: '我来到你的城市',
    text: '第一次去珠海，第一次去天津，我们走进了彼此长大的街道，那些关于各自成长的故事，也不再只是口述。如今，这些城市也不再只是地图上的坐标，而成了彼此的第二个家。',
  },
  {
    id: 'melbourne',
    image: '/assets/melbourne.jpg',
    title: '琐碎而珍贵的日常',
    text: '疫情、游戏、健身、钓鱼、徒步、澳网、温泉、演唱会，还有许多柴米油盐的日常与并肩散步的夜晚。生活并非每天都与众不同，却因彼此的陪伴，在平凡里闪闪发光。',
  },
  {
    id: 'travel',
    image: '/assets/travel.jpg',
    title: '旅行的足迹',
    text: '从 2018 年的悉尼开始，我们把许多城市与国家走成了共同记忆：每天一杯泰奶的泰国、在大堡礁下海浮潜的凯恩斯、蓝花楹盛开的布里斯班、过山车坐到头晕的黄金海岸、特种兵式打卡的日本，以及挑战高反、尽享风光的云南。',
  },
  {
    id: 'graduate',
    image: '/assets/graduate.jpg',
    title: '毕业新篇章',
    text: '我们陪伴彼此走过在墨大的五年时光，也一同完成了从“学生”到“打工人”的身份转变，生活有了新的节奏与目标。身份在变，节奏在变，但同甘共苦、并肩前行这件事一直没有变。',
  },
  {
    id: 'birthdays',
    image: '/assets/birthdays.jpg',
    title: '岁岁年年',
    text: '一年又一年，我们在每一次生日里为彼此庆祝，也许下一个又一个关于彼此的愿望。那些被认真记住的日子里，我们一起长大了一岁又一岁，也让相伴的岁月越走越长。',
  },
  {
    id: 'propose',
    image: '/assets/propose.jpg',
    title: '我愿意',
    text: '2025 年 5 月 20 日，一个普通工作日的夜晚，在两人生活的家里，熟悉的灯光映着精心准备的布置。一句“我愿意”，让这个家有了新的意义。',
  },
  {
    id: 'certificate',
    image: '/assets/certificate.jpg',
    title: '继续写下去',
    text: '2026年9月15日，我们在珠海领证，成为法律意义上的夫妻。故事并没有在这一天抵达终点，它只是换了一种更郑重的方式，继续向前。',
  },
]

const memoryOrder = [
  'firstday',
  'cities',
  'travel',
  'birthdays',
  'graduate',
  'melbourne',
  'propose',
  'certificate',
]

memories.sort((firstMemory, secondMemory) => {
  return memoryOrder.indexOf(firstMemory.id) - memoryOrder.indexOf(secondMemory.id)
})

const guestLetterBook: GuestLetterBook = {
  张三: '亲爱的张三：\n\n谢谢你一路以来的陪伴与见证。婚礼这一天，我们很想把这份喜悦第一个分享给你。期待在现场见到你，也期待一起留下新的回忆。',
  '李四、王五': '亲爱的朋友：\n\n谢谢你们出现在我们生命里那些重要又平凡的时刻。愿这一天的光、笑声和祝福，也成为我们共同珍藏的一页。',
}

const venue = {
  name: '天津市东凯悦酒店 二楼宴会厅1',
  address: '天津市河东区卫国道126号',
  latitude: 39.141997,
  longitude: 117.247868,
}

const coverTopSpaceRatio = 0.1
const guestCountOptions = ['请选择宾客数量', '1', '2', '3', '4', '5', '更多']

function buildMemoryDots(activeIndex: number): MemoryDot[] {
  return memories.map((memory, index) => ({
    id: memory.id,
    active: index === activeIndex,
  }))
}

function shouldDisableSectionSwipe(currentSection: number, coverAtBottom: boolean) {
  return currentSection === 0 && !coverAtBottom
}

function normalizeGuestName(name: string) {
  return name.trim().replace(/\s+/g, '')
}

function getGuestNameValidationError(name: string) {
  if (!name) {
    return '请填写姓名'
  }

  if (!/^[\u3400-\u4dbf\u4e00-\u9fff]{2,4}$/u.test(name)) {
    return '姓名须为 2–4 个中文字符，不能包含数字、英文或特殊符号'
  }

  return null
}

function findGuestLetter(name: string) {
  const normalizedName = normalizeGuestName(name)

  return Object.keys(guestLetterBook).reduce<string | null>((matchedLetter, key) => {
    if (matchedLetter) {
      return matchedLetter
    }

    const names = key.split(/[、,，\/|]/).map(normalizeGuestName)
    return names.includes(normalizedName) ? guestLetterBook[key] : null
  }, null)
}

Component({
  data: {
    currentSection: 0,
    coverAtBottom: false,
    coverTouchStartY: 0,
    coverViewportHeight: 0,
    sectionSwipeDisabled: true,
    currentMemory: 0,
    memories,
    memoryDots: buildMemoryDots(0),
    guestName: '',
    guestCountOptions,
    guestCountIndex: 0,
    selectedGuestCount: guestCountOptions[0],
    showLetterModal: false,
    activeLetter: '',
  },

  lifetimes: {
    attached() {
      const systemInfo = wx.getSystemInfoSync()

      this.setData({
        coverViewportHeight: systemInfo.windowHeight,
      })
    },
  },

  methods: {
    onSectionChange(event: WechatMiniprogram.SwiperChange) {
      const currentSection = event.detail.current

      this.setData({
        currentSection,
        sectionSwipeDisabled: shouldDisableSectionSwipe(currentSection, this.data.coverAtBottom),
      })
    },

    onCoverImageLoad(event: CoverImageLoadEvent) {
      const { width, height } = event.detail

      if (!width || !height || !this.data.coverViewportHeight) {
        return
      }

      const systemInfo = wx.getSystemInfoSync()
      const renderedHeight = (height / width) * systemInfo.windowWidth
      const contentHeight = renderedHeight + systemInfo.windowHeight * coverTopSpaceRatio

      const coverAtBottom = contentHeight <= this.data.coverViewportHeight + 2

      this.setData({
        coverAtBottom,
        sectionSwipeDisabled: shouldDisableSectionSwipe(this.data.currentSection, coverAtBottom),
      })
    },

    onCoverScroll(event: CoverScrollEvent) {
      const { scrollTop, scrollHeight } = event.detail

      if (!scrollHeight || !this.data.coverViewportHeight) {
        return
      }

      const maxScrollTop = Math.max(scrollHeight - this.data.coverViewportHeight, 0)

      const coverAtBottom = scrollTop >= maxScrollTop - 12

      this.setData({
        coverAtBottom,
        sectionSwipeDisabled: shouldDisableSectionSwipe(this.data.currentSection, coverAtBottom),
      })
    },

    onCoverScrollToLower() {
      this.setData({
        coverAtBottom: true,
        sectionSwipeDisabled: false,
      })
    },

    onCoverTouchStart(event: WechatMiniprogram.TouchEvent) {
      const touch = event.touches[0]

      if (!touch) {
        return
      }

      this.setData({
        coverTouchStartY: touch.clientY,
      })
    },

    onCoverTouchEnd(event: WechatMiniprogram.TouchEvent) {
      const touch = event.changedTouches[0]

      if (!touch) {
        return
      }

      const swipeDistance = touch.clientY - this.data.coverTouchStartY

      if (this.data.coverAtBottom && swipeDistance < -44) {
        this.setData({
          currentSection: 1,
          sectionSwipeDisabled: false,
        })
      }
    },

    onMemoryChange(event: WechatMiniprogram.SwiperChange) {
      const currentMemory = event.detail.current

      this.setData({
        currentMemory,
        memoryDots: buildMemoryDots(currentMemory),
      })
    },

    onGuestNameInput(event: WechatMiniprogram.Input) {
      this.setData({
        guestName: event.detail.value,
      })
    },

    onGuestCountChange(event: WechatMiniprogram.PickerChange) {
      const guestCountIndex = Number(event.detail.value)

      this.setData({
        guestCountIndex,
        selectedGuestCount: guestCountOptions[guestCountIndex],
      })
    },

    async submitGuestInfo() {
      const guestName = normalizeGuestName(this.data.guestName)
      const validationErrors: string[] = []
      const guestNameValidationError = getGuestNameValidationError(guestName)

      if (guestNameValidationError) {
        validationErrors.push(guestNameValidationError)
      }

      if (this.data.guestCountIndex === 0) {
        validationErrors.push('请选择宾客数量')
      }

      if (validationErrors.length) {
        wx.showModal({
          title: '',
          content: validationErrors.join('\n'),
          showCancel: false,
          confirmText: '我知道了',
        })
        return
      }

      try {
        const submitResult = await wx.cloud.callFunction({
          name: 'submitRsvp',
          data: {
            guestName,
            guestCount: this.data.selectedGuestCount,
          },
        })
        const result = submitResult.result as { success?: boolean; error?: string }

        if (!result.success) {
          wx.showModal({
            title: '',
            content: result.error || '提交失败，请稍后重试。',
            showCancel: false,
            confirmText: '我知道了',
          })
          return
        }
      } catch (error) {
        console.error('提交 RSVP 失败', error)
        wx.showModal({
          title: '',
          content: '提交失败，请检查网络后重试。',
          showCancel: false,
          confirmText: '我知道了',
        })
        return
      }

      if (!guestName) {
        wx.showToast({
          title: '请先填写姓名',
          icon: 'none',
        })
        return
      }

      const letter = findGuestLetter(guestName)

      if (letter) {
        this.setData({
          activeLetter: letter,
          showLetterModal: true,
        })
        return
      }

      wx.showModal({
        title: '',
        content: '感谢应邀，\n婚礼当天不见不散。',
        showCancel: false,
        confirmText: '好的',
      })
    },

    closeLetterModal() {
      this.setData({
        showLetterModal: false,
      })
    },

    openMap() {
      if (venue.latitude && venue.longitude) {
        wx.openLocation({
          name: venue.name,
          address: venue.address,
          latitude: venue.latitude,
          longitude: venue.longitude,
          scale: 16,
        })
        return
      }

      wx.setClipboardData({
        data: `${venue.name} ${venue.address}`,
        success: () => {
          wx.showModal({
            title: '导航信息已复制',
            content: '请在 index.ts 的 venue 中补充酒店经纬度后，即可直接调用微信地图导航。',
            showCancel: false,
            confirmText: '知道了',
          })
        },
      })
    },

    noop() {},
  },
})
