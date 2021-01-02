function createArchimedeanSpiralWithBezierCurve(x, y, radius, loops, startingAngle, svgStyle={}, pathsToDisplay) {
  displaySVGPaths(x, y, radius, loops, startingAngle, svgStyle, pathsToDisplay);
}

function get1QDegrees(degrees) {
  return degrees === 0 ? 0 : Math.PI / 180 * (90 - Math.abs((degrees % 180) - 90));
}

function cos(degrees) {
  if (degrees === 90 || degrees === 270) {
    return 0;
  }

  return Math.cos(get1QDegrees(degrees)) * (-1 + (2 * ((Math.ceil( degrees / 90 ) % 3) % 2)));
}

function sin(degrees) {
  if (degrees === 0 || degrees === 180) {
    return 0;
  }

  return Math.sin(get1QDegrees(degrees)) * (1 - 2 * (Math.floor( degrees / 180 ) % 2));
}

function createSVGNode(radius, svgStyle) {
  const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  svgNode.setAttribute("width", radius * 2);
  svgNode.setAttribute("height", radius * 2);

  for (let p in svgStyle) {
    svgNode.setAttribute(p, svgStyle[p]);
  }

  return svgNode;
}

function createSVGCircles(x, y, radius, loops, style) {
  const circlesNumber = loops * 12;
  const circleNodesArray = [];

  for(let i = 1; i <= circlesNumber; i ++) {
    const circleNode = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circleNode.setAttributeNS(null, 'cx', x);
    circleNode.setAttributeNS(null, 'cy', y);
    circleNode.setAttributeNS(null, 'r', radius / circlesNumber * i);
    circleNode.setAttributeNS(null, 'stroke', 'black');
    circleNode.setAttributeNS(null, 'fill', 'none');
    
    for (let p in style) {
      circleNode.setAttributeNS(null, p, style[p]);
    }

    circleNodesArray.push(circleNode);
  }

  return circleNodesArray;
}

function createSVGXYAxesPath(x, y, radius, style) {
  const axesNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  
  const pathString = `M  ${x},${y} 
  L ${(x - radius)},${y} 
  M ${x},${y} 
  L ${(x + radius)},${y} 
  M ${x},${y} 
  L ${x},${(y - radius)} 
  M ${x},${y} 
  L ${x},${(y + radius)}`;

  axesNode.setAttributeNS(null, 'd', pathString);
  axesNode.setAttributeNS(null, 'fill', 'none');
  axesNode.setAttributeNS(null, 'stroke', 'black');

  for (let p in style) {
    axesNode.setAttributeNS(null, p, style[p]);
  }

  return axesNode;
}

function createSVGAnglesPath(x, y, radius, loops, style) {
  const anglesNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const iterations = loops * 12;
  const iterationIncrement = radius / iterations;

  let pathString = "";

  for(let i = 1; i <= 12; i ++) {
    pathString += " M" + x + "," + y;
    pathString += " L";
    const xa = (cos(i * 30) * 12 * loops * iterationIncrement);
    const ya = (sin(i * 30) * 12 * loops * iterationIncrement);
    pathString += " " + (x + xa).toFixed(2) + "," + (y - ya).toFixed(2);
  }

  anglesNode.setAttributeNS(null, 'd', pathString);
  anglesNode.setAttributeNS(null, 'fill', 'none');
  anglesNode.setAttributeNS(null, 'stroke', 'black');

  for (let p in style) {
    anglesNode.setAttributeNS(null, p, style[p]);
  }

  return anglesNode;
}

function createSVGArchimedeanSpiralLinesPath(x, y, archimedeanPoints, style) {
  const pointsNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  let pathString = " M" + x + "," + y;;
  for(let i = 0; i < archimedeanPoints.length; i ++) {
    pathString += " L";
    pathString += " " + archimedeanPoints[i].x.toFixed(2) + "," + archimedeanPoints[i].y.toFixed(2);
  }

  pointsNode.setAttributeNS(null, 'd', pathString);
  pointsNode.setAttributeNS(null, 'fill', 'none');
  pointsNode.setAttributeNS(null, 'stroke', 'red');

  for (let p in style) {
    pointsNode.setAttributeNS(null, p, style[p]);
  }

  return pointsNode;
}

function toFixed(number, decimals) {
  if(isNaN(number)) {
    throw Error("number param is not a number.");
  }

  if(isNaN(decimals)) {
    throw Error("decimals param is not a number.");
  }

  const fixedNumber = number.toFixed(2);
  return fixedNumber - parseInt(fixedNumber) > 0 ? fixedNumber : parseInt(fixedNumber);
}

function createSVGArchimedeanQuadraticBezierCurvesPath(x, y, archimedeanPoints, startingAngle, iterationIncrement, style) {
  const pointsNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const bezierControlPoint = calculateBezierControlPoint(x, y, startingAngle, iterationIncrement);
  
  let pathString = " M" + x + "," + y;
  pathString += " Q";
  pathString += " " + toFixed(bezierControlPoint.xb, 2) + "," + toFixed(bezierControlPoint.yb, 2);
  pathString += " " + toFixed(archimedeanPoints[0].x, 2) + "," + toFixed(archimedeanPoints[0].y, 2);

  for(let i = 1; i < archimedeanPoints.length; i ++) {
    pathString += " T";
    pathString += " " + toFixed(archimedeanPoints[i].x, 2) + "," + toFixed(archimedeanPoints[i].y, 2);
  }

  pointsNode.setAttributeNS(null, 'd', pathString);
  pointsNode.setAttributeNS(null, 'fill', 'none');
  pointsNode.setAttributeNS(null, 'stroke', 'black');

  for (let p in style) {
    pointsNode.setAttributeNS(null, p, style[p]);
  }

  return pointsNode;
}

function displaySVGPaths(x, y, radius, loops, startingAngle, svgStyle={}, pathsToDisplay={}) {
  const svgNode = createSVGNode(radius, svgStyle);
  document.body.appendChild(svgNode);

  pathsToDisplay.axes && svgNode.appendChild(createSVGXYAxesPath(x, y, radius, pathsToDisplay.axes));
  pathsToDisplay.angles && svgNode.appendChild(createSVGAnglesPath(x, y, radius, loops, pathsToDisplay.angles));
  pathsToDisplay.circles && createSVGCircles(x, y, radius, loops, pathsToDisplay.circles).forEach(c => svgNode.appendChild(c));
  pathsToDisplay.spiral360 && svgNode.appendChild(createArchimedeanSpiral360Path(x, y, radius, loops, pathsToDisplay.spiral360));
  const archimedean12Points = calculateArchimedeanSpiral12Points(x, y, radius, loops, startingAngle, true);
  pathsToDisplay.spiralLines && svgNode.appendChild(createSVGArchimedeanSpiralLinesPath(x, y, archimedean12Points, pathsToDisplay.spiralLines));
  const iterations = loops * 12;
  const iterationIncrement = radius / iterations;
  const spiralQuadraticBezierCurvesPath = createSVGArchimedeanQuadraticBezierCurvesPath(x, y, archimedean12Points, startingAngle, iterationIncrement, pathsToDisplay.style);
  svgNode.appendChild(spiralQuadraticBezierCurvesPath);
}

function calculateArchimedeanSpiral12Points(x, y, radius, loops, startAngle, clockwise) {
  const archimedeanPoints = [];
  const angleIncrement = 30;
  const iterations = loops * 12;
  const iterationIncrement = radius / iterations;
  const angleDirectionFactor = clockwise ? -1 : 1;

  for (let n = 1; n <= iterations; n++) {
    const angleNumber = 360 + ((startAngle + n * angleIncrement) % 360) * angleDirectionFactor;
    const co = n * iterationIncrement * sin(angleNumber);
    const ca = n * iterationIncrement * cos(angleNumber);

    archimedeanPoints.push({ x: x + ca, y: y - co, angle: angleNumber });
  }

  return archimedeanPoints;
}

function calculateBezierControlPoint(x, y, startingAngle, iterationIncrement) {
  const cosx = cos(startingAngle) * iterationIncrement;
  const siny = sin(startingAngle) * iterationIncrement;
  const xb = (x + (x + cosx)) / 2;
  const yb = (y + (y - siny)) / 2;

  return {xb, yb};
}

function createArchimedeanSpiral360Path(x, y, radius, loops, style) {
  const spiralNode = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  const points = calculateArchimedeanSpiral360Points(x, y, radius, loops);

  let pathString = "M" + x + "," + y + " L";
  for (let i = 0; i < points.length; i++) {
    pathString += " " + points[i].x.toFixed(2) + "," + points[i].y.toFixed(2);
  }

  spiralNode.setAttributeNS(null, 'd', pathString);
  spiralNode.setAttributeNS(null, 'fill', 'none');
  spiralNode.setAttributeNS(null, 'stroke', 'blue');

  for (let p in style) {
    spiralNode.setAttributeNS(null, p, style[p]);
  }

  return spiralNode
}

function calculateArchimedeanSpiral360Points(x, y, radius, loops) {
  const iterations = loops * 360;
  const points = [];
  const scaleFactor = iterations / radius;

  for (let i = 1; i <= iterations; i++) {
    const angleNumber = 360 - ((180 + i) % 360);
    const angle = (2 * Math.PI) / 360 * angleNumber;
    const co = i * Math.sin(angle) / scaleFactor;
    const ca = i * Math.cos(angle) / scaleFactor;

    points.push({ x: x + ca, y: y - co});
  }

  return points;
}
