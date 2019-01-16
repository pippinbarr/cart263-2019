# Assignment 3: Raving Redactionist

__Grade__: 1.25% of final grade (pass/fail)  
__Deadline__: 11:59PM on the day of class on week of 28 January 2019.

---

## Brief

- Add another interaction to the page in which the user finds other secret words in the document by waving their mouse over them, causing them to be highlighted
- Add a text to the page that tells the user how many of these secret words they have found so far
- You should only be able to find any given secret _once_

__NOTE:__ This brief is the bare minimum of additions in order to pass, please always use these assignments as a playground to try out more than the bare minimum!

---

## Learning objectives

- Building confidence with jQuery
- Learning new jQuery functions

---

## An approach

- HTML
  - Add a new set of spans to the HTML with a class of "secret" that go around single words (don't make them overlap with the existing redacted spans)
  - Add text somewhere on the page that reports how many secrets have been found, put a span with an id of something like "secret-count" around the number found, and start it with 0 (e.g. when you start it should say: "Secrets found: 0")
- CSS
  - Add a class to your CSS called something like "found" that will brightly highlight a secret once it's found (we'll add this class to the secrets when the user finds them)
- JavaScript
  - Add a variable to the top of your program to track how many secrets were found
  - Add an event for "mouseover" attached to all the "secret" words (use jQuery to select that class, use `on()` to create an event for mouseover)
  - In the event handler function
    - Add the "found" class to the element that was moused over so it highlights (remember to use `this`)
    - Remove the mouseover event from the found element (look up jQuery's `off()` function)
    - Increase the counter variable by one
    - Select the "secret-count" span and set its text to be the value of the counter variable (look up jQuery's `text()` function) (e.g. when you've updated it the first time, the text on the page should say "Secrets found: 1")

---

## Starting code

[assignment3.zip](assignment3.zip)

---

## Submission

You will submit this exercise as a __comment__ on an __Issue__ on the course repository here:

https://github.com/pippinbarr/cart263-2019/issues

(Click on the Issue with the name of the exercise and your section letter and follow the instructions.)

---

## Grading

Grading for exercises is pass/fail based on whether you met the requirements.
