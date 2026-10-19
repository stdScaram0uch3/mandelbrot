//Anmeldungen:
  let xmin = 200
  let xmax = 500
  let ymin = 200
  let ymax = 500
  let newwidth = xmax-xmin


function setup(){
  createCanvas(newwidth, newwidth); //Quadrat mit 100, 100
  pixelDensity(1)
  noLoop()
  colorMode(HSB) //Hue Saturation Brightness
}


function draw() {
  background(0)
  loadPixels()
 
  let maxiterationen = 30 //max. anz. Iterationen
  
for(let x=xmin; x < xmax; x++){
  for(let y=ymin; y < ymax; y++){
    
    let n = 0 //n =Iterationen zähler
    let a = 0
    let b = 0 //a+bi = z (in diesem Fall Z1)
      
    while(n < maxiterationen) {
      
      let aa = a * a - b * b + map(x, xmin, xmax, -2.5, 2.5)
      let bb = 2 * a * b + map(y, ymin, ymax, -2.5, 2.5) 
      //Folge rekursiv
      
      a = aa
      b = bb
      //Werte updaten
      
        if (a * a + b * b > 4){
          break
        }
          
      n++ //n vergrössern
      }
      
      // Pixelberechnung :
      // Mapping der Anzahl der Iterationen auf einen Farbwert
      let hue = map(n, 0, maxiterationen, 0, 255) //hue ist n, gemappt
      let saturation = 255 //maximale Sättigung
      let brightness = map(n, 0, maxiterationen, 20, 255)
    
      if (n  === maxiterationen) {
        brightness = 0;  // Punkte, die zur Mandelbrotmenge gehören, werden schwarz dargestellt
      }
      
      let c = color(hue, saturation, brightness)
      
      // Festlegen der Pixel im Bild
      let newx = x - xmin
      let newy = y - ymin //primitives mapping, nachdem es mit map() probleme gab
      let pix = (newx + newy * newwidth) * 4; //Index kreieren
      
      //let pix = (x * subwidth+ y) * 4; //Index kreieren
      pixels[pix + 0] = red(c);//rot
      pixels[pix + 1] = green(c);//grün
      pixels[pix + 2] = blue(c);//blau
      pixels[pix + 3] = 255;  // Alpha-Kanal
    }
    } //danach ausserhalb von Pixelberechnung
  
  updatePixels()
}
