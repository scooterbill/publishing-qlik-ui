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
  numeral.register('format', 'currency', {
    regexps: {format: /(\$)/},
    format: function(value, format, roundingFunction) {
      var locale = numeral.locales[numeral.options.currentLocale],
          symbols = {
            before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
            after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0]
          },
          output,
          symbol,
          i;
      format = format.replace(/\s?\$\s?/, '');
      output = numeral._.numberToFormat(value, format, roundingFunction);
      if (value >= 0) {
        symbols.before = symbols.before.replace(/[\-\(]/, '');
        symbols.after = symbols.after.replace(/[\-\)]/, '');
      } else if (value < 0 && (!numeral._.includes(symbols.before, '-') && !numeral._.includes(symbols.before, '('))) {
        symbols.before = '-' + symbols.before;
      }
      for (i = 0; i < symbols.before.length; i++) {
        symbol = symbols.before[i];
        switch (symbol) {
          case '$':
            output = numeral._.insert(output, locale.currency.symbol, i);
            break;
          case ' ':
            output = numeral._.insert(output, ' ', i);
            break;
        }
      }
      for (i = symbols.after.length - 1; i >= 0; i--) {
        symbol = symbols.after[i];
        switch (symbol) {
          case '$':
            output = i === symbols.after.length - 1 ? output + locale.currency.symbol : numeral._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
            break;
          case ' ':
            output = i === symbols.after.length - 1 ? output + ' ' : numeral._.insert(output, ' ', -(symbols.after.length - (1 + i)));
            break;
        }
      }
      return output;
    }
  });
}));
