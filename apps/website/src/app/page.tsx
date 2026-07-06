import HeroSection from '@/components/HeroSection'
import Categories from '@/components/Categories'
import FeaturedProducts from '@/components/FeaturedProducts'
import WhyChoose from '@/components/WhyChoose'
import BecomeSeller from '@/components/BecomeSeller'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <WhyChoose />
      <BecomeSeller />
      <Testimonials />
    </>
  )
}
