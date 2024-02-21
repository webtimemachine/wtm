# Prerequisites

### 1. Supabase

Supabase is used for authentication and it will be used as a replacement for PostgreSQL shortly. Follow these steps to set it up.

1. Visit the [Supabase website](supabase.io) and sign up for a new account. Follow the registration process and log in to your new account.
2. Navigate to the dashboard and create a new project. Give your project a name and select the region closest to your location for optimal performance. After creating the project, you'll be redirected to the project dashboard
3. From the project `Home`, go to `Settings > API` and copy the project `URL` under **Project URL** section. Also, copy the project `public key` and `secret key` under **Project API Keys** section. Paste those values in the `.env` file:

```bash
SUPABASE_URL=<project-url>
SUPABASE_KEY=<project-public-key>
SUPABASE_SERVICE_KEY=<project-secret-service-key>
```

4. Finally, go back to the project `Home` page, and then navitage to `Authentication > Providers`. While in there, enable `Github`. Save the `Callback URL` since you'll need it to setup the Gibhub Application in the next section. Also, you'll need to come back later to setup the `Client ID` and `Client Secret` with the values provided by the Github Application.

### 2. Github Application

A Github App is needed to authenticate users using Github.

1. Visit [GitHub website](https://github.com/) and sign in to your account.
2. Go to [New Application in Settings](https://github.com/settings/applications/new) to create a new application
3. Register the new application by selecting a Name. Use `http://localhost:3000` as `Homepage URL`. For the `Authorization callback URL` use the `Callback URL` value provided by Supabase in the previous step.
4. Take the `Client ID` and `Client Secret` values and use them to populate the missing fields in the **Github Provider** setup in Supabase from the previous step.


# Run the project locally

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
2. After signing up, navigate to the dashboard to obtain your authentication token and domain
3. Set your Ngrok authentication token and domain in the `.env` file:

```bash
NGROK_AUTHTOKEN=<your-ngrok-auth-token>
NGROK_DOMAIN=<your-ngrok-domain>
```
Replace `<your-ngrok-auth-token>` and `<your-ngrok-domain>` with your actual Ngrok values and save the changes.

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

Use your **ngrok domain** to access the API from your mobile phone.

Additionally, you can access the server API at http://localhost:8000/


# Deploying the project to Vercel

#### 1. Create a Vercel Account
If you haven't already, go to the [Vercel website](vercel.com) and sign up for a new account. You can sign up using your GitHub, GitLab, or email address.

#### 2. Install Vercel CLI (Command Line Interface)
To deploy your Python API to Vercel, you'll need the Vercel CLI. Install it globally using npm:

```bash
npm install -g vercel
```

#### 3. Initialize a Vercel project
In your terminal or command prompt, navigate to `server/app` and run the following command to initialize a new Vercel project:

```bash
vercel init
```

#### 4. Setup your Vercel project
Go to your Vercel new project. In **Settings**, make sure the root directory is `server/app/`. Then, update your **Environment Variables** with your Supabase information from previous steps.

#### 5. Deploy your project to Vercel
Once your project is set up, you can deploy it to Vercel by running the following command:

```bash
vercel
```