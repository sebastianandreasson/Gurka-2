import { useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { imagesAtom, gurkAtom } from './index'

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

export const useGurkor = () => {
  const [gurkor, setGurkor] = useRecoilState(gurkAtom)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/gurkor')
      const data = await res.json()
      setGurkor(data)
    }
    getData()
  }, [setGurkor])

  return gurkor
}
