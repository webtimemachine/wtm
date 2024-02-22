import { Fragment, useState, useContext } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowRightCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import LogsMain from './components/LogsMain'
import ChangeApiURL from './components/ChangeApiURL'
import { EnvContext } from './helpers/EnvContext'
import ChangeDeviceName from './components/ChangeDeviceName'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MainApp() {

  const [ENVCONTEXT,] = useContext(EnvContext)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  return (
    <>
      <header className="bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between pt-4 pb-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="">Web Time Machine (Api URL: {ENVCONTEXT.API_URL})</span>
              {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                Settings
                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">

                  <div className="grid grid-cols-1 divide-x divide-gray-900/5 bg-gray-50">

                    <div className="p-4">
                    <ChangeApiURL></ChangeApiURL>
                    </div>
                    <div className="p-4">
                    <ChangeDeviceName></ChangeDeviceName>
                    </div>
                    <div className="p-4">
                    <div onClick={()=>{ENVCONTEXT.supabase.auth.signOut("local")}} className="cursor-pointer flex w-full items-center justify-between rounded-lg py-2 pr-3.5 text-base font-semibold leading-7 text-red-500 hover:bg-gray-50">
                        Log out
                        <ArrowRightCircleIcon
                          className={classNames('h-5 w-5 flex-none')}
                          aria-hidden="true" />
                      </div>
                    </div>

                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>

        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Web Time Machine</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure defaultOpen={true} as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Settings
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true" />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">

                          <ChangeApiURL></ChangeApiURL>
                          <ChangeDeviceName></ChangeDeviceName>

                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">

                    <>
                      <Disclosure.Button onClick={()=>{ENVCONTEXT.supabase.auth.signOut("local")}} className="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 text-base font-semibold leading-7 text-red-500 hover:bg-gray-50">
                        Log out
                        <ArrowRightCircleIcon
                          className={classNames('h-5 w-5 flex-none')}
                          aria-hidden="true" />
                      </Disclosure.Button>
                    </>
                  </Disclosure>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header><LogsMain></LogsMain></>
  )
}