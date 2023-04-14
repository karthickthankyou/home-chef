import { Subject } from 'rxjs'
import { NotificationType } from '@home-chefs-org/types'

export const notification$ = new Subject<Omit<NotificationType, 'id'>>()
