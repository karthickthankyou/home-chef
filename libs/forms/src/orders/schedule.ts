import { zodResolver } from '@hookform/resolvers/zod'
import { Day } from '@home-chefs-org/network/src/generated'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const createScheduleFormSchema = z.object({
  quantity: z.number(),
  live: z.boolean(),
  days: z.nativeEnum(Day).array().min(1, 'Select at least one day.'),
})

export type FormTypeCreateSchedule = z.infer<typeof createScheduleFormSchema>

export const useFormCreateSchedule = ({
  defaultValues,
}: {
  defaultValues: FormTypeCreateSchedule
}) =>
  useForm<FormTypeCreateSchedule>({
    resolver: zodResolver(createScheduleFormSchema),
    defaultValues,
  })
