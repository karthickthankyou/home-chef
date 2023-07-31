import { ReactNode, useState } from 'react'
export interface IRevealProps {
  secret: ReactNode
  className?: string
}

export const Reveal = ({ secret, className }: IRevealProps) => {
  const [revealed, setRevealed] = useState(false)

  return (
    <button
      className={`flex rounded flex-col items-center gap-2 border border-gray px-2 py-1 transition-all ${className} ${
        revealed ? 'shadow-lg' : ''
      }`}
      onClick={() => setRevealed((state) => !state)}
    >
      {revealed ? (
        <span className={`text-xs tracking-wider  px-1`}>{secret}</span>
      ) : (
        <span className="text-xs ">Show</span>
      )}
    </button>
  )
}
