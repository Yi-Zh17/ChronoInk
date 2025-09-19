# Architecture

All key components of the app are stored in the `src/` folder.

## The `src/` Folder

Currently the `src/` folder only contains `app/` as chrono-ink is based on app router.

### The `app/` folder

The `app/` folder contains all the resources of the project, including webpage structure designs, reusable components, user interfaces, etc.

#### `layout.tsx` & `page.tsx`

These are the source code for the Home page, as well as the general layout of the whole app.

#### `not-found.tsx`

This is the placeholder for pages that are not yet implemented.

#### `calendar/`, `focus/`, `settings/`, `stats/`, `todo/`

These folders contain corresponding designs and implementations of different pages in the app. These folders always contain a `page.tsx` which is the parent of all other files.

#### `component/`

This folder contains reusable components such as wheel time picker.

#### `lib/`

This folder contains definitions of objects in the projects, as well as how data should be sent to and queried from the database.

#### `ui/`

This folder contains the user interface, including style sheets, navigation links, and skeletons for streaming data.