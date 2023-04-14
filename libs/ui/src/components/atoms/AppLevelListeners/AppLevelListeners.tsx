import { useUserListener } from '@home-chefs-org/hooks/src/user'
import { useNotification } from '@home-chefs-org/hooks/src/notifications'

export interface IAppLevelListenersProps {}

export const AppLevelListeners = () => {
  useUserListener()
  useNotification()
  return null
}
