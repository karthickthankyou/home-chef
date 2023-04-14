import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createCookFormSchema } from './createCook'

export const updateCookFormSchema = createCookFormSchema.partial().pick({
  about: true,
  address: true,
  image: true,
  name: true,
})
export type FormTypeUpdateCook = z.infer<typeof updateCookFormSchema>

export const useFormUpdateCook = ({
  defaultValues,
}: {
  defaultValues: FormTypeUpdateCook
}) =>
  useForm<FormTypeUpdateCook>({
    resolver: zodResolver(updateCookFormSchema),
    defaultValues,
  })
