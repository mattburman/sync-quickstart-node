$(function () {
  var context = document.getElementById('drawingSurface')
    .getContext("2d");

  var drawingColor = getRandomColor();
  var paintStart;
  var drawingCommands = [];

  function addDrawingCommand(startCoords, endCoords, customCommand) {
    var command = {
      drawingColor: drawingColor,
      startCoords: startCoords,
      endCoords: endCoords,
      customCommand: customCommand
    };
    drawingCommands.push(command);
  }

  $('#drawingSurface').on('mousedown', start);
  $('#drawingSurface').on('touchstart', start);
  function start(e) {
    paintStart = getCursorPosition(this, e);
  }

  $('#drawingSurface').on('mousemove', draw);
  $('#drawingSurface').on('touchmove', draw);
  function draw(e) {
    if (paintStart) {
      var coords = getCursorPosition(this, e);
      addDrawingCommand(paintStart, coords);
      paintStart = coords;
      redraw();
    }
  }

  $('#drawingSurface').on('mouseup', stop);
  $('#drawingSurface').on('mouseleave', stop);
  $('#drawingSurface').on('touchend', stop);
  $('#drawingSurface').on('touchcancel', stop);

  function stop() {
    paintStart = null;
  };

  function redraw() {
    //Clear the canvas
    context.clearRect(0, 0, context.canvas.width,
                      context.canvas.height);

    context.lineJoin = "round";
    context.lineWidth = 5;

    var startCommandIndex = 0;
    for (var j = drawingCommands.length - 1; j > 0; j--) {
      if (drawingCommands[j].customCommand) {
        startCommandIndex = j;
        break;
      }
    }

    drawFromCommandIndex(startCommandIndex);
  }

  function drawFromCommandIndex(startCommandIndex) {
    for (var i = startCommandIndex; i < drawingCommands.length; i++) {
      context.beginPath();
      context.strokeStyle = drawingCommands[i].drawingColor;
      context.moveTo(drawingCommands[i].startCoords.x,
        drawingCommands[i].startCoords.y);
      context.lineTo(drawingCommands[i].endCoords.x,
        drawingCommands[i].endCoords.y);
      context.stroke();
      context.closePath();
    }
  }
  
  $(document).on('keyup', function (e) {
    if(e.keyCode === 27) {
      addDrawingCommand({ x: 0, y: 0 }, { x: 0, y: 0 }, 'clear');
      redraw();
    }
  });

});

function getCursorPosition(canvas, event) {
  var result = {
    x: event.clientX,
    y: event.clientY
  };

  if (event.originalEvent.targetTouches) {
    var touch;
    var ev = event.originalEvent;
    if (ev.targetTouches.length >= 1) {
      touch = ev.targetTouches.item(0);
    } else {
      touch = ev.touches.item(0);
    }
    result.x = touch.pageX;
    result.y = touch.pageY;
  }

  var rect = canvas.getBoundingClientRect();
  result.x -= rect.left;
  result.y -= rect.top;

  return result;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// prevent elastic scrolling
document.body.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, false);
