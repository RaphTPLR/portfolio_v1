import React from "react";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.lifetime = 0;
    this.size = 4;
    this.color = { r: 255, g: 255, b: 255 };
  }
}

class Canvas extends React.Component {
  state = {
    cHeight: 0,
    cWidth: 0
  };

  canvas = React.createRef();
  animationActive = false;

  componentDidMount = () => {
    this.setState({
      cHeight: document.body.clientHeight,
      cWidth: document.body.clientWidth
    });

    window.addEventListener(
      "resize",
      () => {
        this.setState({
          cHeight: document.body.clientHeight,
          cWidth: document.body.clientWidth
        });
      },
      false
    );

    if (matchMedia("(pointer:fine)").matches) {
      if (!this.animationActive) {
        this.startAnimation();
      }

      document.addEventListener(
        "click",
        ({ clientX, clientY }) => {
          this.addPoint(clientX - this.canvas.current.offsetLeft, clientY - this.canvas.current.offsetTop);
        },
        false
      );
    }
  };

  startAnimation = () => {
    this.animationActive = true;
    const canvas = this.canvas.current;
    const ctx = canvas.getContext("2d");

    const points = [];

    const addPoint = (x, y) => {
      const point = new Point(x, y);
      points.push(point);
    };

    document.addEventListener(
      "mousemove",
      ({ clientX, clientY }) => {
        addPoint(clientX - canvas.offsetLeft, clientY - canvas.offsetTop);
      },
      false
    );

    const animatePoints = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      const duration = (0.7 * (1 * 1000)) / 60;
    
      for (let i = 0; i < points.length; ++i) {
        const point = points[i];
        let lastPoint;
    
        if (points[i - 1] !== undefined) {
          lastPoint = points[i - 1];
        } else lastPoint = point;
    
        point.lifetime += 1;
    
        if (point.lifetime > duration) {
          points.shift();
        } else {
          const lifePercent = point.lifetime / duration;
          const spreadRate = 7 * (1 - lifePercent);
    
          ctx.lineJoin = "round";
          ctx.lineWidth = spreadRate;
    
          const cursorColor = this.props.darkMode ? 'rgb(255, 255, 255)' : 'rgb(12, 12, 12)';
          ctx.strokeStyle = cursorColor;
          ctx.lineWidth = point.size;
    
          ctx.beginPath();
    
          ctx.moveTo(lastPoint.x, lastPoint.y);
          ctx.lineTo(point.x, point.y);
    
          ctx.stroke();
          ctx.closePath();
        }
      }
      requestAnimationFrame(animatePoints);
    };
    

    animatePoints();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.darkMode !== this.props.darkMode) {
      this.updateCursorColor();
    }
  }

  updateCursorColor = () => {
    const cursorColor = this.props.darkMode ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';
    // Adjust the cursor color logic based on your requirements
    // Use this cursor color in your animation logic or wherever needed
  };


  render = () => {
    const { cHeight, cWidth } = this.state;
    return (
      <canvas
        ref={this.canvas}
        width={cWidth}
        height={cHeight}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 9999, pointerEvents: "none" }}
      />
    );
  };
}

export default Canvas;