import numeral from 'numeral';

export class TwoDecimalFormatValueConverter {
  toView(value) {
    if((value == null) || (value == ''))
    {
      return value;
    }
    else
    {
    return numeral(value).format('(0.00)');
    }
  }
}