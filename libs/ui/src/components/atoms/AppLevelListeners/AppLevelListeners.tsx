import { useNotification } from '@home-chefs-org/hooks/src/notifications'
import { useUserListener } from '@home-chefs-org/hooks/src/user'

export interface IAppLevelListenersProps {}

export const AppLevelListeners = () => {
  useUserListener()
  useNotification()
  return null
}
