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
  numeral.register('locale', 'et', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
    abbreviations: {
      thousand: ' tuh',
      million: ' mln',
      billion: ' mld',
      trillion: ' trl'
    },
    ordinal: function(number) {
      return '.';
    },
    currency: {symbol: '€'}
  });
}));
