import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createFoodItemFormSchema } from '../foodItems/createFoodItems'

export const createAddressFormSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  lat: z.number(),
  lng: z.number(),
})

export const createCookFormSchema = z.object({
  name: z.string().min(1, 'Display name is required'),
  image: z.string().optional(),
  open: z.boolean(),
  about: z.string().min(1, 'About text is required'),
  address: createAddressFormSchema,
  foodItems: z.array(createFoodItemFormSchema),
})

export type FormTypeCreateCook = z.infer<typeof createCookFormSchema>

export const useFormCreateCook = () =>
  useForm<FormTypeCreateCook>({
    resolver: zodResolver(createCookFormSchema),
  })
