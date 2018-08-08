import R from './Ramda';

const localStorageKey = 'inventoryApp';

const getState = () => {
  const data = localStorage.getItem(localStorageKey);
  return JSON.parse(data);
}

const setStateWithLens = R.curry((source, lens, f) => {
  source.setState(prevState => {
    const newState = R.over(lens, f, prevState);
    localStorage.setItem(localStorageKey, JSON.stringify(newState));
    return newState;
  });
});

const withState = R.curry((component, props) => {
  const getProp = R.map(R.view(R.__, props.source.state), props.lenses);
  const setProp = R.map(setStateWithLens(props.source, R.__), props.lenses);

  const withStateProps = R.pipe(   // component
    R.assoc('get', getProp),       // component with get property
    R.assoc('set', setProp),       // component with get & set properties
  );

  return component(withStateProps(props));
});

export default { getState, withState };
