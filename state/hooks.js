import { useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { useMutation, useQuery } from 'urql'
import { imagesAtom, gurkAtom } from './index'

const ImageQuery = `
{
  getImages(type: "front", _size: 5000) {
    data {
      taken
      url
    }
  }
}
`

export const useImages = () => {
  const [images, setImages] = useRecoilState(imagesAtom)
  const [result] = useQuery({
    query: ImageQuery,
  })
  const { data } = result

  useEffect(() => {
    if (!!data) {
      setImages(data.getImages.data)
    }
  }, [data, setImages])

  return images
}

const GurkQuery = `
{
  allGurkor {
    data {
      name
      species
      hobby
      bio
      personality
      position
      votes
    }
  }
}
`

export const useGurkor = () => {
  const [gurkor, setGurkor] = useRecoilState(gurkAtom)
  const [result] = useQuery({
    query: GurkQuery,
  })
  const { data } = result

  useEffect(() => {
    if (!!data) {
      setGurkor(data.allGurkor.data)
    }
  }, [data, setGurkor])

  return gurkor
}
