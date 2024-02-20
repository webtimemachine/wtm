
import { createClient } from "@supabase/supabase-js";
import { deleteFromStorage, getFromStorage, setInStorage, inExtension } from "./Constants";
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY, {
    auth: {
        detectSessionInUrl: inExtension,
        persistSession : true,
        storage: {
            getItem: (key) => {
                return getFromStorage(key);
            },
            setItem: (key, data) => {
                setInStorage(key, data);
            },
            removeItem: (key) => {
                deleteFromStorage(key);
            }
        }
    },
});
export {supabase};