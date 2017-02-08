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
  numeral.register('locale', 'bg', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
    abbreviations: {
      thousand: 'хил',
      million: 'млн',
      billion: 'млрд',
      trillion: 'трлн'
    },
    ordinal: function(number) {
      return '';
    },
    currency: {symbol: 'лв'}
  });
}));
