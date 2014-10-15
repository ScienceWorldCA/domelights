/**
 * Created by Robert Butterworth on 8/12/2014.
 */

function CreateBrushes() {

	var WipeBrush = new Brush();
	{
		WipeBrush.Index = 0;
		WipeBrush.Duration = 40;
		WipeBrush.Render = function(frame, originLight, brushData) {
			HorizontalWipeTime(new THREE.Color(1.0, 0, 0), frame);
			HorizontalWipeTime(new THREE.Color(0.7, 0, 0), frame + 1);
			HorizontalWipeTime(new THREE.Color(0.5, 0, 0), frame + 2);
			HorizontalWipeTime(new THREE.Color(0.2, 0, 0), frame + 3);
			HorizontalWipeTime(new THREE.Color(0.0, 0, 0), frame + 4);
		};

		Brushes.push(WipeBrush);
	}

	var ColorBrush = new Brush();
	{
		ColorBrush.Index = 1;
		ColorBrush.Duration = 50;
		ColorBrush.Render = function(frame, originLight, brushData) {

			var fadeMultiplier = 1 - (1 / this.Duration) * frame;

			var col = new THREE.Color();

			var myCol = brushData[0].getHSL();
			col.setHSL(myCol.h, myCol.s, myCol.l * fadeMultiplier);

			// console.log(frame + " = " + col.r + "," + col.g + "," + col.b);
			setLightColor(col, fadeMultiplier, originLight);
		};

		var htmlUI = new HTMLUI();
		htmlUI.Name = "Solid Color";
		htmlUI.AddUI(new htmlUI.Colors(0));
		htmlUI.AddUI(new htmlUI.Colors(1));
		htmlUI.AddUI(new htmlUI.Checkbox(true, 1));
		ColorBrush.HTMLUI = htmlUI;

		Brushes.push(ColorBrush);
	}

	var GradientBackgroundBrush = new Brush();
	{
		GradientBackgroundBrush.Index = 2;
		GradientBackgroundBrush.Duration = SequenceManager.SequenceLength;
		GradientBackgroundBrush.IsBackground = true;
		GradientBackgroundBrush.PrePaint = function() {
			return false;
		};
		GradientBackgroundBrush.Render = function(frame, originLight, brushData) {
			var col = new THREE.Color();

			var step = 1 / LightMatrixWidth;

			// frame = frame*0.25;
			for ( var y = 0; y < LightMatrixWidth; y++) {
				col.setHSL(y * step, 1, 0.2);
				HorizontalWipeTime(col, frame + y);
			}

		};
		Brushes.push(GradientBackgroundBrush);
	}

	var VerticalRainbowWipeBrush = new Brush();
	{
		VerticalRainbowWipeBrush.Index = 3;
		VerticalRainbowWipeBrush.Duration = (LightMatrixHeight * 3);
		VerticalRainbowWipeBrush.Render = function(frame, originLight, brushData) {
			VerticalWipeTime(new THREE.Color(1, 0, 0), frame);
			if (frame < this.Duration - 2) {
				VerticalWipeTime(new THREE.Color(0, 1, 0), frame + 1);
				VerticalWipeTime(new THREE.Color(0, 0, 1), frame + 2);
			}
		};
		var htmlUI = new HTMLUI();
		htmlUI.Name = "RGB Wipe";
		htmlUI.AddUI(new htmlUI.Colors(0));
		VerticalRainbowWipeBrush.HTMLUI = htmlUI;
		Brushes.push(VerticalRainbowWipeBrush);
	}

	var DomeFlashBrush = new Brush();
	{
		DomeFlashBrush.Index = 4;
		DomeFlashBrush.Duration = 50;
		DomeFlashBrush.Render = function(frame, originLight, brushData) {

			var pulseColour = brushData[0];
			var fadeMultiplier = 1 - (1 / this.Duration) * frame;
			var myColour = pulseColour.getHSL();

			var col = new THREE.Color();
			col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);

			SetAllLights(col, fadeMultiplier);

		};
		var htmlUI = new HTMLUI();
		htmlUI.Name = "Flash Dome";
		htmlUI.AddUI(new htmlUI.Colors(0));
		DomeFlashBrush.HTMLUI = htmlUI;
		Brushes.push(DomeFlashBrush);
	}

	var HorizontalRingBrush = new Brush();
	{
		HorizontalRingBrush.Index = 5;
		HorizontalRingBrush.Duration = 30;
		HorizontalRingBrush.Render = function(frame, originLight, brushData) {

			// TODO: Add nice fade in and fade out + do alpha blend
			// var pulseColour = new THREE.Color(0,1,0);
			var pulseColour = brushData[0];
			var fadeMultiplier = 1 - (1 / this.Duration) * frame;
			var myColour = pulseColour.getHSL();

			var col = new THREE.Color();
			col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);

			var row = GetLightInMatrix(originLight).y;

			VerticalWipeTime(col, row);

		};
		var htmlUI = new HTMLUI();
		htmlUI.Name = "Horizontal Rings";
		htmlUI.AddUI(new htmlUI.Colors(0));
		HorizontalRingBrush.HTMLUI = htmlUI;
		Brushes.push(HorizontalRingBrush);
	}

	var VerticalRingBrush = new Brush();
	{
		VerticalRingBrush.Index = 6;
		VerticalRingBrush.Duration = 30;
		VerticalRingBrush.Render = function(frame, originLight, brushData) {

			// TODO: Add nice fade in and fade out + do alpha blend
			// var pulseColour = new THREE.Color(0,1,0);
			var pulseColour = brushData[0];
			var fadeMultiplier = 1 - (1 / this.Duration) * frame;
			var myColour = pulseColour.getHSL();

			var col = new THREE.Color();
			col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);

			var column = GetLightInMatrix(originLight).x;

			HorizontalWipeTime(col, column);

		};
		var htmlUI = new HTMLUI();
		htmlUI.Name = "Vertical Rings";
		htmlUI.AddUI(new htmlUI.Colors(0));
		VerticalRingBrush.HTMLUI = htmlUI;
		Brushes.push(VerticalRingBrush);
	}

	var LaunchBrush = new Brush();
	{
		// Base section to the Firework Brush
		LaunchBrush.Index = 7;
		LaunchBrush.Duration = 30;
		LaunchBrush.Render = function(frame, originLight, brushData) {

			// TODO: Add nice fade in and fade out + do alpha blend
			var pulseColour = new THREE.Color(0.5, 0.5, 0.5);
			var fadeMultiplier = ((1 / this.Duration) * frame) + 0.5;
			var myColour = pulseColour.getHSL();
			var rippleDistance = brushData[2];

			var col = new THREE.Color();
			// col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);

			var originPosition = GetLightInMatrix(originLight);
			// console.log(originLight + " : " + originPosition.x + " - " +
			// originPosition.y);

			var offset = Math.floor(((1 / this.Duration) * frame) * rippleDistance);

			// var lightIndex = LightMappingMatrix[(originPosition.y - offset)%
			// LightMatrixHeight][originPosition.x-1];
			// col.setHSL(myColour.h, myColour.s, myColour.l *
			// (0.75*fadeMultiplier));
			// if(lightIndex != -1 ){setLightColor(col, lightIndex);}

			var lightIndex = LightMappingMatrix[(originPosition.y - offset)][originPosition.x];

			col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);
			if (lightIndex != -1) {
				setLightColor(col, fadeMultiplier, lightIndex);
			}

			// lightIndex = LightMappingMatrix[(originPosition.y - offset)%
			// LightMatrixHeight][originPosition.x+1];
			// col.setHSL(myColour.h, myColour.s, myColour.l *
			// (0.75*fadeMultiplier));
			// if(lightIndex != -1 ){setLightColor(col, lightIndex);}

			// HorizontalWipeTime(col, column);

		};
		Brushes.push(LaunchBrush);
	}

	var FireWorkBurstBrush = new Brush();
	{
		FireWorkBurstBrush.Index = 8;
		FireWorkBurstBrush.Duration = 30;
		FireWorkBurstBrush.Render = function(frame, originLight, brushData) {

			// TODO: Add nice fade in and fade out + do alpha blend
			var fadeMultiplier = 1 - (1 / this.Duration) * frame;
			var myColour = brushData[0].getHSL();
			if( undefined === ActiveBrushData["rippelDistance"] ) {
				ActiveBrushData["rippelDistance"] = 5;
			}

			var col = new THREE.Color();
			col.setHSL(myColour.h, myColour.s, myColour.l * fadeMultiplier);

			var originPosition = GetLightInMatrix(originLight);

			var offset = Math.floor(((1 / this.Duration) * frame) * ActiveBrushData["rippelDistance"]);

			var step = 2 * Math.PI / 30; // see note 1
			var r = offset;

			for ( var trail = 1; trail < ActiveBrushData["rippelDistance"]; trail++) {
				r = r - trail;
				if (r < 0) {
					r = 0;
				}

				// fadeMultiplier = fadeMultiplier / (trail+1);

				for ( var theta = 0; theta < 2 * Math.PI; theta += step) {
					var x = r * Math.cos(theta);
					var y = r * Math.sin(theta); // note 2.
					// ctx.lineTo(x,y);
					// console.log("X: " + Math.floor(x) + " Y: " +
					// Math.floor(y));
					var xLight = Math.floor(originPosition.y - x) % LightMatrixHeight;
					if (xLight < 0) {
						continue;
					}

					var yLight = Math.floor(originPosition.x - y) % LightMatrixWidth;
					if (yLight < 0) {
						continue;
					}

					// console.log("X: " + Math.floor(originPosition.y - x)%
					// LightMatrixHeight + "Y: " + Math.floor(originPosition.x +
					// y) % LightMatrixWidth);

					var lightIndex = LightMappingMatrix[xLight][yLight];

					col.setHSL(myColour.h, myColour.s, (myColour.l * fadeMultiplier) * (Math.random() * 0.5 + 0.5));
					if (lightIndex != -1) {
						setLightColor(col, fadeMultiplier, lightIndex);
					}
				}
			}
			// HorizontalWipeTime(col, column);

		};
		Brushes.push(FireWorkBurstBrush);
	}

	var FireWorkBurstBrush = new Brush();
	{
		FireWorkBurstBrush.Index = 9;
		FireWorkBurstBrush.Duration = 0;
		FireWorkBurstBrush.PrePaint = function(LightIndex) {
			// Create a Burst at this light
			var newEvent = new EVENT(SequenceManager.SequenceTime, LightIndex, Brushes[8], ActiveBrushData);
			SequenceManager.AddEvent(newEvent);

			var originPosition = GetLightInMatrix(LightIndex);

			// console.log(LightMatrixHeight + " : " + originPosition.x);

			var launchIndex = LightMappingMatrix[LightMatrixHeight - 1][originPosition.x];
			if (launchIndex == -1) {
				launchIndex = LightMappingMatrix[LightMatrixHeight - 1][originPosition.x + 1];
			}

			// console.log("INDEX: " + launchIndex);

			ActiveBrushData[2] = (LightMatrixHeight - 1) - originPosition.y;

			newEvent = new EVENT(SequenceManager.SequenceTime - 30, launchIndex, Brushes[7], ActiveBrushData);
			SequenceManager.AddEvent(newEvent);

			return false;
		};

		var htmlUI = new HTMLUI();
		htmlUI.Name = "Fireworks";
		htmlUI.AddUI(new htmlUI.Colors(0));
		htmlUI.AddUI(new htmlUI.Slider(1, 10, 1, 5, "rippleDistance" ));
		FireWorkBurstBrush.HTMLUI = htmlUI;

		Brushes.push(FireWorkBurstBrush);
	}

}