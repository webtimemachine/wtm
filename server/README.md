## Run the project locally

To run the project locally, follow the instructions below.

### 1. Project Setup

Clone the repository to your local machine:

```bash
git clone https://github.com/webtimemachine/wtm.git
```

Navigate to the project directory:

```bash
cd wtm/server
```

Rename the `sample.env` file to `.env`.

### 2. Dependencies

#### Docker Compose
Before you begin, ensure that you have Docker and Docker compose installed on your system. You can download and install Docker Desktop from [here](https://www.docker.com/products/docker-desktop/).

#### Ngrok

We use Ngrok for exposing your local API server to the Internet so you can test the iOS Extension without using any special setup.

1. Visit the [Ngrok website](https://ngrok.com/) and sign up for an account.
2. After signing up, navigate to the dashboard to obtain your authentication token.
3. Set your Ngrok authentication token in the `.env` file:

```bash
NGROK_AUTHTOKEN=<your-ngrok-auth-token>
```
Replace <your-ngrok-auth-token> with your actual Ngrok authentication token and save the changes.

#### Supabase

Supabase is used for authentication and it will be used as a replacement for PostgreSQL shortly. Follow these steps to set it up.

1. Visit the [Supabase website](supabase.io) and sign up for a new account. Follow the registration process and log in to your new account.
2. Navigate to the dashboard and create a new project. Give your project a name and select the region closest to your location for optimal performance. After creating the project, you'll be redirected to the project dashboard
3. From the project `Home`, go to `Settings > API` and copy the project `URL` under **Project URL** section. Also, copy the project public key under **Project API Keys** section. Paste those values in the `.env` file:

```bash
SUPABASE_URL=<project-url>
SUPABASE_KEY=<project-public-key>
```

4. Finally, go back to the project `Home` page, and then navitage to `Authentication > Providers`. While in there, enable `Github`. It will display some values and a `Callback URL` that we will use in the following section to setup a Github App.

#### Github Application

A Github App is needed to authenticate users using Github.

1. Visit [GitHub website](https://github.com/) and sign in to your account.
2. Go to [New Application in Settings](https://github.com/settings/applications/new) to create a new application
3. Register the new application by selecting a Name. Use `http://localhost:3000` as `Homepage URL`. For the `Authorization callback URL` use the `Callback URL` value provided by Supabase in the previous step.

### 3. Running with Docker Compose

Start the project using Docker compose:

```bash
docker compose up
```

This command will build and start all the services defined in the `docker-compose.yml` file, including:
- a PostgreSQL database,
- the Python API,
- and Ngrok for accessing the extension from your phone.

### 4. Accessing the API

Navigate to the following URL to get the Internet address of the API, http://localhost:4040/inspect/http

Additionally, you can access the server API at http://localhost:8000/