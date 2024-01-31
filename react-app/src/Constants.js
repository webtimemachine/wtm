
export const DEFAULT_DEVICE_NAME = 'My device'
let api = process.env.LOCAL_API_URL || "http://localhost:8000";
switch (process.env.ENV) {
    case "development":
        api = "https://dev-wtm-246.vercel.app?_vercel_share=wKda0Qjw2pAI0h4OKXeIPkBCDITPEhme";
        break;
    case "production":
        api = "https://wtm-246.vercel.app";
        break;
    default:
        break;
}

export const API_URL = api;