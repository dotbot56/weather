const { openBrowser, goto, write, click, closeBrowser, text } = require('taiko');

step("Gehe zu <url>", async function(url) {
    await openBrowser();
    await goto(url);
});

step("Gib <address> in das Eingabefeld ein", async function(address) {
    await write(address);
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
