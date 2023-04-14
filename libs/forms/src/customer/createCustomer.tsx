import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createAddressFormSchema } from '../cook/createCook'

export const createCustomerFormSchema = z.object({
  name: z.string().min(1, 'Display name is required'),
  address: createAddressFormSchema.pick({
    address: true,
    lat: true,
    lng: true,
    zipCode: true,
  }),
})

export type FormTypeCreateCustomer = z.infer<typeof createCustomerFormSchema>

export const useFormCreateCustomer = () =>
  useForm<FormTypeCreateCustomer>({
    resolver: zodResolver(createCustomerFormSchema),
  })
