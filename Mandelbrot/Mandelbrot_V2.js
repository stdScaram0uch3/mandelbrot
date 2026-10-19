let l = 0
function setup(){
  createCanvas(100, 100);
  pixelDensity(1)
  //noLoop()
  colorMode(HSB)
}


function draw() {
  print(l)
  l++
  background(0)
  loadPixels()
  
  let maxiterationen = 20 //max. anz. Iterationen
  
for(let x=0; x < width; x++){
  for(let y=0; y < height; y++){
    
    let n = 0 //n =Iterationen zähler
    let a = 0
    let b = 0 //a+bi = z (in diesem Fall Z1)
      
    while(n < maxiterationen) {
      
      let aa = a * a - b * b + map(x, 0, width, -2.5, 2.5)
      let bb = 2 * a * b + map(y, 0, height, -2.5, 2.5) 
      //Folge rekursiv
      
      a = aa
      b = bb
      //Werte updaten
      
        if (a * a + b * b > 4){
          break
        }
          
      n++ //n vergrössern
      }
      
      // Mapping der Anzahl der Iterationen auf einen Farbwert
      
      let hue = map(n, 0, maxiterationen, 0, 255) //hue ist n, gemappt
      let saturation = 255 //maximale Sättigung
      let brightness = map(n, 0, maxiterationen, 20, 255)
    
      if (n  === maxiterationen) {
        brightness = 0;  // Punkte, die zur Mandelbrotmenge gehören, werden schwarz dargestellt
        print(n)
      }
      
      let c = color(hue, saturation, brightness)
      
       // Festlegen der Pixel im Bild
      let pix = (x + y * width) * 4; //Index kreieren
      pixels[pix + 0] = red(c);//rot
      pixels[pix + 1] = green(c);//grün
      pixels[pix + 2] = blue(c);//blau
      pixels[pix + 3] = 255;  // Alpha-Kanal
    }
    } //danach ausserhalb von Pixelberechnung
  
  updatePixels()
}
