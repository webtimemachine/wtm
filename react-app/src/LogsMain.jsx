import Logs from "./Logs"
import React, { useEffect, useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

import { DEFAULT_DEVICE_NAME, API_URL } from "./Constants";


// const tabs = [
//   { name: 'All', href: '#', current: true, device: 'All'},
//   { name: 'Mac', href: '#', current: false, device : 'Mac OS X'},
//   { name: 'Windows', href: '#', current: false, device : 'Windows'},
//   { name: 'iPhone', href: '#', current: false, device : 'iOS'},
//   { name: 'iPad', href: '#', current: false, device : 'iOS'},
//   { name: 'Android', href: '#', current: false, device : 'Android'}
// ]

const userId = 1

export default function LogsMain() {

  const [deviceName, setDeviceName] = useState(DEFAULT_DEVICE_NAME)

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (chrome.storage) {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.get('deviceName').then(function (result) {
        setDeviceName(result.deviceName || DEFAULT_DEVICE_NAME)
      })
    } else {
      console.log('No chrome.storage, using locastorage')
      const deviceName = localStorage.getItem('deviceName')
      setDeviceName(deviceName || DEFAULT_DEVICE_NAME)
    }
  }, [])

  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    fetch(API_URL + `/devices?userId=${userId}`, {
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then(response => response.json())
      .then(data => {
        const newTabs = data.devices.map(device => ({
          name: device,
          href: '#',
          current: false,
          device: device
        }));
        newTabs.unshift({ name: 'All', href: '#', current: true, device: 'All' });
        setTabs(newTabs);
      });
  }, []);

  const [selectedDevice, setSelectedDevice] = useState("All");
  return (
    <div className="border-b border-gray-200 pb-5 sm:pb-0 mt-2">
      <h3 className="text-base font-semibold leading-6 text-gray-900">History</h3>
      <p className="mt-1 text-sm text-gray-500">This device name: {deviceName}</p>
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
            onChange={(e) => { setSelectedDevice(e.target.value); tabs.forEach((eachTab) => eachTab.current = e.target.value === eachTab.device); console.log(e.target.value) }}
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
      <Logs selectedDevice={selectedDevice} />
    </div>
  )
}