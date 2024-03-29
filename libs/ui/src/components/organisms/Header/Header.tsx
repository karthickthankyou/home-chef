import Link from 'next/link'

import { IconDoorExit, IconMenu2, IconUser } from '@tabler/icons-react'

import { Sidebar } from '../Sidebar'

import { Dispatch, SetStateAction, useState } from 'react'

import { Brand } from '../../atoms/Brand'

import { signOut } from '@home-chefs-org/network/src/auth'
import { useAppSelector } from '@home-chefs-org/store'
import { Role, selectUser } from '@home-chefs-org/store/user'
import { MenuItem } from '@home-chefs-org/types'
import { Button } from '../../atoms/Button'
import { Container } from '../../atoms/Container'

export const NavLink = ({ label, href }: { label: string; href: string }) => (
  <Link
    key={label}
    href={href}
    className="text-sm hover:text-black hover:underline underline-offset-4"
  >
    {label}
  </Link>
)

const NavSidebarUser = ({
  open,
  setOpen,
  menuItems,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  menuItems?: MenuItem[]
}) => {
  const user = useAppSelector(selectUser)

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <Sidebar.Header>
        <div className="text-white -skew-y-6 bg-black ">
          <div className="flex items-end justify-between">
            <div className="text-xl">
              <div className="max-w-xs pt-8 pb-2 pl-2 pr-8 text-5xl font-bold">
                Hey there!{' '}
                {user.uid ? (
                  <span className="text-primary">{user.displayName}</span>
                ) : (
                  'Visitor.'
                )}
              </div>
            </div>
          </div>
          <div className="absolute left-0 w-2 h-12 bg-black" />
          <div className="absolute right-0 w-2 h-12 bg-black" />
        </div>
      </Sidebar.Header>
      <Sidebar.Body>
        <div className="flex flex-col items-start w-full pt-12">
          <div className="py-1 bg-gray-100 h-0.5" />
          {menuItems?.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="py-1.5 font-medium hover:underline text-gray-600 capitalize"
            >
              {label}
            </Link>
          ))}
        </div>
      </Sidebar.Body>
      <Sidebar.Footer>
        {!user.uid ? (
          <>
            <Link
              href="/login"
              className="py-2 block w-full border border-black rounded text-black text-center mt-1.5 font-medium capitalize"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="py-2 block w-full bg-black font-medium rounded border border-black  text-white text-center mt-1.5 capitalize"
            >
              Create account
            </Link>
          </>
        ) : (
          <>
            <Link href={`/user/${user.uid}`} className="flex items-center ">
              {user.displayName || ''}
            </Link>

            <Button
              variant="text"
              onClick={async () => await signOut()}
              className="flex items-center gap-2"
            >
              Log out <IconDoorExit />
            </Button>
          </>
        )}
      </Sidebar.Footer>
    </Sidebar>
  )
}

export const NavSidebar = ({
  open,
  setOpen,
  menuItems,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  menuItems?: MenuItem[]
}) => {
  const user = useAppSelector(selectUser)

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <Sidebar.Header>
        <Brand shortForm />
      </Sidebar.Header>
      <Sidebar.Body>
        <div className="flex flex-col items-start space-y-1">
          {menuItems?.map(({ label, href }) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}

          <div className="py-2" />
        </div>
      </Sidebar.Body>
      <Sidebar.Footer>
        {!user ? (
          <>
            <Link
              href="/login"
              className="py-2 block w-full border border-black  text-black text-center mt-1.5 font-medium capitalize"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="py-2 block w-full bg-black font-medium border border-black  text-white text-center mt-1.5 capitalize"
            >
              Create account
            </Link>
          </>
        ) : (
          <Link href={`/user/${user.uid}`} className="flex items-center ">
            {user.uid || ''}
          </Link>
        )}
      </Sidebar.Footer>
    </Sidebar>
  )
}

export type IHeaderProps = {
  menuItems?: MenuItem[]
  sideMenuItems?: MenuItem[]
  type?: Role
}

export const Header = ({ menuItems, sideMenuItems, type }: IHeaderProps) => {
  const [open, setOpen] = useState(false)
  const [openUser, setOpenUser] = useState(false)
  const user = useAppSelector(selectUser)

  return (
    <header className="z-40 bg-white">
      <nav className="fixed top-0 w-full shadow-md shadow-gray-300/10 bg-white/50 backdrop-blur-md">
        <Container className="relative z-50 flex items-center justify-between h-16 py-2">
          <NavSidebar open={open} setOpen={setOpen} menuItems={menuItems} />
          <NavSidebarUser
            open={openUser}
            setOpen={setOpenUser}
            menuItems={sideMenuItems}
          />
          <div className="relative z-10 flex items-center justify-between w-full gap-16">
            <Link href="/" aria-label="Home" className="w-auto">
              <Brand className="hidden h-10 -ml-2 sm:block" />
              <Brand shortForm className="block sm:hidden" />
            </Link>
            <div className="items-center hidden ml-auto lg:flex lg:gap-10">
              {menuItems?.map(({ label, href }) => (
                <NavLink label={label} href={href} key={label} />
              ))}
            </div>
            <div className="flex items-center">
              {!user ? (
                <>
                  <Link href="/register">
                    <Button variant="outlined" className="hidden md:block">
                      Create account
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button>Log in</Button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => setOpenUser((state) => !state)}
                  type="button"
                  className="p-1 rounded-full"
                >
                  <IconUser className="w-5 h-5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen((state) => !state)}
                className="p-2 lg:hidden"
                aria-label="Open main menu"
              >
                <IconMenu2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </nav>
      <div className="h-16" />
    </header>
  )
}
