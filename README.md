# Spirals
A small library to draw spirals with javascript and SVG

Easy to use:
```
<html>
  <head>    
    <script src="./spirals.js"></script>
  </head>
  <body>
    <script>
      const paths = {
        circles: {
          stroke: "lightgray",
          opacity: 0.3
        },
        spiral360: {
          stroke: "blue"
        },
        axes:
        {
          stroke: "red", 
          "stroke-width": 5
        },
        angles: {
          stroke: "blue",
        },
        spiralLines: {
          stroke: "orange"
        },
        style: {
          opacity: 0.3
        }
      };

      const svgStyle = {
        width: 500,
        height: 500,       
        viewBox: "0,0 500,500"
      };
      
      createArchimedeanSpiralWithBezierCurve(250, 250, 250, 3, 180, svgStyle, paths);
    </script>  
  </body>
</html>
```

## Archimedean Spirals
To draw an archimedean spiral use the code above.

- The createArchimedeanSpiralWithBezierCurve function will draw an spiral with center in x(250), y(250) and a radius(250) for the number of loops(3) indicated, starting at specific angle(180).
- The final paths object is optional and draw extra shapes that reveal where each point crosses with the angles.
- This implementation uses 12 different angles per loop, in other words it's increasing value is 30 degrees.
- It uses Quadratic [Bezier Curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) algorith in SVG.

More info at [Archimedean Spirals](https://en.wikipedia.org/wiki/Archimedean_spiral)
