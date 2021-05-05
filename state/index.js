import moment from 'moment'
import { atom, selector, selectorFamily } from 'recoil'

export const imagesAtom = atom({
  key: 'images',
  default: [],
})

export const profilePicturesAtom = atom({
  key: 'profile-pictures',
  default: [],
})

export const gurkAtom = atom({
  key: 'gurkor',
  default: [],
})

export const profilePictureSelector = selector({
  key: 'profile-picture',
  get: ({ get }) => {
    const profilePictures = get(profilePicturesAtom)

    return profilePictures[profilePictures.length - 1]
  },
})

export const currentlyChattingAtom = atom({
  key: 'currently-chatting',
  default: null,
})

export const activeGurkaSelector = selector({
  key: 'active-gurka',
  get: ({ get }) => {
    const currentlyChatting = get(currentlyChattingAtom)
    const gurkor = get(gurkAtom)

    return gurkor.find((g) => g.name === currentlyChatting)
  },
})

export const ageOfGurkSelector = selector({
  key: 'age-of-gurk',
  get: ({ get }) => {
    const images = get(imagesAtom)
    const firstImage = images[0]

    if (firstImage) {
      return moment().diff(moment(firstImage.date), 'days')
    }
    return 0
  },
})

export const chatsAtom = atom({
  key: 'chat',
  default: {},
})

export const activeChatSelector = selector({
  key: 'active-chat',
  get: ({ get }) => {
    const chats = get(chatsAtom)
    const name = get(currentlyChattingAtom)

    if (chats[name]) return chats[name]

    return []
  },
})
