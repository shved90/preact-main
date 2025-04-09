# My very own website

I use my website as both my resume, blogy brain dumps and a place to show my side projects via subdomains.

I chose Preactjs as the framework because of how compact and lightweight it is. Unlike React, Preact got rid of a lot of bloat in its codebase and significantly trimmed its bundle size.
I am using Graphql and TanStack to fetch my data, and generating data types dynamically with Graphql Codegen.

## How to run:

Requires CMS vars for data fetching obvs.

```
bun install
bun dev
```

## TODO

This is very much WIP atm, here's a list of things I want to add in no particular order, for myself to keep track of.

### Components

Buildup components, currently only basics are in, missing data block, working header, forms, icons, tags etc.

* #### Nav 
    * mobile responsiveness and collapsing func, design
    * desktop responsiveness and sticky func, design
    * recheck xl-desktop func, fix responsive width etc.
* #### Layout
    * Still a rough mockup, clean and finalize, rework transition logic
    * Update classes responsible for transitioning, make it smooth
* #### Cards
    * Consider styling edge cases on different screen sizes 
    * Add collapsible functionality, maybe [details/summary](https://dev.to/jgustavoas/how-to-fully-animate-the-details-html-element-with-only-css-no-javascript-2n88) elements for native func
    * Check you're happy with design, padding or font size etc.

### Data
* Review and fix loading/prefetching
* A lot of data is either test or missing, add more real life data
* Cache and memoize the data, consider context
* Add search functionality by tags or smth

### Pages
* Abstract and simplify data fetching more
* Thoroughly test richtext package with CMS data types across the board to make sure it works long-term
* Fix richtext package typescript error
* Replace posts prototype garbage with relevant data, move to blog data type
* Build up pages for the rest of planned data
* Add proper metadata and card preview to individual blog posts

### Contact
* Build contact form basics
* Consider form validation options like [in React](https://rafaelcamargo.com/blog/validating-react-forms-easily-without-third-party-libraries/) or something else
* Make sure some semblance of security is in place
* Chew through netlify forms docs for form functionality

### Misc
* Add loading states to each component on both component and page views
* Normalize file and func naming
* Consider prettify
* Fix graphql codegen clash with vite .env management
* Add SVG icons throughout, either as in old vue version or something else, maybe spritesheet
* Manage page-by-page color schemes
* Consider Tailwind theming to fully work with light/dark. Either add a whole bunch of classes for each theme in every component which sounds _insane_, or rewrite the way colors are managed, might require restyling a whole bunch of stuff. Here's a basic [tut](https://www.devgem.io/posts/mastering-tailwind-css-v4-implementing-dynamic-light-and-dark-themes-effortlessly)
* Consider [ssr](https://preactjs.com/guide/v10/server-side-rendering/), react-iso [supports](https://github.com/preactjs/preact-iso) it, netlify might not, chew some docs
* Make mastodon.me linking work to reflect on mastodon profile
* Dont forget favico, dynamic metadata and tab titles

### Settings?

Settings widget to configure website for the user, save in localstorage, give subtle popup on first visit.

* theme changing
* font resize
* enable/disable animation