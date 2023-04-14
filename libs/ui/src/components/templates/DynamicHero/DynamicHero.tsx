import { Button } from '@home-chefs-org/ui/src/components/atoms/Button'
import { Container } from '@home-chefs-org/ui/src/components/atoms/Container'
import { IconCoinRupee, IconSearch } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

export interface IDynamicHeroProps {}

export const HeroLayout = ({
  children,
  imgSrc,
}: {
  children: ReactNode
  imgSrc: string
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30, skewX: 6 }}
        animate={{ opacity: 1, y: 0, skewX: 0 }}
        exit={{ opacity: 0, y: 30, skewX: 6 }}
        transition={{ type: 'tween', ease: 'easeOut' }}
        className="h-[90vh] flex gap-4"
      >
        <div className="flex flex-col items-start flex-grow text-5xl ">
          {children}{' '}
        </div>
        <div className="w-full max-w-sm overflow-hidden origin-top -skew-x-6 rounded">
          <img
            alt="hero section"
            className="object-cover h-full scale-125 skew-x-6"
            src={imgSrc}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export const CustomerHero = ({
  setShowType,
}: {
  setShowType: Dispatch<SetStateAction<'CUSTOMER' | 'COOK'>>
}) => {
  const router = useRouter()
  return (
    <HeroLayout imgSrc="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80">
      <div className="flex flex-col items-start justify-center flex-grow">
        <div className="max-w-xl">
          Home-Cooked Meals, Made by{' '}
          <span className="font-black whitespace-no-wrap">Your Neighbors.</span>
        </div>

        <Button
          onClick={() => router.push('/kitchens')}
          className="flex items-center gap-2 mt-8"
        >
          <IconSearch className="w-5 h-5 -ml-2" /> Find Your Next Meal
        </Button>
      </div>

      <Button size="none" onClick={() => setShowType('COOK')} variant="text">
        Interested in cooking?
      </Button>
    </HeroLayout>
  )
}
export const CookHero = ({
  setShowType,
}: {
  setShowType: Dispatch<SetStateAction<'CUSTOMER' | 'COOK'>>
}) => {
  const router = useRouter()
  return (
    <HeroLayout imgSrc="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80">
      <div className="flex flex-col items-start justify-center flex-grow">
        <div className="max-w-xl">
          Sell food from your <span className="font-black">own kitchen.</span>
        </div>

        <Button
          className="flex gap-2 mt-8"
          onClick={() => router.push('/cook')}
        >
          <IconCoinRupee className="w-5 h-5 -ml-2" />
          Sell food from your kitchen
        </Button>
      </div>

      <Button onClick={() => setShowType('CUSTOMER')} variant="text">
        Find Your Next Meal?
      </Button>
    </HeroLayout>
  )
}

export const DynamicHero = ({}: IDynamicHeroProps) => {
  const [showType, setShowType] = useState<'CUSTOMER' | 'COOK'>('CUSTOMER')
  return (
    <>
      <Container>
        {showType === 'CUSTOMER' ? (
          <CustomerHero setShowType={setShowType} />
        ) : (
          <CookHero setShowType={setShowType} />
        )}
      </Container>
    </>
  )
}
