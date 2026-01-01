# Parametric-Equation-Through-Points
This project generates smooth, looping curves through an arbitrary set of user-selected points by solving a parametric interpolation system using Gaussian elimination implemented entirely from scratch. Unlike standard polynomial interpolation, this parametric approach supports multiple y-values for a single x, enabling shapes that bend, loop, and cross over themselves.

The result is an interactive creative-coding tool that blends visualization, mathematical modeling, and numerical methods.

# View Project on the Web
## Instructions
- **Click** on the canvas to add a new point.
- **Drag** any point to reposition it.
- Use the **sliders** to control at what value of t the function reaches each point.  
  Adjusting these changes how the parametric curve flows through the points.

## Links
- View in fullscreen: https://editor.p5js.org/GeffenGilbert/full/2GoDL-PAP
- View with the code: https://editor.p5js.org/GeffenGilbert/sketches/2GoDL-PAP

# Features
## Parametric Interpolation
- Builds two systems of equations (for x(t) and y(t)) that map a parameter t to each point
- Allows curves to loop or fold because t is independent of x/y monotonicity
- Supports adjustable t-values via sliders, letting users reshape the curve in real time

## Custom Gaussian Elimination
- Clean, from-scratch implementation of:
  - Matrix construction from point + parameter inputs
  - Row operations
  - Reduced Row Echelon Form (RREF)
  - Coefficient extraction for the parametric functions
- No math libraries—entire linear algebra pipeline is hand-built

## Interactive Visualization
- Real-time rendering in p5.js
- Sliders allow the user to:
  - Control the parameter value assigned to each point
  - Animate the resulting interpolation
  - Explore how parameterization affects curve shape
- Points can be added or modified to generate new curves dynamically

# Code Structure
Clearly separated functions, clean arrays, and readable logic—no classes required.

# Purpose
This project combines creative coding, data visualization, and numerical linear algebra. It's both an exploration tool for curve generation and a demonstration of implementing core math algorithms manually.

# Technologies
- p5.js
- Custom linear algebra (no external libraries)
- JavaScript
