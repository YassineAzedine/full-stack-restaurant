import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Slider from '@/components/Slider'
import FeaturedServer from './components/FeaturedServer'

export default function Home() {
  return (
    <main>
      <Slider/>
      <FeaturedServer/>
      <Offer/>
    </main>
  )
}
