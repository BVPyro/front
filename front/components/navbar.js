import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  UserIcon,
  // OfficeBuildingIcon,
  // CogIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// TODO add donation item
const support = [
  {
    name: 'Mitglied werden',
    description:
      'Du lebst für das Feuerwerk und willst uns als Privatperson unterstützen',
    href: '/mitglied-werden',
    icon: UserIcon,
  },
  // {
  //   name: 'Firmenmitglied werden',
  //   description:
  //     'Du möchtest uns als Profi mit deinem Feuerwerksbetrieb unterstützten.',
  //   href: '/mitglied-werden-firma',
  //   icon: OfficeBuildingIcon,
  // },
  // {
  //   name: 'Mitgliedschaft ändern',
  //   description:
  //     'Du bist schon Mitglied als Privatperson, willst uns nun aber als Betrieb unterstützen.',
  //   href: '/mitglied-werden',
  //   icon: CogIcon,
  // },
]

const navigation = [
  { name: 'Über uns', href: '/ueber-uns' },
  { name: 'Aktuelles', href: '/aktuelles' },
  { name: 'Positionen', href: '/positionen' },
  { name: 'Kontakt', href: '/kontakt' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const onTop = true ? scrollPosition === 0 : false
  return (
    <div
      className={`${
        onTop
          ? 'fixed bg-purple-900 w-full z-20 bg-opacity-0 transition transition-all duration-300'
          : 'fixed bg-purple-900 w-full z-20 bg-opacity-100 transition transition-all duration-300 shadow-2xl'
      }`}
    >
      <header>
        <Popover className="relative">
          {({ open }) => (
            <>
              <div className="flex justify-between items-center max-w-full mx-auto px-4 py-6 lg:justify-start lg:space-x-10 md:px-6 lg:px-8">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <Link href="/">
                    <a>
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="/logo.svg"
                        alt="BVPK Logo"
                      />
                    </a>
                  </Link>
                </div>
                <div className="-mr-2 -my-2 lg:hidden">
                  <Popover.Button className="bg-purple-800 rounded-md p-1 inline-flex items-center justify-center text-white hover:text-purple-300">
                    <span className="sr-only">Menü offnen</span>
                    <MenuIcon className="h-10 w-10" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <Popover.Group as="nav" className="hidden lg:flex space-x-7">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg font-source font-bold text-white hover:text-purple-300"
                    >
                      {item.name}
                    </a>
                  ))}
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? 'text-gray-300' : 'text-white',
                            'group rounded-md inline-flex items-center text-shadow-lg text-lg font-source font-bold hover:text-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                          )}
                        >
                          <span>Unterstützen</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? 'text-purple-600' : 'text-purple-600',
                              'ml-2 h-5 w-5 group-hover:text-purple-300'
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="absolute z-20 -ml-4 mt-3 transform w-screen max-w-sm lg:max-w-xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                          >
                            <div className="rounded-lg bg-purple-800 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-1">
                                {support.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-purple-900"
                                  >
                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-purple-600 text-white sm:h-12 sm:w-12">
                                      <item.icon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <p className="text-base font-bold font-source text-white">
                                        {item.name}
                                      </p>
                                      <p className="mt-1 text-md font-source text-gray-400">
                                        {item.description}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </Popover.Group>
                <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0">
                  <a href="/mitglied-werden" className="ml-4 button">
                    Mitglied werden
                  </a>
                </div>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
                >
                  <div className="rounded-lg shadow-lg bg-purple-900 divide-y-2 divide-purple-800">
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <img
                            className="h-8 w-auto"
                            src="/logo.svg"
                            alt="BVPK Logo"
                          />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="bg-purple-800 rounded-md p-1 inline-flex items-center justify-center text-white hover:text-purple-300">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-10 w-10" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="mt-6">
                        <nav className="grid grid-cols-1 gap-7">
                          {support.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="-m-3 p-3 flex items-center rounded-lg hover:bg-purple-800"
                            >
                              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-purple-600 text-white">
                                <item.icon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-4 font-source text-base font-bold text-white hover:text-purple-300">
                                {item.name}
                              </div>
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                    <div className="py-6 px-5">
                      <div className="grid grid-cols-1 gap-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="text-base font-medium text-white hover:text-purple-300"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      {/* <div className="mt-6"> */}
                      {/*   <a */}
                      {/*     href="#" */}
                      {/*     className="w-full md:max-w-lg flex items-center justify-around px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-900" */}
                      {/*   > */}
                      {/*     Mitglied werden */}
                      {/*   </a> */}
                      {/* </div> */}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </header>
    </div>
  )
}
