Assignment 1: Web Page with Bulma Components
Location: assignment1/index.html
Technologies: HTML, Bulma CSS

This project demonstrates a fully structured HTML page using the Bulma CSS framework. The layout includes:

A <head> and <body> structure.

A <header>, two <section> elements (top and bottom), and a <footer>.

The top section contains a full-width cat image.

The bottom section contains 6 columns with Bulma cards.

Each card includes a header (title) and content (text + Bulma-styled button), each using a different Bulma button style: primary, link, info, success, warning, danger.

The footer includes:

A link to the class code repository.

A mailto link with the student's name as anchor text.



Assignment 2: Tax Form Simulation
Location: assignment2/index.html
Technologies: HTML, Bulma CSS, JavaScript

This assignment recreates a simplified 1040EZ tax form using Bulma CSS and dynamic JavaScript behavior. Features include:

A responsive table layout with 14 rows and 3 columns.

The first column describes the category (Income, Payments/Credits, etc.).

The second column shows line numbers and descriptions.

The third column includes input fields for values.

Rows 4, 5, 6, 9, 10, 13, and 14 are computed automatically based on input.

A checkbox updates values conditionally for joint filing.

Tax calculations use 2023 IRS tax brackets provided via a rates array.





Assignment 3: Tic-Tac-Toe Game with AI
Location: assignment3/index.html, assignment3/tictactoe.js
Technologies: HTML, CSS, Vue.js, JavaScript

This project is an interactive Tic-Tac-Toe game where the user plays against an AI that never loses. Features include:

A 3x3 grid rendered using buttons (cell-i-j class).

Game state stored in a board array.

Vue.js manages reactivity and state rendering.

Clicking a cell makes a move for the player, followed by an automatic computer move.

The game prevents invalid or repeated moves.

A "Reset" button clears the game and restarts it.



CSE 160 - Assignment 1:

WebGL Triangle Art Drawing Tool
Location: assignment4/index.html, assignment4/main.js
Technologies: HTML, WebGL, JavaScript

This creative WebGL assignment implements an interactive shape drawing tool with the following features:

A <canvas> element where users can click to draw:

Triangles, Squares, Circles, and a custom Star shape.

Shape color can be customized using RGB sliders.

Size and segment count (for circles) are adjustable via input ranges.

A "Clear Canvas" button resets the drawing area.

A "Show Triangle Art" button reproduces a preset arrangement of triangles inspired by a hand-drawn sketch (MyTriangleDrawing.jpg), which includes:

A red triangle top (mountain peak),

Symmetrical brown and green shapes forming trees,

A row of alternating blue and pink triangles,

Small yellow decorative triangle clusters.

This assignment demonstrates WebGL rendering logic, shape encapsulation via JavaScript classes, coordinate transformations, and user interaction through mouse events and UI inputs.



CSE 160 - Assignment 2:

3D Animal Model with WebGL Animation
Location: assignment5/index.html
Technologies: HTML, WebGL, JavaScript, glMatrix

This assignment presents an animated 3D animal composed of WebGL-rendered cubes and cylinders. It incorporates interactive UI sliders and buttons for manipulating the model in real time.

Key Features:
WebGL Rendering Pipeline: Custom vertex and fragment shaders handle object positioning and coloring.

Articulated Limbs and Foot Movement: Uses matrix transformations for animating the lower leg and foot independently.

Controls:

Global Rotation: Spins the entire animal.

Limb Angle: Bends the lower leg.

Foot Angle: Rotates the foot.

Toggle Animation: Starts/stops continuous movement.

Shift+Click triggers a kick animation.

Hierarchical Transformations: The head bobs up and down, and limbs are placed with full hierarchical modeling.

Real-time FPS Display: Provides performance feedback to the user.

glMatrix Library: Used for efficient 4x4 matrix operations and 3D camera setup (perspective and view matrices).

This assignment demonstrates a deeper understanding of real-time rendering, animation loops, 3D geometry construction, and interactive graphics programming.


