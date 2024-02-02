import React, { useEffect, useState } from 'react';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChrome, faFirefox, faEdge, faInternetExplorer, faSafari, faOpera } from '@fortawesome/free-brands-svg-icons'
import moment from 'moment';
import { API_URL } from "./Constants";

fontawesome.library.add(faChrome, faFirefox, faEdge, faInternetExplorer, faSafari, faOpera);

const PAGESIZE = 50;

export default function Logs(selectedDevice = undefined) {


    const [logs, setLogs] = useState([]);
    const [currentPage, ] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchUrls() {
            setLoading(true);
            const response = await fetch(API_URL + `/logs?offset=${currentPage * PAGESIZE}&deviceName=${selectedDevice.selectedDevice}`, {
                headers: new Headers({
                    "ngrok-skip-browser-warning": "69420",
                }),
            });
            const data = await response.json();
            console.log(data.urls.map((a)=>{return a.osName}));
            setLoading(false);
            setLogs(data.urls);
        }

        fetchUrls();
    }, [currentPage, selectedDevice]);

    function deviceIcon(log) {
        let foundDevice = undefined;

        switch (log.osName) {
            case 'Mac OS X':
                foundDevice = 'laptop_mac';
                break;
            case 'iOS':
                foundDevice = 'smartphone';
                break;
            default:
                foundDevice = 'device_unknown';
                break;
        }
        if (foundDevice) {
            return <span className="material-symbols-outlined">
                {foundDevice}
            </span>
        } else {
            return null
        }
    }
    function browserIcon(log) {
        let foundBrowser = undefined;

        switch (log.browserName) {
            case 'Chrome':
                foundBrowser = 'fa-chrome';
                break;
            case 'Firefox':
                foundBrowser = 'fa-firefox';
                break;
            case 'Safari':
            case 'Mobile Safari':
                foundBrowser = 'fa-safari';
                break;
            case 'Edge':
                foundBrowser = 'fa-edge';
                break;
            case 'Opera':
                foundBrowser = 'fa-opera';
                break;
            case 'IE':
                foundBrowser = 'fa-internet-explorer';
                break;
            default:
                break;
        }
        if (foundBrowser) {
            return <FontAwesomeIcon className='h-6' icon={`fa-brands ${foundBrowser}`} />
        } else {
            return null
        }
    }

    const [filteredLogs, setFilteredLogs] = useState(logs);

    useEffect(() => {
        console.log(selectedDevice.selectedDevice);
        if (selectedDevice.selectedDevice == "All") {
            return setFilteredLogs(logs);
        }
        if (selectedDevice.selectedDevice) {
            setFilteredLogs(logs.filter((log) => log.deviceName === selectedDevice.selectedDevice));
        } else {
            setFilteredLogs(logs);
        }
    }, [selectedDevice, logs])

    return (
        loading ? <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
        </div> :
        <ul role="list" className="divide-y divide-gray-100">
            {filteredLogs.map((log) => (
                <li key={log.id} className="relative flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="flex-none w-14 h-14 flex items-center justify-center">
                            <span className="icon-container">{deviceIcon(log)}</span>
                            <span className="icon-container">{browserIcon(log)}</span>
                        </div>
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                                <a href={log.href} rel="noreferrer">
                                    <span className="absolute inset-x-0 -top-px bottom-0" />
                                    {log.title || "Untitled"}
                                </a>
                            </p>
                            <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                <a href={`${log.url}`} target='_BLANK' rel="noreferrer" className="relative truncate hover:underline">
                                    {log.url}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                        <div className="sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{log.role}</p>
                            {log.createdAt ? (
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    <time dateTime={moment.utc(log.createdAt)}>{moment.utc(log.createdAt).fromNow()}</time>
                                </p>
                            ) : (
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    </div>
                                    <p className="text-xs leading-5 text-gray-500">Online</p>
                                </div>
                            )}
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}