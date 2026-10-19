function setup(){
  createCanvas(800, 800);
  
  pixelDensity(1)
  noLoop()
}

function draw() {
  loadPixels()
  
  let maxiterationen = 100
  //max. anz. Iterationen
  
for(let x=0; x < width; x++){
  for(let y=0; y < height; y++){
    
    let n = 0//n =Iterationen zähler
    let a = 0
    let b = 0
    //a+bi = z (in diesem Fall Z1)
      
    while(n < maxiterationen) {
      let aa = a * a - b * b + map(x, 0, width, -2.5, 2.5)
      let bb = 2 * a * b + map(y, 0, height, -2.5, 2.5)
      //Folge rekursiv
      
      a = aa
      b = bb
      //werte updaten
      
        if (a * a + b * b > 4){
          break
        }
      n++
      }
        // Mapping der Anzahl der Iterationen auf einen Farbwert
      let bright = map(n, 0, maxiterationen, 0, 255);
      if (n === maxiterationen) {
        bright = 0;  // Punkte, die zur Mandelbrotmenge gehören, werden schwarz dargestellt
      }
       // Festlegen der Pixel im Bild
      let pix = (x + y * width) * 4; //Index kreieren
      pixels[pix + 0] = bright;//rot
      pixels[pix + 1] = bright;//grün
      pixels[pix + 2] = bright;//blau
      pixels[pix + 3] = 255;  // Alpha-Kanal
    }
    }
  updatePixels()
}
