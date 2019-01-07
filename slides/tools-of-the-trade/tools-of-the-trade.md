### CART 263 / Winter 2019 / Pippin Barr

# The tools of the trade

---

## In this module

- Atom
- Template project
- atom-live-server
- Chrome

---

## Atom

- Atom is a full-featured __text-editor__
- Therefore, at heart it's literally just a place to write text
- We will use it to write code

---

## Atom

- ![](images/atom-startup-screen.png)

???

- As you can see, there are some default windows the first time you open Atom
- None of them are useful to us in our work, but unfortunately because of the way CDA runs the computers, you will likely see them every time you start Atom
- Get used to dismissing them

---

## Atom packages

- Atom uses the concept of "packages" to add functionality to the basic text editor
- One of these is `atom-live-server` which we'll talk about later
- Another is `atom-beautify` which is useful for keeping your code well formatted
- And there are many others
- To take a look go to `Preferences`/`Settings` - you can see installed packages under `Packages` and you can find other packages to install via `Install`

---

## Template project

- When we write JavaScript in this class there will be a basic structure of files and folders we will use every time to keep things consistent
- Download the template project from the course website: https://pippinbarr.github.io/cart263-2019/templates/template-project.zip
- Unzip it on your desktop (or wherever you like)
- You should now have a folder called `template-project`
- You can see it has a bunch of files and folders in it, but first let's open it in Atom

---

## Opening projects in Atom

- To open a project in atom you can either:
  - Go to `File > Open...` in Atom and select the __folder__ of the project you want to open, then click `Open`
  - Drag the __folder__ of the project you want to open into the Atom text window (__not__ the sidebar)
  - Drag the __folder__ of the project you want to open onto the Atom icon in the Dock (Mac)
- __Open the `template-project` folder in Atom now__

???

- Technically, you __can__ also open one of the files in the main folder like `index.html`, which will open the entire project by default, __but__ this can get confusing if you already have another project open, so I wouldn't.
- Dragging a project into the sidebar of an already-open project will open both in the same window, which gets confusing in terms of which project will actually run if you're using `atom-live-server`

---

## Template project

![](images/atom-template-project.png)

???

- This is roughly what you should see when you open the template project
- In this case we have the `index.html` file selected in the project on the left
- Most importantly, you can see the contents of the file you are editing in the main __editing window__ (the biggest area)
- And you can see the file structure of the project in the left pane (the smaller, skinnier area with `index.html` selected)

---

## Template project

- Our standard template project has the following structure:

```
template-project/
   css/
      style.css
   assets/
      images/
      sounds/
   js/
      libraries/
         LIBRARIES-GO-HERE
      script.js
   index.html
```

???

- At the top level we have `template-project` - that's the folder that contains the total project
- Inside we have three folders called `css`, `assets`, and `js` (the forward slash is used to indicate a directory, but it isn't part of the name). These folders help to organise the files in our project.
- There's also a file at the top level called `index.html` which is the actual web-page that will be displayed when we run our project
- Inside `css` is `style.css` which controls the styling of the page
- Inside `assets` are two more folders, called `images` and `sounds`, which contain nothing, but we can imagine that we would put images and sounds in them!
- Inside `js` is a folder called `libraries` which contains nothing right now because we don't have any default libraries
- Also inside `js` is our own script file called `script.js`
- (Weird note: if you look at the template folder online on github.com you might notice that the `images/`, `sounds/` and `libraries/` folders are missing - this is because when we use Git it __ignores empty folders__)

---

## atom-live-server

- Because we're using JavaScript, we will run our programs in a web browser
- To do this, we __could__ upload our project to a web server such as our user account at CDA, but this would get old fast when we're working
- Instead we will use a __package__ for Atom called atom-live-server
- Make sure a file in the project is selected on the left, probably `script.js` makes the most sense for us since that's what we'll usually be editing
- Go to `Packages > atom-live-server > Start server` (note the shortcut)
- If you can't see it, you may need to go to `Settings > Packages` and __Update__ atom-live-server (CDA doesn't always keep it up to date)

???

- We will almost certainly run into problems with `atom-live-server` going out of date during the semester
- If it's missing from the `Packages` menu of Atom, go to `Settings` and choose `Packages` and find `atom-live-server` in the list - it probably has a button asking you to update it, so do that and it should start working again

---

## Chrome

![](images/chrome-template-project.png)

???

- Well, it __is__ only a template project!
- We don't see anything happening because our project doesn't actually do anything yet
- It has: no HTML content, no CSS, and no JavaScript

---

## atom-live-server is _live_

- The beauty of atom-live-server is not just that it loads our project when we ask
- It will also keep the version in the browser __up to date__ with what we do
- For now let's prove this by selecting the `index.html` file and writing some text inside the `<body></body>` tags, such as

```html
...
<body>
Hello, World!
</body>
...
```

- When we go back to Chrome, the page has updated! We don't even need to reload it outselves.

---

## Summary

- We have a text-editor for our code (Atom)
- We have a template project to start from
- We have a local server for testing our work (atom-live-server)
- We have a browser to view our work (Chrome)

Make friends with and come to love them all!

---

# Fin.
