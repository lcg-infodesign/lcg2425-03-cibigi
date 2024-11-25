let riversData = []; // Array per contenere i dati dei fiumi
let maxLength = 0;   // Lunghezza massima tra i fiumi
let maxArea = 0;     // Area massima tra i fiumi

function preload() {
	// Carica il dataset (deve essere nella stessa directory dello sketch)
	riversData = loadTable("rivers_dataset.csv", "csv", "header");
}

function setup() {
	createCanvas(windowWidth, windowHeight * 4);
	textSize(12);
	textFont("Helvetica");

	// Valori massimi di lunghezza e area
	maxLength = max(riversData.getColumn("length").map(Number));
	maxArea = max(riversData.getColumn("area").map(Number));
}

function draw() {
	background("black");

	// Spazio orizzontale, verticale e tra le linee
	let xOffset = 50;
	let yOffset = 50;
	let lineSpacing = 30;

	for (let i = 0; i < riversData.getRowCount(); i++) {
		// Ottenimento delle informazioni dal dataset
		let name = riversData.getString(i, "name");
		let length = float(riversData.getString(i, "length"));
		let area = float(riversData.getString(i, "area"));
		let temp = float(riversData.getString(i, "avg_temp"));

		// Calcolo di lunghezza, spessore e colore della linea
		let lineLength = map(length, 0, maxLength, 100, width - 2 * xOffset);
		let lineThickness = map(area, 0, maxArea, 2, 20);
		let lineColor = color(map(temp, -10, 40, 0, 255), 0, map(temp, -10, 40, 255, 0));

		// Calcolo del posizionamento
		let xStart = 10;
		let xEnd = width / 2 + lineLength / 2;
		let y = yOffset + i * lineSpacing;

		// Disegno della linea ondulata (leggermente trasparente)
		lineColor.setAlpha(64);
		stroke(lineColor);
		strokeWeight(lineThickness);
		noFill();
		beginShape();
		for (let x = xStart; x <= xEnd; x += 10) {
			// L'oscillazione generata dalla funzione sin() viene sommata alla quota y
			let waveY = y + sin((x - xStart) * 0.05) * 10;
			// Aggiunta del punto ottenuto
			vertex(x, waveY);
		}
		endShape();

		// Nome del fiume
		noStroke();
		fill("white");
		text(name, 30, y);
	}
}

// Ridimensionamento della finestra
function windowResized() {
	resizeCanvas(windowWidth, windowHeight * 4);
}
