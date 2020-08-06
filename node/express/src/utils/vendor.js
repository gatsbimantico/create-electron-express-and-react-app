let __vendor = {};
const vendor = (dependency) => __vendor[dependency];
vendor.set = (dependencySet) => (__vendor = dependencySet);

module.exports = vendor;
