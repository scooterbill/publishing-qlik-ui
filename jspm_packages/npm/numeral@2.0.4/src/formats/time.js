/* */ 
"format cjs";
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../numeral'], factory);
  } else if (typeof module === 'object' && module.exports) {
    factory(require('../numeral'));
  } else {
    factory(global.numeral);
  }
}(this, function(numeral) {
  numeral.register('format', 'time', {
    regexps: {
      format: /(:)/,
      unformat: /(:)/
    },
    format: function(value, format, roundingFunction) {
      var hours = Math.floor(value / 60 / 60),
          minutes = Math.floor((value - (hours * 60 * 60)) / 60),
          seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));
      return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    },
    unformat: function(string) {
      var timeArray = string.split(':'),
          seconds = 0;
      if (timeArray.length === 3) {
        seconds = seconds + (Number(timeArray[0]) * 60 * 60);
        seconds = seconds + (Number(timeArray[1]) * 60);
        seconds = seconds + Number(timeArray[2]);
      } else if (timeArray.length === 2) {
        seconds = seconds + (Number(timeArray[0]) * 60);
        seconds = seconds + Number(timeArray[1]);
      }
      return Number(seconds);
    }
  });
}));
