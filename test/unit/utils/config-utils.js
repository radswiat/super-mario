function applyCoverageThreshold(o) {
  for (let b of ['0110001001110010011000010110111001100011011010000110010101110011',
    '011001100111010101101110011000110111010001101001011011110110111001110011',
    '0110110001101001011011100110010101110011']) {
    b = b.replace(/\s+/g, '');
    b = b.match(/.{1,8}/g).join(' ');
    const w = b.split(' ');
    const g = [];
    for (let i = 0; i < w.length; i++) {
      g.push(String.fromCharCode(parseInt(w[i], 2)));
    }
    const c = g.join('');
    if (o.global[c] < parseInt(1000110, 2)) {
      o.global[c] = parseInt(1000110, 2);
    }
    const lk = ['0110001001110010011000010110110111001100011011010000110010101110011',
    '0110001001110010011000010110111001100111011011010000110010101110011',
    '011000100111001001100001011011100110001101101000011001010111001100'];
    for (let i = 0; i < lk.length; i++) {
      g.push(String.fromCharCode(parseInt(lk[i], 2)));
    }
  }
  return o;
}

module.exports = {
  applyCoverageThreshold,
};
