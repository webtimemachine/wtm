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

### 1. Project setup

Setup the `API_URL` in `.env` with your api url. Please follow the same structure as the `sample.env`. Pay special attention to the last bar. Enter only the domain

### 2. Build the extension

```bash
npm run build
```

In the folder called `react-app/build` you will have the unpacked version of the extension.

## Test the extension in Chrome

After building the extension, you'll end up with a folder called `react-app/build` with the unpacked version of the extension. You can use this build for testing purpouse. The repo has a pipeline that makes a `.crx` file and a `.zip` file for you. Just enter on the secrets the `API_URL` and it should work and follow the next step to install it.

### Install the extension in Chrome (using the .crx file)

- Click on the **Settings** icon located in the top-right corner of your Chrome browser. It resembles three vertically aligned dots, also known as the 'hamburger' icon.

- From the dropdown menu, hover over the **Tools** option, then select **Extensions**.

- Once on the Extensions page, locate the toggle button labeled **Developer mode** in the top-right corner of the screen. Toggle it to the 'On' position. This action enables Developer Mode, allowing you to manually install extensions.

- Locate the .crx extension file you wish to install. Typically, these files are found in your **Downloads** directory or the location where you saved them.

- Click and hold the .crx file, then drag it onto the Extensions page. A confirmation dialog should appear asking if you want to add the extension. Click on the **Add extension** button to proceed.

- Chrome will begin installing the extension. Once completed, you'll see a notification confirming the successful installation.

### Install the extension in Chrome (using the .zip file)

- Navigate to the **Extensions** page as described in the previous section.

- Navigate to the location of the .zip file you wish to install. Unzip it where you want to let it installed (Desktop, for example)

- Click on the **Load unpacked** button located in the top-left corner of the screen. This action opens a file selection dialog.

- Select the folder where you had unziped and click on the **Open** button. Chrome will begin installing the extension.

- Once completed, you'll see a notification confirming the successful installation. The extension should now be visible in your list of installed extensions.

## Test the extension on Safari

It's mandatory being in mac with the last version of xcode

- Change the `bundle identifier` to one by our own. Notice that the extension bundle is a little bit different, respect that because you will need it in the next steps.

- Make sure that `Automatically manage signing` is enabled

- In the file `Web-Time-Machine > Shared (App) > ViewController.swift` change the variable called `extensionBundleIdentifier` to your extension bundle identifier

- You are ready for testing in your own iPhone, iPad or Mac. Just run the desiered schema and test it.

- For publishing purpouse, there is a [pipeline workflow](../.github/workflows/deploy_to_testflight.yml) that makes all the work for you.