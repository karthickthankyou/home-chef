import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createFoodItemFormSchema } from './createFoodItems'

export const updateFoodItemFormSchema = createFoodItemFormSchema.pick({
  description: true,
  image: true,
  maxQuantity: true,
  name: true,
  price: true,
  time: true,
  days: true,
})

export type FormTypeUpdateFoodItem = z.infer<typeof updateFoodItemFormSchema>

export const useFormUpdateFoodItem = ({
  defaultValues,
}: {
  defaultValues: FormTypeUpdateFoodItem
}) =>
  useForm<FormTypeUpdateFoodItem>({
    resolver: zodResolver(updateFoodItemFormSchema),
    defaultValues,
  })
