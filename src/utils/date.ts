export function formatDate(date: Date, format = "YYYY.MM.dd") {
  function appendZero(str: string) {
    return str.length === 1 ? `0${str}` : str;
  }

  const formatted = format.replace(/(YYYY|YY|MM|dd)/gi, function (target) {
    switch (target) {
      case "YYYY": {
        return date.getFullYear().toString();
      }
      case "YY": {
        return appendZero((date.getFullYear() % 1000).toString());
      }
      case "MM": {
        return appendZero((date.getMonth() + 1).toString());
      }
      case "dd": {
        return appendZero(date.getDate().toString());
      }
      default: {
        return target;
      }
    }
  });

  return formatted;
}
