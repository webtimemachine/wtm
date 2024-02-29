import React, { useContext,useState } from 'react';
import { EnvContext } from '../helpers/EnvContext';

const ChangeDeviceName = () => {

    const [ENVCONTEXT, setEnvContext] = useContext(EnvContext);

    const [deviceName, setDeviceName] = useState(ENVCONTEXT.deviceName)

    const changeDeviceName = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            setEnvContext({...ENVCONTEXT, deviceName: deviceName})
        }
    }
    return (
        <div>
            <label htmlFor="apiurl" className="block text-sm font-medium leading-6 text-gray-900">
                Device name
            </label>
            <div className="mt-2 relative flex flex-grow items-stretch focus-within:z-10">
                <input
                    type="text"
                    name="apiurl"
                    id="apiurl"
                    className="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Macbook pro"
                    aria-describedby="email-description" value={deviceName} onChange={(e)=>{setDeviceName(e.target.value)}} onKeyDown={changeDeviceName}
                />
                <button
                    onClick={changeDeviceName}
                    disabled={deviceName === ENVCONTEXT.deviceName}
                    style={{opacity: deviceName === ENVCONTEXT.deviceName ? "0.5" : "1"}}
                    type="button"
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Save
                </button>
            </div>
            <p className="mt-2 text-sm text-gray-500" id="apiurl-description">
                Set this device name and press enter.
            </p>
        </div>
    );
};

export default ChangeDeviceName;
