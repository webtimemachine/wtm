## Run the Extension locally

### 1. Project setup

Clone the repository to your local machine:

```bash
git clone https://github.com/webtimemachine/wtm.git
```

Navigate to the project directory:

```bash
cd wtm/react-app
```

Rename the `sample.env` file to `.env`, and populate the environment variables. You can find more information about how to [setup Supabase and get the required values](../server/README.md#prerequisites) following the link.

In the project directory, you can run:

### 2. Install project dependencies

```bash
npm i
```

### 3. Run the react app

```bash
npm start
```

## Build the Web Extension

### 1. Setup the `API_URL` in `.env` with your api url. Please follow the same structure as the `sample.env`. Pay special attention to the last bar. Enter only the domain

### 2. run `npm run build`

### 3. In the folder called `react-app/build` you will have the umpacked version of the extension. You can use this build with testing purpouse. The repo has a pipeline that makes a `.crx` for you. Just enter on the secrets the `API_URL` and it should work.

### 4. To install the .crx file, please open this URL in Chrome `chrome://extensions/`, activate the `develpment mode` and then drag and drop the file into the browser

## Test the extension on Safari

### It's mandatory being in mac with the last version of xcode

### 1. Change the `bundle identifier` to one by our own. Notice that the extension bundle is a little bit different, respect that because you will need it in the next steps.

### 2. Make sure that `Automatically manage signing` is enabled

### 3. In the file `Web-Time-Machine > Shared (App) > ViewController.swift` change the variable called `extensionBundleIdentifier` to your extension bundle identifier

### 4. You are ready for testing in your own iPhone, iPad or Mac. Just run the desiered schema and test it.

### 5. For publishing purpouse, there is a pipeline that make all the job [Link to pipeline](../.github/workflows/deploy_to_testflight.yml)