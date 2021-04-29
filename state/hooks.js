import { useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { imagesAtom, gurkAtom, profilePicturesAtom } from './index'

export const useImages = () => {
  const [images, setImages] = useRecoilState(imagesAtom)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/images?type=front')
      const data = await res.json()
      setImages(data)
    }
    getData()
  }, [setImages])

  return images
}

export const useProfilePictures = () => {
  const [profilePictures, setProfilePictures] = useRecoilState(
    profilePicturesAtom
  )

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/images?type=top')
      const data = await res.json()
      setProfilePictures(data)
    }
    getData()
  }, [setProfilePictures])

  return profilePictures
}

export const useGurkor = () => {
  const [gurkor, setGurkor] = useRecoilState(gurkAtom)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/gurkor')
      const data = await res.json()
      setGurkor(data.sort((a, b) => a.position - b.position))
    }
    getData()
  }, [setGurkor])

  return gurkor
}
