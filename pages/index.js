import { useImages } from '../state/hooks'
import ImageSlider from '../components/ImageSlider'

export default function Home() {
  useImages()

  return (
    <div>
      <ImageSlider />
    </div>
  )
}
