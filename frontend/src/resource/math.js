function average(array) {
  var zasum = 0;
  for (var i = 0; i < array.length; i++) {
    zasum += array[i];
  }
  return zasum / array.length;
}
function range(array) {
  var biggest = array[0];
  var smallest = array[0];
  for (const item of array) {
    if (item > biggest) {
      biggest = item;
    }
    if (item < smallest) {
      smallest = item;
    }
  }
  return biggest - smallest;
}
function mode(array) {
  dict = {};
  for (const item of array) {
    if (dict.hasOwnProperty(item)) {
      dict[item] += 1;
    }
    else {
      dict[item] = 1;
    }
  }
  var biggest = 0;
  var mode;
  for (const key of Object.keys(dict)) {
    if (dict[key] > biggest) {
      biggest = dict[key];
      mode = key;
    }
  }
  return mode;
}

export default { average, range, mode };
