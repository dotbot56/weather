const { openBrowser, goto, write, click, closeBrowser, text, into, press } = require('taiko');
const assert = require('assert');

step("Öffne die Wetter-App", async function() {
    await openBrowser();
    await goto('https://dotbot56.github.io/weather/'); // Hier die URL deiner Wetter-App einfügen
});

step("Gib die Adresse <address> in das Eingabefeld ein", async function(address) {
    await write(address, into(textBox({placeholder: "Adresse eingeben"})));
});

step("Klicke auf <button>", async function(button) {
    await click(button);
});

step("Überprüfe, ob die Wetterdaten angezeigt werden", async function() {
    assert(await text('Temperatur').exists());
    assert(await text('Luftdruck').exists());
    assert(await text('Luftfeuchtigkeit').exists());
});

afterSuite(async () => {
    await closeBrowser();
});
