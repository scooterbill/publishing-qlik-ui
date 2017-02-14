import numeral from 'numeral';

export class WeightValueConverter {
  toView(value) {
    if((value == null) || (value == ''))
    {
      return value;
    }
    else
    {
      if (value > 10)
      {
        value = 10;
      }

      if (value < 0)
      {
        value = 0;
      }

    return numeral(value).format('(0.00)');
    }
  }
}

export class FrequencyValueConverter {
  toView(value) {
    if((value == null) || (value == ''))
    {
      return value;
    }
    else
    {
    return numeral(value).format('(0)');
    }
  }
}

