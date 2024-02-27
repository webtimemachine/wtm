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

### 3. In the folder called `react-app/build` you will have the unpacked version of the extension. You can use this build with testing purpouse. The repo has a pipeline that makes a `.crx` for you. Just enter on the secrets the `API_URL` and it should work.

### 3. Access Chrome Extensions Settings
- Click on the **Settings** icon located in the top-right corner of your Chrome browser. It resembles three vertically aligned dots, also known as the 'hamburger' icon.

### 4. Navigate to Extensions
- From the dropdown menu, hover over the **Tools** option, then select **Extensions**.

### 5,
- Once on the Extensions page, locate the toggle button labeled **Developer mode** in the top-right corner of the screen. Toggle it to the 'On' position. This action enables Developer Mode, allowing you to manually install extensions.

### 6. Drag and Drop the .crx File
- Locate the .crx extension file you wish to install. Typically, these files are found in your Downloads directory or the location where you saved them.
- Click and hold the .crx file, then drag it onto the Extensions page opened in Step 2.
- Release the file onto the Extensions page. You'll notice a prompt confirming the installation of the extension.

### Step 5: Install the Extension
- After dropping the .crx file onto the Extensions page, a confirmation dialog should appear asking if you want to add the extension. Click on the **Add extension** button to proceed.
- Chrome will begin installing the extension. Once completed, you'll see a notification confirming the successful installation.

## Test the extension on Safari

It's mandatory being in mac with the last version of xcode

- 1. Change the `bundle identifier` to one by our own. Notice that the extension bundle is a little bit different, respect that because you will need it in the next steps.

- 2. Make sure that `Automatically manage signing` is enabled

- 3. In the file `Web-Time-Machine > Shared (App) > ViewController.swift` change the variable called `extensionBundleIdentifier` to your extension bundle identifier

- 4. You are ready for testing in your own iPhone, iPad or Mac. Just run the desiered schema and test it.

- 5. For publishing purpouse, there is a pipeline that make all the job [Link to pipeline](../.github/workflows/deploy_to_testflight.yml)