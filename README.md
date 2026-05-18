# Lab 7 - Unit & E2E Testing

**Name:** Solaiman Alwazir

> **Repo link:** https://github.com/salwazir/Lab7_Starter

---

## Check Your Understanding

### 1) Where would you fit your automated tests in your Recipe project development pipeline? Select one and explain why.

**Answer: (1) Within a GitHub Action that runs whenever code is pushed.**

Running the tests automatically inside a GitHub Action on every push gives the
fastest, most reliable feedback. Bugs are caught the moment they are introduced
instead of after a feature is "done," every teammate's code is checked the same
way regardless of their local setup, and broken code can be blocked from being
merged. Manually running tests locally (option 2) depends on people remembering
to do it, and running them only after all development is complete (option 3)
finds problems far too late to fix them cheaply. Continuous, push-triggered
testing is the standard automation approach this lab describes.

### 2) Would you use an end-to-end test to check if a function is returning the correct output? (yes/no)

**No.** End-to-end tests emulate a real user's workflow through the browser/UI
(navigating pages, clicking buttons, reading the DOM). Verifying that an
individual function returns the correct output for given inputs is the job of a
**unit test**, which is much faster and more precise for that purpose.

### 3) What is the difference between navigation and snapshot mode?

**Navigation mode** analyzes a page right after it loads (a fresh page load).
It produces the full set of load/performance metrics, but it cannot analyze
user interactions or changes to the content after load.

**Snapshot mode** analyzes the page in its *current* state (whatever is on the
screen right now, after any interactions). It is best for finding accessibility
issues, but it cannot measure JavaScript/load performance or changes to the DOM
tree over time.

In short: navigation = audit a fresh load over time; snapshot = audit the page
exactly as it currently is, frozen in place.

### 4) Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.

Lighthouse scores for `https://cse110-sp25.github.io/CSE110-Shop/`:
Performance **100**, Accessibility **89**, Best Practices **100**, SEO **67**.

Three concrete improvements based on the failing audits:

1. **Add a `<meta name="viewport">` tag** (e.g.
   `<meta name="viewport" content="width=device-width, initial-scale=1">`).
   Lighthouse flags its absence under both Performance and SEO; adding it makes
   the site render correctly on mobile devices.
2. **Add a `lang` attribute to the `<html>` element** (e.g. `<html lang="en">`).
   This is the main Accessibility failure — it lets screen readers announce the
   page in the correct language.
3. **Improve SEO metadata and mobile readability** — add a
   `<meta name="description">` tag, use legible font sizes, and size tap
   targets appropriately so they aren't too small/close together on mobile.
   (A secondary win: serve static assets with a longer cache policy to speed up
   repeat visits.)
