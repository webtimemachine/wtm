import React, { Fragment, useContext, useState, useRef } from 'react';
import { EnvContext } from '../helpers/EnvContext';
import { getSetup } from '../helpers/Constants'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'

const ChangeApiURL = () => {
    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)

    const [ENVCONTEXT, setEnvContext] = useContext(EnvContext)

    const [serverUrl, setServerUrl] = useState(ENVCONTEXT["API_URL"])
    const [serverUrlDisable, setServerUrlDisable] = useState(false)

    const changeServerUrl = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            setServerUrlDisable(true)
            const parsedUrl = new URL(serverUrl)
            const url = `${parsedUrl.protocol}//${parsedUrl.hostname}`
            getSetup(url).then((data) => {
                setServerUrlDisable(false)
                if (data.version) {
                    ENVCONTEXT.supabase.auth.signOut("local");
                    setEnvContext({ ...ENVCONTEXT, API_URL: url, SUPABASE_URL: data.supabaseUrl, SUPABASE_ANON_KEY: data.supabaseAnonKey })
                } else {
                    setOpen(true)
                }
            }).catch(() => {
                setServerUrlDisable(false)
                setOpen(true)
            })
        }
    }
    return (
        <div><Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                            There was an error setting up the enviroment
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure the domain is correct? Please check the domain and try again. Try accessing https://yourAPIdomain.com/setup on the domain to check the setup and check if you get a response.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
            <label htmlFor="apiurl" className="block text-sm font-medium leading-6 text-gray-900">
                API Domain
            </label>
            <div className="mt-2 relative flex flex-grow items-stretch focus-within:z-10">
                <input
                    type="url"
                    name="apiurl"
                    id="apiurl"
                    disabled={serverUrlDisable}
                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="https://yourAPIdomain.com"
                    aria-describedby="email-description" value={serverUrl} onChange={(e) => {
                        setServerUrl(e.target.value)
                    }} onKeyDown={changeServerUrl}
                />
                <button
                    onClick={changeServerUrl}
                    disabled={serverUrlDisable}
                    type="button"
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Save
                </button>
            </div>
            <p className="mt-2 text-sm text-gray-500" id="apiurl-description">
                Set the API domain (https://yourAPIdomain.com) and press Enter. If it`s ok, you will be logged out.
            </p>
        </div>
    );
};

export default ChangeApiURL;
