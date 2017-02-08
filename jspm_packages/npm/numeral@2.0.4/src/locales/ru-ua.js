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
  numeral.register('locale', 'ru-ua', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
    abbreviations: {
      thousand: 'тыс.',
      million: 'млн',
      billion: 'b',
      trillion: 't'
    },
    ordinal: function() {
      return '.';
    },
    currency: {symbol: '\u20B4'}
  });
}));
