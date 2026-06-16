# Installing the project

This repository contains the D3-Online project that could be started using :

- `npm install` to install the required dependencies.
- `npm run dev` to start the project in local.
- `npm run build` to build the project that could be used in production.

# Workflows

This repository contains a workflow that is triggered on every Pull Request on GitHub, that will try to build the project using the command `npm ci`. If the project is able to be built, the PR would be automatically rejected.

# Project Structure

The _src_ folder contains some folders which all have their utility :

- **components**: contains the different component definitions with their style.
- **config**: contains the configurations files for the Monaco editor, the divergence tree, ..
- **contexts**: defines the React contexts that are common for all the application.
- **hooks**: defines the utility hooks.
- **layout**: defines the layout components used directly into the Router component (which is the main component in the application). The **GlobalLayout** component is used to determine the structure that will be respected for all the pages in the application.
- **models**: defines the different data models for the application.
- **services**: defines the services used in the application to retrieve data for example.

The _src_ folder also contains directly some important files:

- The **App** component that adds every context provider to the application, which permits to use the different contexts within the application.
- The **Router** component that defines all the routes and that uses the **GlobalLayout** component to define a global structure for all the pages (for having a global navigation bar for example).

The repository also contains a **api-documentation** Markdown file that defines all the endpoints that are needed to make the code working correctly, that documentation uses the models that are defined in the _src/models_ folder.

# Dependencies

The project uses some open-source dependencies :

_(not required dependencies)_

- **ESlint**: could be added on VSCode with the corresponding extension, used to compile the code and make it respect basic rules for the code writing.
- **Prettier**: could be added on VSCode with the corresponding extension, used to reformat the code and make it be easily readable.

_(required dependencies)_

- **Vite**: used to make the project build easier, to add the compilation plugins such as **ESlint** and to make project managing easier, or **SVGR** that permits to use the SVG icons as components.
- **Monaco**: used to provide code editors within the application.
- **re-resizable**: used to make the UI containers resizable by the user.
- **react-router**: used to provide different pages in the application.

# Adding new icons

New icons could be added into the project by adding it inside the _src/assets/icons_ folder that contains the already used icons.
If the newly added icon is using the **svg** format, it may needs its property **fill** to be set at **"currentColor"**, which permits it to use the project font color and to respect the used theme in the application.

The icons could be imported into the code by adding the **?react** extension after the import path.
After that, the icons could be used directly in the code as components by importing and using it as follows:

```typescript
import SomeIcon from "../assets/icons/some-icon.svg?react";
const SomeComponent = () => {
    return (
        <>
            Here is the special icon : <SomeIcon/>
        </>
    );
}
```
