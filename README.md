# web-time-machine


## Setup

To run it in your local enviroment, create a NGROK account and get your token from [here](https://dashboard.ngrok.com/get-started/your-authtoken).

Use the following commands to run the server in your local enviroment:

```bash
cd fast-api/
export NGROK_AUTHTOKEN=2L3Ov... # Your ngrok token
docker compose up
```

This will run the server in your local environment and expose it to the internet using NGROK. The ngrok link will be config in the extension automatically.