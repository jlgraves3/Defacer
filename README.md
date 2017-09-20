# Defacer

[Defacer](https://defacer.herokuapp.com) is an app allows users to sketch over images of famous paintings (thereby defacing them).

![canvas](./screenshots/canvas_screenshot.png)
![gallery](./screenshots/gallery_screenshot.png)

## Technologies Used
- React
- Express
- React-Sketchpad
- React-Router
- Express Authentication
- Artsy.net API
- PostgreSQL

## Installation
From the root directory in the terminal:
Run `npm install` to install all of the backend dependencies.
Run `cd client` and then `yarn install` to install the frontend dependencies.

## User Stories
When the user is on the home page, they select an artist. When an artist is selected, the user can select on of their paintings to 'deface' or they can go back to the home page.

When the user selects a painting, they are then directed to a sketchpad where they can draw over the painting they chose.
If the user is logged in, they can save their work to the public gallery.

When the user is logged in, they can view their saved artworks on their profile. When they are viewing one of their saved artworks, they can choose to edit or delete it. If they choose to edit their artwork, they can save their changes to the original file, or they can save it as a new artwork.


## Unsolved Problems and Major Hurdles
I struggled a lot with authentication and tried a couple of different approaches before finally figuring out how to do it in the straightfoward, more intuitive way that I had originally planned on doing. I also have a problem with saving edited canvases as new artworks in the database. Sometimes it works, and sometimes I get an error saying the payload is too long. I presume this is because the png file taken from the canvas is a very long string. This value is stored in column `canvas_src` in the gallery table of my database, which is of type `TEXT`, so maybe I need to change the type to allow for larger storage.

## Future Improvements
In the future I would like to add a 'like' feature so that user artworks can be favorited like instagram posts. I also would like the user to be able to download their artworks.


