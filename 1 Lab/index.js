var Generator = function(x0, a, c, m, n){
  this.x0 = x0;
  this.a = a;
  this.c = c;
  this.m = m;
  this.n = n;
};
Generator.prototype.generateFreq = function(){
  let array = Array(this.n);
  array[0] = this.x0;
  for (let i = 1; i < array.length; i++) {
    array[i] = (this.a * array[i-1] + this.c ) % this.m; 
  }
  this.array = array;
  return array;
}

Generator.prototype.normalizedArray = function(){
  return this.array.map((element) => {
    return element / this.m;
  });
}

Generator.prototype.mathExp = function(){
  var sum = 0;
  this.normalizedArray().forEach((element) => {
    sum += element;
  });

  return (this.mathExpectation = (sum / this.array.length));
}

Generator.prototype.disp = function(){
  var mathExp = this.mathExp();
  var sum = 0;
  this.normalizedArray().forEach((element) => {
    sum += Math.pow(element - mathExp, 2);
  });

  return sum / this.array.length;
}

Generator.prototype.sqrDivergence = function(){
  return Math.sqrt(this.disp());
}




var generate = function(){
  let x0 = Number($('#seed').val());
  let a = Number($('#a').val());
  let c = Number($('#c').val());
  let m = Number($('#m').val());
  let n = Number($('#n').val());
  var generator = new Generator(x0, a, c, m, n);
  var frequency = generator.generateFreq();
  var normalizedFreq = generator.normalizedArray();
  var disp = generator.disp();
  var math = generator.mathExp();
  var div = generator.sqrDivergence();
  $('#math').text(math.toFixed(4));
  $('#disp').text(disp.toFixed(4));
  $('#sqr').text(div.toFixed(4));

  var data = [
    {
      x: normalizedFreq,
      type: 'histogram',
    marker: {
      color: 'rgba(100,250,100,0.7)',
    },
    }
  ];
  Plotly.newPlot('pane', data);
}
generate();
