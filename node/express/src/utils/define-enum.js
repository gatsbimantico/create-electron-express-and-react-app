module.exports = (e) => [e, Object.keys(e).reduce((o, n) => (o[n] = n, o), {})];
