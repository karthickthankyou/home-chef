import { BrandIcon } from '../BrandIcon'

export interface IBrandProps {
  shortForm?: boolean
  className?: string
}

export const Brand = ({ shortForm = false, className }: IBrandProps) => {
  return (
    <div className={`grid place-items-center ${className}`}>
      <div className="flex items-center gap-1 tracking-tighter font-playfair">
        <BrandIcon animate className="mb-1 stroke-2 " />{' '}
        <div>
          <div className="text-xl">Home Chefs</div>
          <div className="text-xs">Karthick Ragavendran</div>
        </div>
      </div>
    </div>
  )
}
