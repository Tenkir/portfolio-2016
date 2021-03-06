'use strict';

var $ = require('jquery');

var backgroundIconArray = []
  , depthElementArray = []
  , lastScrollTop = 0;

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parseMatrix(matrix) {
  var modified = matrix.replace(/^\w+\(/,"[").replace(/\)$/,"]");
  return JSON.parse(modified);
}

function translateWithMatrix(x, y, matrix) {
  var matrixString = 'matrix(';

  matrix[4] = parseInt(matrix[4]) + parseInt(x);
  matrix[5] = parseInt(matrix[5]) + parseInt(y);

  for (var i = 0; i < matrix.length; i++) {
    matrixString += matrix[i];

    if (i < matrix.length - 1) {
      matrixString += ',';
    }
  }

  matrixString += ')';

  return matrixString;
}

function animateBackgroundIcons() {
  for (var i = 0; i < backgroundIconArray.length; i++) {
    var icon = backgroundIconArray[i]
      , currentTransform = parseMatrix(icon.element.css('transform'))
      , bodyElement = $('body')
      , bodyWidth = bodyElement.width()
      , bodyHeight = bodyElement.height()
      , iconElement = icon.element;

    if (iconElement.offset().left + icon.speedX < 0 || iconElement.offset().left + icon.speedX > bodyWidth) {
      icon.speedX *= -1;
    }

    if (iconElement.offset().top + icon.speedY < 0 || iconElement.offset().top + icon.speedY > bodyHeight) {
      icon.speedY *= -1;
    }

    icon.element.css({
      'transform': translateWithMatrix(icon.speedX, icon.speedY, currentTransform)
    });
  }

  setTimeout(function(){
    animateBackgroundIcons();
  }, 1000);
}

$('document').ready(function() {
  depthElementArray = $('*[data-depth]');

  for (var i = 0; i < depthElementArray.length; i++) {
    $(depthElementArray[i]).css('transform', 'translate(0)');
  }

  if ($('.bg-icons').length) {
    var numBackgroundElements = 40
      , availableBackgroundIcons = 2
      , backgroundIconsElement = $('.bg-icons')
      , documentHeight = $('body').height()
      , documentWidth = $('body').width()
      , maxSpeed = 6;

    for (var j = 0; j < numBackgroundElements; j++) {
      var iconVersion = randomNumber(0, availableBackgroundIcons)
        , iconElement = $(document.createElement('span'))
        , top = randomNumber(0, documentHeight)
        , left = randomNumber(0, documentWidth);

      iconElement.addClass('bg-icon bg-icon-' + iconVersion);
      iconElement.css({
        'top': top,
        'left': left
      });

      var iconObject = {
        element: iconElement,
        speedX: randomNumber(-maxSpeed, maxSpeed),
        speedY: randomNumber(-maxSpeed, maxSpeed)
      };

      backgroundIconArray.push(iconObject);
      backgroundIconsElement.append(iconElement);

      animateBackgroundIcons();
    }
  }
});

function moveDepthElements () {
  var currentScrollTop = $(this).scrollTop()
    , moveAmmount = currentScrollTop - lastScrollTop;

  for (var i = 0; i < depthElementArray.length; i++) {
    var depthElement = $(depthElementArray[i])
      , currentTransform = parseMatrix(depthElement.css('transform'))
      , coefficient = 0.1;

    var newTransform = translateWithMatrix(
      0,
      Math.round(-moveAmmount * coefficient * depthElement.data('depth')),
      currentTransform
    );
    depthElement.css({
      'transform': newTransform
    });
  }

  lastScrollTop = currentScrollTop;
}

$(document).scroll(moveDepthElements());

$(document).bind('touchmove', function(e) {
  moveDepthElements();

  if ($('nav').hasClass('open')) {
    e.preventDefault();
  }
});

$('#toggle').click(function(e) {
  e.preventDefault();
  $('body').toggleClass('clip');
  $('nav').toggleClass('open');
});
