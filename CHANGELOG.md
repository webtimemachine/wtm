# Changelog

## Version 1.0.0

- **First stable version with pipelines working and expected**: Each new version will be uploaded entirely by the pipelines.

- **Build and Release Extension zip**: This pipeline is responsible for building and releasing the extension in .zip file.

## Version 0.2.0

### Features

- **Fastfile Update**: The Fastfile has been updated to include configurations for building and signing the `ttm (iOS)` extension, streamlining the deployment process for new versions.

- **Extension Integration in Workflow**: The `iOS Build and Deploy Workflow` now includes steps to build, sign, and deploy the `ttm (iOS) Extension`, ensuring that updates to the extension are smoothly integrated into our iOS application.

### Continuous Integration Enhancements

- **Enhanced Build Scripts**: Build scripts have been optimized for better performance and reliability, particularly for handling the `ttm (iOS) Extension`.

- **Extended Testing**: Additional testing phases have been introduced, focusing on the integration and functionality of the `ttm (iOS) Extension` within the app.

### Compatibility and Testing

- **Extension Compatibility Testing**: The `ttm (iOS) Extension` has been rigorously tested across supported platforms to ensure seamless integration and functionality.


## Version 0.1.0

### Features

- **Navigation History Storage**: Now you can conveniently store your navigation history including URL and Title for future reference.

- **Browser Differentiation**: Ability to distinguish between different browsers where your account is installed, providing a tailored experience for each.

- **Authentication Integration**: Authentication system is now integrated with Supabase, allowing for potential connection with various OAuth providers in the future. Currently, GitHub authentication is supported.

### Compatibility and Testing

- **Cross-Browser Compatibility**: Tested and confirmed operational on:
    - Safari iOS
    - Safari MacOS
    - Chrome MacOS

Expected to function on any Chromium-based browser, although not explicitly tested.

### Continuous Integration

We have the following pipelines configured on GitHub:

- **Build and Release Extension crx**: This pipeline is responsible for building and releasing the crx extension.

- **iOS Build and Deploy Workflow**: This pipeline handles the building and deployment of our iOS application.
