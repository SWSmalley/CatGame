#Cat Game

A simple browser game built to test my understanding of react hooks, tailwind CSS and JS.

Click the flashing squares to navigate round the map! collect the blue fish without being caught by the tabby cats to clear each level.

####To Do####
- refactor gameover screens to be independent of hover and reimplement a way of having them fade in.
  - despite the program scaling to screen sizes well this currently breaks mobile compatibility due to lack of mouse hover.
- implement a way of returning to the main menu / reinitialising the game entirely.
- investigate turn structure that allows AI to take a move at initialisation
- refactor validmoves to prevent errors on the first turn calculations.
- implement more predictable AI, currently randomness is making player decisions purely reactionary.
- actually end the game on lives < 1
- explore refactoring options using usecallback
