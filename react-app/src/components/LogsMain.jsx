/* eslint-disable no-unused-vars */
import Logs from "./Logs"
import React, { useEffect, useContext, useState } from 'react';
import { EnvContext } from '../helpers/EnvContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
import { LogsProvider } from "../helpers/LogsContext";

export default function LogsMain() {

  const [ENVCONTEXT,] = useContext(EnvContext)
  
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    async function fetchUrls() {
      if (ENVCONTEXT.session) {
        fetch(ENVCONTEXT.API_URL + `/devices`, {
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
            "Authorization": ENVCONTEXT.session.access_token,
            "refresh-token": ENVCONTEXT.session.refresh_token,
          }),
        })
          .then(response => response.json())
          .then(data => {
            let newTabs
            if (data.devices) {
              newTabs = data.devices.map(device => ({
                name: device,
                href: '#',
                current: false,
                device: device
              }));
              newTabs.unshift({ name: 'All', href: '#', current: true, device: 'All' });
            } else {
              newTabs = [{ name: 'All', href: '#', current: true, device: 'All' }]
            }
            setTabs(newTabs);
          }).catch((error) => {
            console.error('Error:', error);
          })
      }
    }
    fetchUrls();
  }, []);


  const [selectedDevice, setSelectedDevice] = useState("All");
  return (
    <div className="border-b border-gray-200 pb-5 sm:pb-0 mt-2">
      <h3 className="text-base leading-6 text-gray-900">History</h3>
      <p className="mt-1 text-sm text-gray-500">This device name: <span id="email" name="email" required className="inline py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{ENVCONTEXT.deviceName}</span></p>
      <div className="mt-3 sm:mt-4">
        <div className="sm:hidden">
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={tabs.find((tab) => tab.current)?.name}
            onChange={(e) => { setSelectedDevice(e.target.value); tabs.forEach((eachTab) => eachTab.current = e.target.value === eachTab.device);}}
          >
            {tabs.map((tab) => (
              <option key={tab.name}
              >{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                )}
                onClick={() => { setSelectedDevice(tab.device); tabs.forEach((eachTab) => eachTab.current = tab.device === eachTab.device) }}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <LogsProvider>
        <Logs selectedDevice={selectedDevice} />
      </LogsProvider>
    </div>
  )

}