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
  numeral.register('locale', 'be-nl', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
    abbreviations: {
      thousand: 'k',
      million: ' mln',
      billion: ' mld',
      trillion: ' bln'
    },
    ordinal: function(number) {
      var remainder = number % 100;
      return (number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20) ? 'ste' : 'de';
    },
    currency: {symbol: '€ '}
  });
}));
