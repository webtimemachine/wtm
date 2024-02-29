# Changelog

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
