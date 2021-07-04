// LocalStorage Set
export function LSSet(key) {
  this.key = key;
}

LSSet.prototype.get = function () {
  const valString = localStorage.getItem(this.key);
  const valSet = valString ? new Set(JSON.parse(valString)) : new Set();
  return valSet;
};

LSSet.prototype.add = function (val) {
  const valSet = this.get();
  valSet.add(val);
  localStorage.setItem(this.key, JSON.stringify([...valSet]));
  return valSet;
};

LSSet.prototype.delete = function (val) {
  const valSet = this.get();
  valSet.delete(val);
  localStorage.setItem(this.key, JSON.stringify([...valSet]));
  return valSet;
};

LSSet.prototype.has = function (val) {
  const valSet = this.get();
  return valSet.has(val);
};
