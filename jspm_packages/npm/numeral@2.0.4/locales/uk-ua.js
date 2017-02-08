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
  numeral.register('locale', 'uk-ua', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
    abbreviations: {
      thousand: 'тис.',
      million: 'млн',
      billion: 'млрд',
      trillion: 'блн'
    },
    ordinal: function() {
      return '';
    },
    currency: {symbol: '\u20B4'}
  });
}));
