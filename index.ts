// Import stylesheets
import './style.css';
import p5 = require('p5');

export let p: p5;
new p5((p5: p5) => {
  p = p5;
  p.setup = setup;
  p.draw = draw;
});

function setup() {
  p.createCanvas(512, 450);

  // Die "Frame Rate" bestimmt, wie oft der Bildschirminhalt aktualisiert wird.
  // Experimentiere mit dem Wert bei den Übungen "Bouncy Rectangles" oder
  // "Overlay Rectangles".
  p.frameRate(10);
}

function draw() {
  p.background('black');

  // Level 1: Linien mit Schleifen zeichnen
  //  Probiere die folgenden, beiden Übungen einzeln und gleichzeitig.
  //  Was entsteht für ein Muster?
  //horizontalLines();
  //verticalLines();

  // Level 2: Kompliziertes Muster und Rechtecke mit Schleifen zeichnen
  //crisscross();
  rectangles();

  // Level 3: Wir fügen Zufallszahlen hinzu
  bouncyRectangles();
  //overlayRectangles();
}

// Übung: Zeichne horizontale Linien
function horizontalLines() {
  p.stroke('lime');
  for (let y = 25; y <= 425; y += 20) {
    p.line(25, y, 425, y);
  }
}

// Übung: Was müssen wir ändern, dass die Linien vertikal werden?
function verticalLines() {
  p.stroke('lime');
  for (let x = 25; x <= 425; x += 20) {
    p.line(x, 25, x, 425);
  }
}

// Übung: Verschachteln wir die Schleifen, um ein Muster zu erzeugen.
//  Dabei spielen wir mit dem HSB-Farmschema (https://de.wikipedia.org/wiki/HSV-Farbraum).
function crisscross() {
  p.colorMode(p.HSB, 400);
  for (let y1 = 25; y1 < 400; y1 += 40) {
    p.stroke(y1, 400, 400);
    for (let y2 = 25; y2 < 400; y2 += 40) {
      p.line(25, y1, 425, y2);
    }
  }
}

// Übung: Statt Linien zeichnen wir jetzt Rechtecke
//  Pro-Challenge: Wie kann man die Farben "animieren"?
function rectangles() {
  p.noFill();
  p.colorMode(p.HSB, 400);

  for (let x = 25; x < 400; x += 40) {
    p.fill(x, 400, 400);
    for (let y = 25; y < 400; y += 40) {
      p.rect(x, y, 20, 20);
    }
  }
}

// Übung: Wir lassen die Rechtecke mit Zufallszahlen "tanzen".
function bouncyRectangles() {
  p.noFill();
  p.colorMode(p.HSB, 400);

  for (let x = 25; x < 400; x += 40) {
    p.fill(x, 400, 400);
    for (let y = 25; y < 400; y += 40) {
      p.rect(x + p.random(-3, 3), y + p.random(-3, 3), 20, 20);
    }
  }
}

// Übung: Wir zeichnen ein Kunstwerk aus Rechtecken mit vielen Zufallszahlen.
function fillRandomly(d: number[][][][]) {
  const delta = 8;

  // Y-Koordinate
  for (let y = 0; y < 10; y++) {
    const currentY: number[][][] = [];

    // X-Koordinate
    for (let x = 0; x < 10; x++) {
      const currentX: number[][] = [];

      // Ecke (0..3)
      for (let corner = 0; corner < 4; corner++) {
        const currentCorner: number[] = [];

        // Übereinanderliegende Rechtecke
        for (let rect = 0; rect < 3; rect++) {
          currentCorner.push(p.random(-1 * delta, delta));
        }

        currentX.push(currentCorner);
      }

      currentY.push(currentX);
    }

    d.push(currentY);
  }
}

let dx: number[][][][];
let dy: number[][][][];
function overlayRectangles() {
  // Probiere einmal, das folgende `if`-Statement wegzugeben.
  // Was passiert dann?
  if (!dx) {
    dx = [];
    dy = [];
    fillRandomly(dx);
    fillRandomly(dy);
  }

  p.noFill();
  const colors = ['lime', 'red', 'yellow'];
  for (let rect = 0; rect < 3; rect++) {
    p.stroke(colors[rect]);
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        p.push();
        p.translate(x * 40, y * 40);
        p.beginShape();
        p.vertex(25 + dx[y][x][0][rect], 25 + dy[y][x][0][rect]);
        p.vertex(20 + 25 + dx[y][x][1][rect], 25 + dy[y][x][1][rect]);
        p.vertex(20 + 25 + dx[y][x][2][rect], 20 + 25 + dy[y][x][2][rect]);
        p.vertex(25 + dx[y][x][3][rect], 20 + 25 + dy[y][x][3][rect]);
        p.endShape('close');
        p.pop();
      }
    }
  }
}
