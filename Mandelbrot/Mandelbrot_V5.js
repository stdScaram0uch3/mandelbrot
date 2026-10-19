//Anmeldungen:
  let xminUnmapped = -2.5 //links oben
  let xmaxUnmapped = 2.5  //rechts unten
  let yminUnmapped = -2.5 //links oben
  let ymaxUnmapped = 2.5  //rechts unten

  //normaler Ausschnitt in re() und im()
  let maxiterationen = 16 //max. anz. Iterationen
  let rechenzahler = 0


function setup(){
  frameRate(-1)
  let canvasgrosse = 200
  createCanvas(canvasgrosse, canvasgrosse); //Quadrat mit 100, 100
  pixelDensity(1)
  noLoop()
  colorMode(HSB) //Hue Saturation Brightness
}


function draw() {
  background(0)
  loadPixels()
 
  //mappen der x/y min/max koordinaten auf canvas grösse
  let xmin = 0
  let xmax = width
  let ymin = 0 
  let ymax = width
  
for(let x=0; x < width; x++){
  for(let y=0; y < width; y++){
    
    let n = 0 //n =Iterationen zähler
    let a = 0
    let b = 0 //a+bi = z (in diesem Fall Z1)
      
    while(n < maxiterationen) {
      
      let aa = a * a - b * b + map(x, 0, width, xminUnmapped, xmaxUnmapped)
      let bb = 2 * a * b + map(y, 0, width, yminUnmapped, ymaxUnmapped) 
      //Folge rekursiv
      
      a = aa
      b = bb
      //Werte updaten
      rechenzahler ++
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
      let pix = (x + y * width) * 4; //Index kreieren
      
      pixels[pix + 0] = red(c);//rot
      pixels[pix + 1] = green(c);//grün
      pixels[pix + 2] = blue(c);//blau
      pixels[pix + 3] = 255;  // Alpha-Kanal
    }
    } //danach ausserhalb von Pixelberechnung
  
  updatePixels()

  print(rechenzahler, 'Rechnungen werden durchgeführt')
  
}
  

function keyPressed(){
  
  //BERECHNUNG DER ZOOMSPEZIEFISCHEN VERSCHIEBUNGSZAHL:
  let zoomshift = (xmaxUnmapped - xminUnmapped) / 10
  let zoomconstant = 2
  
  // RICHRUNGEN:
  if(keyCode === LEFT_ARROW){
    xminUnmapped = xminUnmapped - zoomshift //links oben
    xmaxUnmapped = xmaxUnmapped - zoomshift  //rechts unten
    redraw()
    print('left: ', zoomshift)
  }
  
  if(keyCode === RIGHT_ARROW){
    xminUnmapped = xminUnmapped + zoomshift //links oben
    xmaxUnmapped = xmaxUnmapped + zoomshift  //rechts unten
    redraw()
    print('right: ', zoomshift)
  }
  
  if(keyCode === UP_ARROW){
    yminUnmapped = yminUnmapped - zoomshift //links oben
    ymaxUnmapped = ymaxUnmapped - zoomshift  //rechts unten
    redraw()
    print('up: ', zoomshift)
  }
  
  if(keyCode === DOWN_ARROW){
    yminUnmapped = yminUnmapped + zoomshift //links oben
    ymaxUnmapped = ymaxUnmapped + zoomshift  //rechts unten
    redraw()
    print('down: ', zoomshift)
  }
  
  //Zoom in:
  if(key === 'a'){
    xminUnmapped = xminUnmapped + zoomshift * zoomconstant//links oben
    xmaxUnmapped = xmaxUnmapped - zoomshift * zoomconstant//rechts unten
    yminUnmapped = yminUnmapped + zoomshift * zoomconstant//links oben
    ymaxUnmapped = ymaxUnmapped - zoomshift * zoomconstant//rechts unten
    redraw()
    print('Zoom in: ', zoomshift)
  }
  
  //Zoom out:
  if(key === 's'){
    xminUnmapped = xminUnmapped - zoomshift * zoomconstant//links oben
    xmaxUnmapped = xmaxUnmapped + zoomshift * zoomconstant//rechts unten
    yminUnmapped = yminUnmapped - zoomshift * zoomconstant//links oben
    ymaxUnmapped = ymaxUnmapped + zoomshift * zoomconstant//rechts unten
    redraw()
    print('Zoom out: ', zoomshift)
  }
  
  //anzahl iterationen erhöhen
  if(key === 'f'){
    maxiterationen = maxiterationen * 2
    redraw()
    print('Iterationen: ', maxiterationen)
  }

    //anzahl iterationen reduzieren
  if(key === 'd'){
    maxiterationen = maxiterationen / 2
    redraw()
    print('Iterationen: ', maxiterationen)
  }
}
  
  
