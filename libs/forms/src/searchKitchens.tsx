import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export const formSchemaSearchKitchens = z.object({
  locationFilter: z.object({
    nw_lat: z.number(),
    nw_lng: z.number(),
    se_lat: z.number(),
    se_lng: z.number(),
  }),
})

export type FormTypeSearchKitchens = z.infer<typeof formSchemaSearchKitchens>

export const useFormSearchKitchens = () =>
  useForm<FormTypeSearchKitchens>({
    resolver: zodResolver(formSchemaSearchKitchens),
  })

export const FormProviderSearchKitchens = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useForm<FormTypeSearchKitchens>({
    resolver: zodResolver(formSchemaSearchKitchens),
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
