# Cat Game

A simple browser game built to test my understanding of react hooks, tailwind CSS and JS.

Play it [here](https://swsmalley.github.io/CatGame/)

Click the flashing squares to navigate round the map! collect the blue fish without being caught by the tabby cats to clear each level.

# To Do
- Refactor gameover screens to be independent of hover and reimplement a way of having them fade in.
  - Despite the program scaling to screen sizes well this currently breaks mobile compatibility due to lack of mouse hover.
- Implement a way of returning to the main menu / reinitialising the game entirely.
- Refactor validmoves to prevent errors on the first turn calculations.
- Implement more predictable AI, currently randomness is making player decisions purely reactionary.
- End the game on lives < 1
- explore refactoring options using usecallback.
