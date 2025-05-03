let canvas, gl;
let a_Position, u_Color, u_Size;
let g_shapesList = [];
let g_selectedShape = 'square';
let g_color = [1.0, 0.0, 0.0];
let g_size = 10;
let g_segments = 10;

class Shape {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }

  render() { }
}

class Triangle extends Shape {
  render() {
    let d = this.size / 200;
    drawTriangle([
      this.x, this.y + d,
      this.x - d, this.y - d,
      this.x + d, this.y - d,
    ], this.color);
  }
}

class Square extends Shape {
  render() {
    let d = this.size / 200;
    drawTriangle([
      this.x - d, this.y + d,
      this.x - d, this.y - d,
      this.x + d, this.y + d,
    ], this.color);
    drawTriangle([
      this.x + d, this.y + d,
      this.x - d, this.y - d,
      this.x + d, this.y - d,
    ], this.color);
  }
}

class Circle extends Shape {
  constructor(x, y, color, size, segments) {
    super(x, y, color, size);
    this.segments = segments;
  }

  render() {
    let verts = [this.x, this.y];
    for (let i = 0; i <= this.segments; i++) {
      let angle = i * 2 * Math.PI / this.segments;
      verts.push(
        this.x + Math.cos(angle) * this.size / 200,
        this.y + Math.sin(angle) * this.size / 200
      );
    }
    drawFan(verts, this.color);
  }
}

// ⭐ NEW: Star shape class
class Star extends Shape {
  render() {
    const verts = [];
    const spikes = 5;
    const outerRadius = this.size / 200;
    const innerRadius = outerRadius / 2;
    const centerX = this.x;
    const centerY = this.y;

    verts.push(centerX, centerY); // center point for TRIANGLE_FAN

    for (let i = 0; i <= spikes * 2; i++) {
      const radius = (i % 2 === 0) ? outerRadius : innerRadius;
      const angle = (Math.PI / spikes) * i;
      verts.push(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
    }

    drawFan(verts, this.color);
  }
}

function main() {
  setupWebGL();
  connectVariablesToGLSL();

  canvas.onmousedown = handleClick;
  canvas.onmousemove = function (e) {
    if (e.buttons === 1) handleClick(e);
  };
}

function setupWebGL() {
  canvas = document.getElementById('webgl');
  gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
  if (!gl) {
    console.log('Failed to get WebGL context');
    return;
  }
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function connectVariablesToGLSL() {
  const vert = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vert, `
    attribute vec4 a_Position;
    uniform float u_Size;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = u_Size;
    }
  `);
  gl.compileShader(vert);

  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(frag, `
    precision mediump float;
    uniform vec3 u_Color;
    void main() {
      gl_FragColor = vec4(u_Color, 1.0);
    }
  `);
  gl.compileShader(frag);

  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.useProgram(program);

  a_Position = gl.getAttribLocation(program, 'a_Position');
  u_Color = gl.getUniformLocation(program, 'u_Color');
  u_Size = gl.getUniformLocation(program, 'u_Size');
}

function handleClick(ev) {
  const [x, y] = convertCoordinates(ev);
  let shape;
  switch (g_selectedShape) {
    case 'triangle': shape = new Triangle(x, y, [...g_color], g_size); break;
    case 'square': shape = new Square(x, y, [...g_color], g_size); break;
    case 'circle': shape = new Circle(x, y, [...g_color], g_size, g_segments); break;
    case 'star': shape = new Star(x, y, [...g_color], g_size); break; // ⭐ Added
  }
  g_shapesList.push(shape);
  renderAllShapes();
}

function convertCoordinates(ev) {
  const rect = canvas.getBoundingClientRect();
  const x = (ev.clientX - rect.left - canvas.width / 2) / (canvas.width / 2);
  const y = (canvas.height / 2 - (ev.clientY - rect.top)) / (canvas.height / 2);
  return [x, y];
}

function clearCanvas() {
  g_shapesList = [];
  gl.clear(gl.COLOR_BUFFER_BIT);
}

function renderAllShapes() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  for (let shape of g_shapesList) {
    shape.render();
  }
}

function drawTriangle(vertices, color) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.uniform3fv(u_Color, color);
  gl.uniform1f(u_Size, g_size);
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
}

function drawFan(vertices, color) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  gl.uniform3fv(u_Color, color);
  gl.uniform1f(u_Size, g_size);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);
}

function drawTriangleArt() {
    clearCanvas();
  
   const brown = [0.545, 0.271, 0.075];
   const red = [1.0, 0.0, 0.0];
   const green = [0.5, 1.0, 0.0];
   const blue = [0.3, 0.6, 1.0];
   const yellow = [1.0, 1.0, 0.0];
   const pink = [1.0, 0.4, 0.7];
  
   const size = 30;
   const centerX = 0;
   const centerY = 0;

   g_shapesList.push(new Triangle(centerX - 0.1, centerY + 0.1, brown, size));
   g_shapesList.push(new Triangle(centerX + 0.1, centerY + 0.1, brown, size));
  
   g_shapesList.push(new Triangle(centerX, centerY + 0.3, red, size));
  
  for (let i = 0; i < 3; i++) {
    g_shapesList.push(new Triangle(centerX - 0.3, centerY + i * 0.05 - 0.1, green, size - i * 5));
  }

  for (let i = 0; i < 3; i++) {
    g_shapesList.push(new Triangle(centerX + 0.3, centerY + i * 0.05 - 0.1, green, size - i * 5));
  }

   g_shapesList.push(new Triangle(-0.6, 0.6, yellow, 10));
   g_shapesList.push(new Triangle(-0.6, 0.7, yellow, 10));
   g_shapesList.push(new Triangle(-0.5, 0.65, yellow, 10));
   g_shapesList.push(new Triangle(-0.7, 0.65, yellow, 10));

  for (let i = -3; i <= 3; i++) {
    const x = i * 0.1;
    const color = i % 2 === 0 ? blue : pink;
    g_shapesList.push(new Triangle(x, -0.4, color, 15));
  }
  
   renderAllShapes();
}

window.onload = main;
