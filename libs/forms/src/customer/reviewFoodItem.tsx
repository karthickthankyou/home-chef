import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const reviewFoodItemFormSchema = z.object({
  text: z.string(),
  rating: z.number().max(5).min(1),
})

export type FormTypeReviewFoodItem = z.infer<typeof reviewFoodItemFormSchema>

export const useFormReviewFoodItem = ({
  defaultValues = { rating: 1, text: '' },
}: {
  defaultValues?: FormTypeReviewFoodItem
}) =>
  useForm<FormTypeReviewFoodItem>({
    resolver: zodResolver(reviewFoodItemFormSchema),
    defaultValues,
  })
