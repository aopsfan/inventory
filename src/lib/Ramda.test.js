import R from './Ramda';

describe('lensMatcher', () => {
  const data = [
    { key: 'a' }, { key: 'b' }, { key: 'c' }
  ];

  it('updates a found value', () => {
    const matcher = R.propEq('key', 'b');
    const defaultValue = {};

    const lens = R.lensMatcher(matcher, defaultValue);

    expect(R.view(lens, data)).toEqual({ key: 'b' });

    expect(R.set(lens, { key: 'z' }, data)).toEqual([
      { key: 'a' }, { key: 'z' }, { key: 'c' }
    ]);
  });

  it('creates with a default', () => {
    const matcher = R.propEq('key', 'z');
    const defaultValue = { key: 'default' };

    const lens = R.lensMatcher(matcher, defaultValue);

    expect(R.view(lens, data)).toEqual(defaultValue);

    expect(R.set(lens, { key: 'z' }, data)).toEqual([
      { key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'z' }
    ]);
  });
})
