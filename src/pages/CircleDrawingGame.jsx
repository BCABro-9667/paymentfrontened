import React, { useState, useRef, useEffect } from 'react';
import '../styles/CircleDrawingGame.css';

const CircleDrawingGame = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [accuracy, setAccuracy] = useState(null);
  const [showInstruction, setShowInstruction] = useState(true);
  const [bestScore, setBestScore] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: Math.min(600, window.innerWidth - 40),
    height: Math.min(600, window.innerWidth - 40)
  });

  const canvasRef = useRef(null);

  const targetRadius = dimensions.width * 0.16;
  const targetCenter = {
    x: dimensions.width / 2,
    y: dimensions.height / 2
  };

  const getEventCoordinates = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleStartDrawing = (e) => {
    if (accuracy !== null) return;

    setIsDrawing(true);
    setShowInstruction(false);

    const { x, y } = getEventCoordinates(e);
    setPoints([{ x, y }]);
  };

  const handleDrawing = (e) => {
    if (!isDrawing || accuracy !== null) return;

    const { x, y } = getEventCoordinates(e);
    setPoints(prev => [...prev, { x, y }]);
  };

  const handleEndDrawing = () => {
    if (isDrawing && points.length > 5) {
      const userCircle = fitCircle(points);
      const acc = calculateAccuracy(userCircle, targetCenter, targetRadius);
      setAccuracy(acc);

      setBestScore(prev => acc > prev ? acc : prev);
    }
    setIsDrawing(false);
  };

  const fitCircle = (points) => {
    let sumX = 0, sumY = 0;
    points.forEach(p => {
      sumX += p.x;
      sumY += p.y;
    });

    const centerX = sumX / points.length;
    const centerY = sumY / points.length;

    let sumR = 0;
    points.forEach(p => {
      const dx = p.x - centerX;
      const dy = p.y - centerY;
      sumR += Math.sqrt(dx * dx + dy * dy);
    });

    const radius = sumR / points.length;

    return { x: centerX, y: centerY, r: radius };
  };

  const calculateAccuracy = (userCircle, targetCenter, targetRadius) => {
    const dx = userCircle.x - targetCenter.x;
    const dy = userCircle.y - targetCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const radiusDiff = Math.abs(userCircle.r - targetRadius);

    const centerScore = Math.max(0, 100 - (distance / 5));
    const radiusScore = Math.max(0, 100 - (radiusDiff / 2));

    const accuracyScore = (centerScore * 0.6 + radiusScore * 0.4);

    return Math.round(accuracyScore * 10) / 10;
  };

  const resetDrawing = () => {
    setPoints([]);
    setAccuracy(null);
    setShowInstruction(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: Math.min(600, window.innerWidth - 40),
        height: Math.min(600, window.innerWidth - 40)
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions and style
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw target circle
    ctx.beginPath();
    ctx.arc(targetCenter.x, targetCenter.y, targetRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(52, 152, 219, 0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = 'rgba(52, 152, 219, 0.1)';
    ctx.fill();

    // Draw user's path
    if (points.length > 1) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = 'rgba(231, 76, 60, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw fitted user circle
    if (accuracy !== null && points.length > 1) {
      const userCircle = fitCircle(points);
      ctx.beginPath();
      ctx.arc(userCircle.x, userCircle.y, userCircle.r, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(231, 76, 60, 0.7)';
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = 'rgba(231, 76, 60, 0.1)';
      ctx.fill();
    }
  }, [points, dimensions, accuracy]);

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Circle Master</h1>
        <p className="subtitle">Test your drawing precision</p>
      </div>

      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          onMouseDown={handleStartDrawing}
          onMouseMove={handleDrawing}
          onMouseUp={handleEndDrawing}
          onMouseLeave={handleEndDrawing}
          onTouchStart={(e) => {
            e.preventDefault();
            handleStartDrawing(e);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            handleDrawing(e);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleEndDrawing();
          }}
        />
        {showInstruction && (
          <div className="instruction-overlay">
            <div className="instruction-text">
              <span className="emoji">🎯</span>
              <p>Trace the blue circle</p>
              <p className="hint">(Try to match it perfectly)</p>
            </div>
          </div>
        )}
      </div>

      {accuracy !== null && (
        <div className="result-container">
          <div className="accuracy-display">
            <div className="accuracy-value">{accuracy}%</div>
            <div className="accuracy-label">Accuracy</div>
          </div>

          {accuracy > bestScore && (
            <div className="best-score-badge">
              <span className="emoji">🏆</span>
              <span>New best score!</span>
            </div>
          )}

          <button onClick={resetDrawing} className="reset-button">
            Try Again
          </button>
        </div>
      )}

      <div className="game-footer">
        <p>Draw with mouse or touch</p>
      </div>
    </div>
  );
};

export default CircleDrawingGame;
