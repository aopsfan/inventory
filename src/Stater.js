import R from './Ramda';

const setStateWithLens = R.curry((source, lens, f) => {
  source.setState(R.over(lens, f));
});

const withState = R.curry((component, props) => {
  const getProp = R.map(R.view(R.__, props.source.state), props.lenses);
  const setProp = R.map(setStateWithLens(props.source, R.__), props.lenses);

  const withStateProps = R.pipe(
    R.assoc('get', getProp),
    R.assoc('set', setProp),
  );

  return component(withStateProps(props));
});

export default withState;
