import { Day } from '@home-chefs-org/network/src/generated'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const createFoodItemFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number(),
  image: z.string().optional(),
  maxQuantity: z.number(),
  time: z.string(),
  live: z.boolean(),
  deliveryAvailable: z.boolean(),
  vegan: z.boolean(),
  days: z.nativeEnum(Day).array().min(1, 'Select at least one day.'),
})

export type FormTypeCreateFoodItem = z.infer<typeof createFoodItemFormSchema>

export const useFormCreateFoodItem = ({
  defaultValues,
}: {
  defaultValues: FormTypeCreateFoodItem
}) =>
  useForm<FormTypeCreateFoodItem>({
    resolver: zodResolver(createFoodItemFormSchema),
    defaultValues,
  })
