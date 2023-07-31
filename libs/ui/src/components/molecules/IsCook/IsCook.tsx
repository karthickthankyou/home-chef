import {
  CookMeQuery,
  useCookMeQuery,
} from '@home-chefs-org/network/src/generated'
import { LoaderPanel } from '../Loader'
import { ReactNode } from 'react'
import { BecomeCook } from '../../organisms/BecomeCook'

type RenderPropChild = (cook: CookMeQuery['cookMe']) => ReactNode

export interface IIsCookProps {
  children: RenderPropChild | ReactNode
  uid: string
}

export const IsCook = ({ uid, children }: IIsCookProps) => {
  const { data, loading } = useCookMeQuery()
  if (loading) {
    return <LoaderPanel />
  }

  if (!data?.cookMe) {
    return <BecomeCook uid={uid} />
  }

  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.cookMe)
        : children}
    </>
  )
}
