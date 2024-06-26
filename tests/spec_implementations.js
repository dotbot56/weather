const { openBrowser, goto, write, click, closeBrowser, text, textBox, into, button } = require('taiko');
const assert= require('assert');

step("Gehe zu <url>", async function(url) {
    await openBrowser({headless:true});
    await goto(url);
});

step("Gib die Adresse <address> in das Eingabefeld ein <input>", async function(address, input) {
    await write(address, into(textBox(input)));
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
