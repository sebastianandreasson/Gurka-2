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
