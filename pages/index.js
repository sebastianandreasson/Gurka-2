import { useImages } from '../state/hooks'
import Image from 'next/image'

export default function Home() {
  const images = useImages()

  console.log(images)

  return (
    <div>
      {images.map((i) => (
        <Image src={i.url} width={200} height={500} />
      ))}
    </div>
  )
}
