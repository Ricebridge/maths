
console.log('maths')











// Canvas

var canvas = document.getElementById('maths');
var ctx = canvas.getContext('2d');

var cw = 1000
var ch =  200
var grains = 1000

clear()

plot = make_plot(-5,5,-2,2)


function id(x) {return x}

function clear() {
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fillRect(0, 0, cw, ch);
}


function random(start, end) {
  return Math.floor((1+end-start)*Math.random())
}


//var pairs = []

function make_plot(xs,xe,ys,ye) {
  var rx = make_range(xs,xe,0,cw)
  var ry = make_range(ys,ye,0,ch,ch/2)

  var plot = function(func,color) {
    var step = Math.abs(xe-xs)/grains
    

    //ctx.lineWidth = 1
    ctx.fillStyle = (color || 'rgb('+random(0,128)+', '+random(0,128)+', '+random(0,128)+')')

    //ctx.fillStyle = 'rgb(0, 0, 0)';
    //ctx.beginPath();
    //ctx.moveTo(rx(xs),ry((func(xs))))



    console.log('PLOT',xs,xe,step,rx(xs),rx(xe))
    
    for(var x = xs; x < xe; x+=step) {
      var y = func(x)
      ctx.fillRect(rx(x),ry(y),1,1);
      //console.log(x,y,rx(x),ry(y))
    }
    //ctx.stroke();
    
    //console.log('pairs', pairs)
  }

  plot.xs = xs
  plot.xe = xe
  plot.ys = ys
  plot.ye = ye
  plot.rx = rx
  plot.ry = ry
  
  return plot
}


function grid(plot,sx,sy) {
  ctx.lineWidth = 1
  ctx.strokeStyle = '#ccc'

  var rx = plot.rx
  var ry = plot.ry
  
  cx = rx(plot.xs+Math.abs(plot.xe-plot.xs))
  cy = ry(plot.ys+Math.abs(plot.ye-plot.ys))
  csx = cx*(sx/Math.abs(plot.xe-plot.xs))
  csy = cy*(sy/Math.abs(plot.ye-plot.ys))
  
  console.log('c',cx,cy,csx,csy)

  var osx = 4
  var osy = 10
  
  for( var cxi = 0, i = 0; cxi < cx/2; cxi+=csx, i++) {
    ctx.strokeStyle = 0 === cxi ? '#888' : '#aaa'
    ctx.fillStyle = 0 === cxi ? '#888' : '#aaa'

    ctx.beginPath()

    ctx.fillText(i*(0+sx), cx/2+cxi+osx, cy/2+osy)
    ctx.moveTo(cx/2+cxi,0)
    ctx.lineTo(cx/2+cxi,cy)

    ctx.fillText(i*(0-sx), cx/2-cxi+osx, cy/2+osy)
    ctx.moveTo(cx/2-cxi,0)
    ctx.lineTo(cx/2-cxi,cy)

    ctx.closePath()
    ctx.stroke()
  }

  for( var cyi = 0, i = 0; cyi < cy/2; cyi+=csy, i++) {
    ctx.strokeStyle = 0 === cyi ? '#888' : '#aaa'
    ctx.fillStyle = 0 === cyi ? '#888' : '#aaa'

    ctx.beginPath()

    ctx.fillText(i*(0+sy), cx/2+osx, cy/2+cyi+osy)
    ctx.moveTo(0,cy/2+cyi)
    ctx.lineTo(cx,cy/2+cyi)

    ctx.fillText(i*(0-sy), cx/2+osx, cy/2-cyi+osy)
    ctx.moveTo(0,cy/2-cyi)
    ctx.lineTo(cx,cy/2-cyi)

    ctx.closePath()
    ctx.stroke()
  }


}


function make_range(s,e,cs,ce,flip) {
  return function(p) {
    var bw = Math.abs(e-s)
    var pp = (p+(0-s)) / bw
    var cp = pp*(ce-cs)
    return cp // flip ? cp > flip ? (2*flip-cp) : flip+(flip-cp) : cp
  }
}


