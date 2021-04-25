import { useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { useMutation, useQuery } from 'urql'
import { imagesAtom } from './index'

const ImageQuery = `
{
  allImages(_size: 5000) {
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
      setImages(data.allImages.data)
    }
  }, [data, setImages])

  return images
}
