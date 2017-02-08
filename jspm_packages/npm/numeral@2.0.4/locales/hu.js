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
  numeral.register('locale', 'hu', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
    abbreviations: {
      thousand: 'E',
      million: 'M',
      billion: 'Mrd',
      trillion: 'T'
    },
    ordinal: function(number) {
      return '.';
    },
    currency: {symbol: ' Ft'}
  });
}));
