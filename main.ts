// ReactionGame – instrukce v README.md
let state: string = "passive"; // jaký stav je aktivní (passive | started | running)
let maxTime: number = 20; // kolik mají hráči času na stisknutí tlačítka
const waitTime = randint(3, 6);

basic.forever(function () {
    if (state === "passive" && input.buttonIsPressed(Button.AB)) { // jakmile jsou zmáčknuty obě tlačítka, spustí se hra
        basic.pause(50);
        state = "started";
    } else if (state === "started") {
        let pressedA = input.buttonIsPressed(Button.A);
        let pressedB = input.buttonIsPressed(Button.B); // tlačítka z README.md
        let pressedAB = input.buttonIsPressed(Button.AB);
        basic.clearScreen();
        led.plot(2, 0);
        led.plot(3, 0);
        led.plot(1, 0);
        led.plot(1, 1);
        led.plot(3, 1);
        led.plot(2, 2);
        led.plot(1, 3);
        led.plot(3, 3);
        led.plot(2, 4); // Ukážou se přesípací hodiny
        led.plot(1, 4); // Ukážou se přesípací hodiny
        led.plot(3, 4); // Ukážou se přesípací hodiny
        if (pressedA === true && pressedB === false) {
            basic.clearScreen();
            basic.showString("B"); // Pokud hráč A stiskne tlačítko moc brzy, vyhrává hráč B
            control.runInBackground(() => music.playTone(440, 200));
            basic.pause(2000);
            basic.clearScreen();
            state = "passive";
        } else if (pressedB === true && pressedA === false) {
            basic.clearScreen();
            basic.showString("A"); // Pokud hráč B stiskne tlačítko moc brzy, vyhrává hráč A
            control.runInBackground(() => music.playTone(440, 200));
            basic.pause(2000);
            basic.clearScreen();
            state = "passive";
        } else if (pressedA === true && pressedB === true) {
            basic.clearScreen();
            basic.showIcon(IconNames.Square);
            control.runInBackground(() => music.playTone(440, 200));
            basic.pause(2000);
            basic.clearScreen();
            state = "passive";
        }
        basic.pause(waitTime * 1000);
        state = "running";
        basic.showIcon(IconNames.Pitchfork)
    } else if (state === "running") {
        let pressedA = input.buttonIsPressed(Button.A);
        let pressedB = input.buttonIsPressed(Button.B); // tlačítka z README.md
        let pressedAB = input.buttonIsPressed(Button.AB);
        if (pressedA === true && pressedB === false) {
            basic.clearScreen();
            basic.showString("A"); // Pokud hráč A stiskne tlačítko včas, vyhrává hráč A
            control.runInBackground(() => music.playTone(440, 200));
            basic.pause(2000);
            basic.clearScreen();
            state = "passive";
        } else if (pressedA === false && pressedB === true) {
            basic.clearScreen();
            basic.showString("B"); // Pokud hráč B stiskne tlačítko včas, vyhrává hráč B
            control.runInBackground(() => music.playTone(440, 200));
            basic.pause(2000);
            basic.clearScreen();
            state = "passive";
        } else if (pressedAB === true) {
            basic.clearScreen();
            basic.showIcon(IconNames.Square); // Pokud stisknou oba hráči tlačítko, je remíza
            control.runInBackground(() => music.playTone(440, 200));
            basic.pause(2000);
            basic.clearScreen();
            state = "passive";
        }
    }
})