# QnA

### Planning

> What do you think are the greatest areas of risk in completing the project?

- State management when juggling queries for data - choosing a viable way to
  store and cache data is probably one of the most important choices to make
  and trickiest to manage.
- Coming up with a solid pagination structure that works well with transitions
  can be another tricky piece of code to manage.
- Lastly, animations with list data can add a nice experience to the page, but
  is very easy to get wrong.

> What changes/additions would you make to the design?

- The opening page has a lot of white space and is punchy with the existing
  colour choices - I don't really mind keeping the landping page as is.
- The list items can be problematic when dealing with commit messages - they're
  not really suitd for display in small cards. Best to stick to titles if
  keeping the card format, or scrap the cards altogether for a more standard
  list format.
- The labels can also be overrun if there are too many attached to an issue.
  They work ok, but can probably be augmented to keep them out of the way.
- The labels also don't take advantage of the colours users have assigned them.
- The state icon is way too small - also, the colour choice blends in over the
  title background.

> List a two or three features that you would consider implementing in the future that would add significant value to the project.

- Drilling down into an issue would be an obvious choice.
- Adding the ability to see who worked on each issue at a glance would also be
  beneficial.
- Having some simple data available, like how many open or closed issues there
  are, would help the user who's using the tool, likely to help manage things.
- Since we have filtering options, sorting options wouldn't be a bad idea
  either - maybe by user, label, if there's a priority?

---

### Looking Back

> Describe the major design/build decisions and why you made them.

- I wanted to keep the system simple. I decided to build my own webpack
  configuration since one wasn't provided - this kept the build system trimmed
  down and I guess could show that I understand webpack - because it's
  ridiculous :D
- I decided to use React and it's built in state-management tools sans-context
  as opposed to using something like Redux. I didn't want to get bogged down
  managing Redux actions and reducers and selectors so I could just focus on
  the basic moving parts of the application.
- I used the concept of controlled components in my screens and kept the main
  state management higher up in the root of the application. I tried to follow
  the concept of moving state up as I filled out the lower components and
  pieces of the application. This helps organize your application in a natural
  way and makes some logical decisions more obvious to make.
- I decided to use react-spring to help with some more dynamic animations. The
  end result probably wasn't worth the effort where it was used, but I think
  with the system that's in place, it will be easy to make some decent
  improvements. I prefer working with spring-like systems for animation as
  tweens can often lead to stale/glitchy looking animations.
- For the main layout, I thought of a couple concepts - a basic pagination site
  and a more flat vertical site - I chose the later because I felt the design
  was suitd to it.

> How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").

- Webpack (30 to 45 minutes) - Since I decided to build my own webpack
  configuration from scratch, I probably spent a little more time there than
  necessary when you could just use something like create-react-app and get
  up and running right away. It was still fun to write though!
- Learning about the GitHub issues API (15 to 20 minutes) - This didn't take
  much time, but I did have to go back once or twice to confirm a few details
- Site Structure (1 to 2 hours) - As I built out the basic structure and
  started working out the site logic, I spent time refactoring where I had the
  search screen doing a little too much work. Once I started working on the
  filtering, I had some restructuring to do - I had made an assumption that
  the filtering was local, so I needed to move the filter logic up a level
  to get the filter state to the fetch system.
- Animation (1 to 2 hours) - I originally worked on the search to result page
  animation. Getting things to line up just right was a little tricky and I
  didn't quite finish polishing things up. I opted to hide the input field
  where I wanted to animate it to the lower right corner - I didn't have time
  to fight with separating the input background and/or fading it out. The
  animation for the list was also a time-suck and it's not great! I have
  thought up some better solutions that would probably fit better with an
  infinite scrolling system.
- CSS implementation (1 to 2 hours) - I originally decided to use plain CSS and
  then I ran into a use case where I preferred to use CSS Modules, so I spent 
  some time switching things over and hooking it up in webpack.
- Debugging (1 to 2 hours) - My biggest issue I ran into was bundling/caching
  data once it was pulled down. I usually use Redux and have a pattern I
  follow to help keep my data organized. I wasn't using Redux and had to spend
  some time debugging an issue where my data was being overridden in a strange
  way.

> If you could go back and give yourself advice at the beginning of the project, what would it be?

- Use create-react-app for the boilerplate to save some time - it's certainly
  good enough! No need to mess with webpack normally.
- Use CSS Modules from the get go - it's so simple to use and just slightly
  augments CSS - don't waste time trying to keep things simple when there's
  a good tool at-hand.
- I've had too many nightmares retooling list after list - I should probably
  just use my existing list components that I've spent a great deal of time
  on and is animating just right - if only I could remember what project I left
  the best one in? The web is too tricky to spend your life fixing edge-cases
  when they may have already been solved.

> Did you learn anything new?

- I haven't really used the GitHub API before - it seems like a nice
  self-documenting API that's pretty easy to work with.
- I learned that I never learn to just use the tools I've developed in the
  past. I guess I feel like I should be writing everything from scratch since
  I'm being tested, but, in reality, if I start a new job, I'll be bringing
  all of those toys with me anyway!
- I learned that I will continue to be a poor judge of time-estimates whenever
  CSS and animation are involved! So maybe I didn't really learn anything
  there.

> Do you feel that this assignment allowed you to showcase your abilities effectively?

- I had a lot of fun working on this assignment. I think it's fair to say that
  it definitely showcases many of my capabilities, but I think it's also fair
  to say that it's not exactly a large-scale project and 4 hours isn't enough
  time to tick all of the boxes that I'd like to tick. But overall, I think
  it's a great test - way better than making me write an inverse binary tree or
  merge-sort or whatever algorithm is "in" today!
- I also wish I could spend some time to finish up the rest of the bonus
  points. I have experience with manipulating the browser history in some
  interesting ways to keep your place in infinite scrolling lists for example.

> Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?

- I'm a big fan of using web-sockets to write multi-user applications and
  games - so real-time networking is at least one skill.
- I also enjoy working with Pixi.js - it brings me back to my Flash days where
  I would write some fun software where you could manipulate bitmap data and
  use sprites for game animations and use some fancy shaders for effects.
- Aside from web-centric things, I really like writing game engines that
  happen to run on the web. I also have a good working knowledge of Box2D that
  I like to pair with Pixi.js for physics simulations in games.
