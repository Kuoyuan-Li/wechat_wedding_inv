import { guestLetters, GuestLetter } from '../../data/guestLetters'

type MemoryItem = {
  id: string
  image: string
  title: string
  text: string
}

type MemoryDot = {
  id: string
  active: boolean
}

type WeddingPhoto = {
  id: string
  image: string
}

type CoverScrollEvent = WechatMiniprogram.CustomEvent<{
  scrollTop: number
  scrollHeight: number
}>

type CoverImageLoadEvent = WechatMiniprogram.CustomEvent<{
  width: number
  height: number
}>

type ImageErrorEvent = WechatMiniprogram.CustomEvent<{
  errMsg: string
}>

type PreloadImage = {
  id: string
  src: string
}

type PreloadImageEvent = WechatMiniprogram.CustomEvent<{
  errMsg?: string
}>

type CloudTempFile = {
  fileID: string
  tempFileURL: string
  status: number
  errMsg?: string
}

type CloudTempFileURLResult = {
  fileList: CloudTempFile[]
}

const coverImage = 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/assets/wedding_inv_landing.jpg'

const weddingPhotos: WeddingPhoto[] = Array.from({ length: 12 }, (_, index) => {
  const photoNumber = index + 1

  return {
    id: `wedding-photo-${photoNumber}`,
    image: `cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/assets/hunsha/${photoNumber}.jpg`,
  }
})

const memories: MemoryItem[] = [
  {
    id: 'firstday',
    image: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/assets/firstday.jpg',
    title: '2月10号',
    text: '2018 年，在我们来到墨尔本的第二学期，因机缘巧合分到了同一节英语课，成为同学。但或许不是机缘巧合，而是天赐良机。那份双向的一见钟情，是磁铁的正负极彼此吸引。那枚承载心意的潘多拉戒指，让我们在情人节前，从同学变成了恋人。',
  },
  {
    id: 'cities',
    image: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/assets/tianjin-zhuhai.jpg',
    title: '我来到你的城市',
    text: '第一次去珠海，第一次去天津，我们走进了彼此长大的街道，那些关于各自成长的故事，也不再只是口述。如今，这些城市也不再只是地图上的坐标，而成了彼此的第二个家。',
  },
  {
    id: 'melbourne',
    image: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/assets/melbourne.jpg',
    title: '琐碎而珍贵的日常',
    text: '疫情、游戏、健身、钓鱼、徒步、澳网、温泉、演唱会，还有许多柴米油盐的日常与并肩散步的夜晚。生活并非每天都与众不同，却因彼此的陪伴，在平凡里闪闪发光。',
  },
  {
    id: 'travel',
    image: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/assets/travel.jpg',
    title: '旅行的足迹',
    text: '从 2018 年的悉尼开始，我们把许多城市与国家走成了共同记忆：每天一杯泰奶的泰国、在大堡礁下海浮潜的凯恩斯、蓝花楹盛开的布里斯班、过山车坐到头晕的黄金海岸、特种兵式打卡的日本，以及挑战高反、尽享风光的云南。',
  },
  {
    id: 'graduate',
    image: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/assets/graduate.jpg',
    title: '毕业新篇章',
    text: '我们陪伴彼此走过在墨大的五年时光，也一同完成了从“学生”到“打工人”的身份转变，生活有了新的节奏与目标。身份在变，节奏在变，但同甘共苦、并肩前行这件事一直没有变。',
  },
  {
    id: 'birthdays',
    image: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/assets/birthdays.jpg',
    title: '岁岁年年',
    text: '一年又一年，我们在每一次生日里为彼此庆祝，也许下一个又一个关于彼此的愿望。那些被认真记住的日子里，我们一起长大了一岁又一岁，也让相伴的岁月越走越长。',
  },
  {
    id: 'propose',
    image: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/assets/propose.jpg',
    title: '我愿意',
    text: '2025 年 5 月 20 日，一个普通工作日的夜晚，在两人生活的家里，熟悉的灯光映着精心准备的布置。一句“我愿意”，让这个家有了新的意义。',
  },
  {
    id: 'certificate',
    image: 'cloud://cloud1-d1gek8gnz6aeceff4.636c-cloud1-d1gek8gnz6aeceff4-1478552519/assets/certificate.jpg',
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

const venue = {
  name: '天津市东凯悦酒店 二楼宴会厅1',
  address: '天津市河东区卫国道126号',
  latitude: 39.141997,
  longitude: 117.247868,
}

const posterTopSpaceRatio = 0.1
const guestCountOptions = ['请选择宾客数量', '无法赴约', '1', '2', '3', '4', '5', '更多']

function buildMemoryDots(activeIndex: number): MemoryDot[] {
  return memories.map((memory, index) => ({
    id: memory.id,
    active: index === activeIndex,
  }))
}

function buildWeddingPhotoDots(activeIndex: number): MemoryDot[] {
  return weddingPhotos.map((photo, index) => ({
    id: photo.id,
    active: index === activeIndex,
  }))
}

function shouldDisableSectionSwipe(currentSection: number, coverAtBottom: boolean, detailAtBottom: boolean) {
  return (currentSection === 0 && !coverAtBottom) || (currentSection === 4 && !detailAtBottom)
}

function normalizeGuestName(name: string) {
  return name.trim().replace(/\s+/g, '')
}

function resolveCloudImageUrls(fileIDs: string[]) {
  if (!wx.cloud) {
    return Promise.resolve({} as Record<string, string>)
  }

  const cloudApi = wx.cloud as unknown as {
    getTempFileURL(options: {
      fileList: string[]
      success(result: CloudTempFileURLResult): void
      fail(error: WechatMiniprogram.GeneralCallbackResult): void
    }): void
  }

  return new Promise<Record<string, string>>((resolve) => {
    cloudApi.getTempFileURL({
      fileList: fileIDs,
      success: (result) => {
        const imageUrlByFileID: Record<string, string> = {}

        result.fileList.forEach((file) => {
          if (file.status === 0 && file.tempFileURL) {
            imageUrlByFileID[file.fileID] = file.tempFileURL
            return
          }

          console.warn('云存储图片临时链接获取失败', file)
        })

        console.info('云存储图片临时链接获取结果', result.fileList)
        resolve(imageUrlByFileID)
      },
      fail: (error) => {
        console.error('获取云存储图片临时链接失败', error)
        resolve({})
      },
    })
  })
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

function findGuestLetter(name: string): GuestLetter | null {
  const normalizedName = normalizeGuestName(name)

  return guestLetters.find((letter) => {
    return letter.names.map(normalizeGuestName).includes(normalizedName)
  }) || null
}

let letterAnimationToken = 0
let loadedAssetKeys = new Set<string>()

Component({
  data: {
    currentSection: 0,
    assetsReady: false,
    imageUrlsReady: false,
    loadingProgress: 0,
    loadedImageCount: 0,
    totalImageCount: memories.length + weddingPhotos.length + 1,
    preloadImages: [] as PreloadImage[],
    coverAtBottom: false,
    coverTouchStartY: 0,
    coverViewportHeight: 0,
    detailAtBottom: false,
    detailTouchStartY: 0,
    sectionSwipeDisabled: true,
    currentMemory: 0,
    currentWeddingPhoto: 0,
    coverImage,
    weddingPhotos,
    weddingPhotoDots: buildWeddingPhotoDots(0),
    memories,
    memoryDots: buildMemoryDots(0),
    guestName: '',
    guestCountOptions,
    guestCountIndex: 0,
    selectedGuestCount: guestCountOptions[0],
    submitting: false,
    showLetterModal: false,
    activeLetter: null as GuestLetter | null,
    letterStage: 'closed',
  },

  lifetimes: {
    attached() {
      const systemInfo = wx.getSystemInfoSync()

      this.setData({
        coverViewportHeight: systemInfo.windowHeight,
      })

      const cloudImageFileIDs = [
        coverImage,
        ...weddingPhotos.map((photo) => photo.image),
        ...memories.map((memory) => memory.image),
      ]

      void resolveCloudImageUrls(cloudImageFileIDs).then((imageUrlByFileID) => {
        const resolvedCoverImage = imageUrlByFileID[coverImage] || coverImage
        const resolvedWeddingPhotos = weddingPhotos.map((photo) => ({
          ...photo,
          image: imageUrlByFileID[photo.image] || photo.image,
        }))
        const resolvedMemories = memories.map((memory) => ({
          ...memory,
          image: imageUrlByFileID[memory.image] || memory.image,
        }))
        const imageUrls = [
          resolvedCoverImage,
          ...resolvedWeddingPhotos.map((photo) => photo.image),
          ...resolvedMemories.map((memory) => memory.image),
        ]
        loadedAssetKeys = new Set<string>()

        this.setData({
          assetsReady: false,
          imageUrlsReady: true,
          coverImage: resolvedCoverImage,
          weddingPhotos: resolvedWeddingPhotos,
          memories: resolvedMemories,
          preloadImages: imageUrls.map((imageUrl, index) => ({
            id: `asset-${index}`,
            src: imageUrl,
          })),
          loadedImageCount: 0,
          loadingProgress: 0,
          totalImageCount: imageUrls.length,
        })
      })
    },
  },

  methods: {
    onSectionChange(event: WechatMiniprogram.SwiperChange) {
      const currentSection = event.detail.current

      this.setData({
        currentSection,
        sectionSwipeDisabled: shouldDisableSectionSwipe(
          currentSection,
          this.data.coverAtBottom,
          this.data.detailAtBottom,
        ),
      })
    },

    onCoverImageLoad(event: CoverImageLoadEvent) {
      const { width, height } = event.detail

      if (!width || !height || !this.data.coverViewportHeight) {
        return
      }

      const systemInfo = wx.getSystemInfoSync()
      const renderedHeight = (height / width) * systemInfo.windowWidth
      const contentHeight = renderedHeight + systemInfo.windowHeight * posterTopSpaceRatio

      const coverAtBottom = contentHeight <= this.data.coverViewportHeight + 2

      this.setData({
        coverAtBottom,
        sectionSwipeDisabled: shouldDisableSectionSwipe(
          this.data.currentSection,
          coverAtBottom,
          this.data.detailAtBottom,
        ),
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
        sectionSwipeDisabled: shouldDisableSectionSwipe(
          this.data.currentSection,
          coverAtBottom,
          this.data.detailAtBottom,
        ),
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

    onDetailImageLoad(event: CoverImageLoadEvent) {
      const { width, height } = event.detail

      if (!width || !height || !this.data.coverViewportHeight) {
        return
      }

      const systemInfo = wx.getSystemInfoSync()
      const renderedHeight = (height / width) * systemInfo.windowWidth
      const contentHeight = renderedHeight + systemInfo.windowHeight * posterTopSpaceRatio

      const detailAtBottom = contentHeight <= this.data.coverViewportHeight + 2

      this.setData({
        detailAtBottom,
        sectionSwipeDisabled: shouldDisableSectionSwipe(
          this.data.currentSection,
          this.data.coverAtBottom,
          detailAtBottom,
        ),
      })
    },

    onDetailScroll(event: CoverScrollEvent) {
      const { scrollTop, scrollHeight } = event.detail

      if (!scrollHeight || !this.data.coverViewportHeight) {
        return
      }

      const maxScrollTop = Math.max(scrollHeight - this.data.coverViewportHeight, 0)
      const detailAtBottom = scrollTop >= maxScrollTop - 12

      this.setData({
        detailAtBottom,
        sectionSwipeDisabled: shouldDisableSectionSwipe(
          this.data.currentSection,
          this.data.coverAtBottom,
          detailAtBottom,
        ),
      })
    },

    onDetailScrollToLower() {
      this.setData({
        detailAtBottom: true,
        sectionSwipeDisabled: false,
      })
    },

    onDetailTouchStart(event: WechatMiniprogram.TouchEvent) {
      const touch = event.touches[0]

      if (!touch) {
        return
      }

      this.setData({
        detailTouchStartY: touch.clientY,
      })
    },

    onDetailTouchEnd(event: WechatMiniprogram.TouchEvent) {
      const touch = event.changedTouches[0]

      if (!touch) {
        return
      }

      const swipeDistance = touch.clientY - this.data.detailTouchStartY

      if (this.data.detailAtBottom && swipeDistance < -44) {
        this.setData({
          currentSection: 5,
          sectionSwipeDisabled: false,
        })
      }
    },

    onWeddingPhotoChange(event: WechatMiniprogram.SwiperChange) {
      const currentWeddingPhoto = event.detail.current

      this.setData({
        currentWeddingPhoto,
        weddingPhotoDots: buildWeddingPhotoDots(currentWeddingPhoto),
      })
    },

    previewWeddingPhoto(event: WechatMiniprogram.TouchEvent) {
      const current = String(event.currentTarget.dataset.src || '')
      const urls = this.data.weddingPhotos.map((photo) => photo.image)

      wx.previewImage({
        current: current || urls[this.data.currentWeddingPhoto],
        urls,
      })
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

      if (this.data.submitting) {
        return
      }

      this.setData({
        submitting: true,
      })

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
      } finally {
        this.setData({
          submitting: false,
        })
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
        const animationToken = letterAnimationToken + 1
        letterAnimationToken = animationToken

        this.setData({
          activeLetter: letter,
          showLetterModal: true,
          letterStage: 'closed',
        })

        setTimeout(() => {
          if (letterAnimationToken !== animationToken) {
            return
          }

          this.setData({
            letterStage: 'opening',
          })
        }, 300)

        setTimeout(() => {
          if (letterAnimationToken !== animationToken) {
            return
          }

          this.setData({
            letterStage: 'open',
          })
        }, 1800)

        return
      }

      const responseMessage = this.data.selectedGuestCount === '无法赴约'
        ? '遗憾不能现场相见，\n谢谢你的祝福。'
        : '感谢应邀，\n婚礼当天不见不散。'

      wx.showModal({
        title: '',
        content: responseMessage,
        showCancel: false,
        confirmText: '好的',
      })
    },

    closeLetterModal() {
      letterAnimationToken += 1

      this.setData({
        showLetterModal: false,
        activeLetter: null,
        letterStage: 'closed',
      })
    },

    onCloudImageError(event: ImageErrorEvent) {
      console.error('云端图片加载失败', {
        src: event.currentTarget.dataset.src,
        error: event.detail,
      })
    },

    onPreloadImageLoad(event: PreloadImageEvent) {
      const key = String(event.currentTarget.dataset.key || '')

      if (!key || loadedAssetKeys.has(key)) {
        return
      }

      loadedAssetKeys.add(key)

      const loadedImageCount = loadedAssetKeys.size
      const totalImageCount = this.data.totalImageCount || 1
      const loadingProgress = Math.round((loadedImageCount / totalImageCount) * 100)

      this.setData({
        loadedImageCount,
        loadingProgress,
        assetsReady: loadedImageCount >= totalImageCount,
      })
    },

    onPreloadImageError(event: PreloadImageEvent) {
      console.warn('Preload image failed, waiting until the image can be loaded', {
        src: event.currentTarget.dataset.src,
        error: event.detail,
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
