### CART 263 / Winter 2019 / Pippin Barr

# localStorage

---

## Contents

- Memory
- `localStorage`

---

## Memory

- To this point our webpages are like newborn babies each time we load the page
- They have no sense of history or memory - they just load the HTML/CSS/JavaScript and off they go
- But sometimes it would be nice to have a page/application/game/thing that could __persist over time__
- We might want a webpage that resents us over time, or a game that remembers your high scores, an "AI" that knows how often you visit it, or simply something that remembers your name and greets you next time you show up...
- To do any of that we need some way to __store data__ between sessions on the page

---

## `localStorage`

- In JavaScript there is an object called `localStorage` that provides this functionality
- Luckily, using `localStorage` is mercifully simple...

---

## `setItem()`

- To __save data__ we use `setItem()`, giving it a __key__ to refer to the data, and the __data__ itself

```javascript
localStorage.setItem('meaningOfLife','Be excellent to each other.');
```

- The above will __save__ the string `'Be excellent to each other.'` with the key `'meaningOfLife'`.
- The key is always a __string__
- If we quit our browser and start it again, for instance, the webpage this code is in will still be able to remember the meaning of life!

---

## `getItem()`

- To __load data__ we use `getItem()`, just giving it the __key__ of the data we want to get back

```javascript
let meaning = localStorage.getItem('meaningOfLife'); // 'Be excellent to each other'
```

- If we use a key for which there is __no data__ we get back `null`

```javascript
let moaning = localStorage.getItem('moaningOfLife'); // null
```

- That means we can __check__ if some specific data has been saved before or not by trying to load it and then checking whether it's `null` (no data) or not `null` (there is data)

---

## Strings!

- It is very important to know that `localStorage` deals exclusively in strings!
- You can save numbers and booleans, but when you load them they'll be strings...

```javascript
localStorage.setItem('theTruth',true);
localStorage.setItem('theTenth',0.1);
...
let truth = localStorage.getItem('theTruth'); // 'true' (NOT the boolean value true)
let tenth = localStorage.getItem('theTenth'); // '0.1' (NOT the number 0.1)
```

- This is kind of unhelpful given that you probably wanted to get back the kind of value that you put in
- But it's the way it is, so there's another step in these cases...

---

## Parsing!

- To get the correct kind of value our of our loaded data we can "parse" the data
- Sometimes that means figuring it out ourselves...

```javascript
localStorage.setItem('theTruth',true);
...
let truthString = localStorage.getItem('theTruth'); // 'true'
let truth = (truthString === 'true'); // true
```

- Importantly we can see this means we need to __know__ what kind of value the data represents, so we can convert it correctly - otherwise everything will go to hell

---

## Parsing functions!

- Sometimes there are special functions for retrieving data from strings...

```javascript
localStorage.setItem('theTenth',0.1);
...
let tenthString = localStorage.getItem('theTenth'); // '0.1' (NOT the number 0.1)
let tenth = parseFloat(tenthString); // 0.1 (the actual value)
```

```javascript
localStorage.setItem('theTen',10);
...
let tenString = localStorage.getItem('theTen'); // '10' (NOT the number 10)
let ten = parseInt(tenString); // 10 (the actual value)
```
---

## Complex values: arrays

- Some values we might want to save are too complicated to be automatically represented as a string by `setItem()` and so can't directly be saved, we have to convert them first
- This notably includes __arrays__
- To convert them into a string that can be saved with `setItem()` we use a function called `JSON.stringify()`

```javascript
let array = [1,2,3];
let arrayString = JSON.stringify(array); // "[1,2,3]"
localStorage.setItem('myArray',arrayString);
```

- To restore an array saved this way, we use `JSON.parse()`

```javascript
let arrayString = localStorage.getItem('myArray'); // "[1,2,3]"
let array = JSON.parse(arrayString); // [1,2,3]
```

???

- Aren't you curious what would have happened if we just did this?

```javascript
let array = [1,2,3];
localStorage.setItem('myArray',array);
```

- Try it. You'll notice that the array is not preserved.
- Instead, when you use `getItem()` you just get a string with the values in the array separated by commas. The array is dead.

---

## Complex values: objects

- __Objects__  are the other thing that needs to be converted using `JSON.stringify()`

```javascript
let object = {
  color: 'red',
  age: 32,
  happy: true
};
let objectString = JSON.stringify(object); // "{"color":"red","age":32,"happy":true}"
localStorage.setItem('myObject',objectString);
```

-  And recovered with `JSON.parse()`

```javascript
let objectStringRestored = localStorage.getItem('myObject'); // "{"color":"red","age":32,"happy":true}"
let objectRestored = JSON.parse(arrayString); // The object proper
```

---

## Surgical Removal!

- It's entirely possible you might want to stop remembering something in `localStorage` (maybe you want a forgetful webpage!)
- For the specific case we use `removeItem()`

```javascript
localStorage.setItem('childhood','Sunny, happy, good.');
...
localStorage.getItem('childhood'); // 'Sunny, happy, good'
...
localStorage.removeItem('childhood');
localStorage.getItem('childhood'); // null
```

---

## Nuclear Removal!

- For the nuclear case of removing __all stored data__ we use `clear()`

```javascript
localStorage.setItem('childhood','Sunny, happy, good.');
localStorage.setItem('adolescence','Troubled, disturbing, bad.');
localStorage.setItem('twenties','One big step closer to death.');
...
localStorage.clear();
localStorage.getItem('childhood'); // null
localStorage.getItem('adolescence'); // null
localStorage.getItem('twenties'); // null
```

---

## Where is the data?

- `localStorage` saves and loads data based on the __domain__ its used on into the __browser__ that is viewing the page
- This means that a script running on a different domain __cannot__ see the stuff you save in `localStorage` on your domain
- This also means that a different browser viewing the __same page__ will not see any data saved by a different browser
- Hopefully it's obvious from this that different users won't see the same data!
- (Also note that in a browser's "incognito" or "private" mode, `localStorage` is cleared when the window is closed.)

---

# Fin.
