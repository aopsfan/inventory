import * as R from 'ramda';

const lensMatcher = (matcher, defaultValue) => {
  const getter = R.pipe(R.find(matcher), R.or(R.__, defaultValue));

  const setter = (value, data) => {
    const extendedData = R.concat(data, [defaultValue]);
    const index = R.findIndex(matcher, data);
    const list = R.set(R.lensIndex(index), value, extendedData);

    const notFound = (index === -1);
    return notFound ? list : R.dropLast(1, list)
  };
  return R.lens(getter, setter);
};

export default R.assoc('lensMatcher', lensMatcher, R);
