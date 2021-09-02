"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This function allows one to create a strongly-typed font for inclusion in
 * the font collection.  As a result, the values and labels are known to the
 * type system, preventing one from specifying a non-existent font at build
 * time.
 */
function createFont(font) {
    return font;
}
exports.americanTypewriter = createFont({
    label: 'American Typewriter',
    value: "'American Typewriter', 'Courier New', Courier, Monaco, mono",
});
exports.arial = createFont({ label: 'Arial', value: 'Arial, sans-serif' });
exports.baskerville = createFont({
    label: 'Baskerville',
    value: "Baskerville, Georgia, Garamond, 'Times New Roman', Times, serif",
});
exports.bookAntiqua = createFont({
    label: 'Book Antiqua',
    value: "'Book Antiqua', Georgia, Garamond, 'Times New Roman', Times, serif",
});
exports.brushScript = createFont({
    label: 'Brush Script',
    value: "'Brush Script MT', 'Comic Sans', sans-serif",
});
exports.chalkboard = createFont({
    label: 'Chalkboard',
    value: "Chalkboard, 'Comic Sans', sans-serif",
});
exports.didot = createFont({
    label: 'Didot',
    value: "Didot, Georgia, Garamond, 'Times New Roman', Times, serif",
});
exports.futura = createFont({
    label: 'Futura',
    value: 'Futura, Impact, Helvetica, Arial, sans-serif',
});
exports.gillSans = createFont({
    label: 'Gill Sans',
    value: "'Gill Sans', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Helvetica, Arial, sans-serif",
});
exports.helveticaNeue = createFont({
    label: 'Helvetica Neue',
    value: "'Helvetica Neue', Helvetica, Arial, sans-serif",
});
exports.hoeflerText = createFont({
    label: 'Hoefler Text',
    value: "'Hoefler Text', Garamond, Georgia, 'Times New Roman', Times, serif",
});
exports.lucidaGrande = createFont({
    label: 'Lucida Grande',
    value: "'Lucida Grande', 'Lucida Sans Unicode', Lucida, Verdana, Helvetica, Arial, sans-serif",
});
exports.myriad = createFont({
    label: 'Myriad',
    value: 'Myriad, Helvetica, Arial, sans-serif',
});
exports.openSans = createFont({
    label: 'Open Sans',
    value: "'Open Sans', Helvetica, Arial, sans-serif",
});
exports.optima = createFont({
    label: 'Optima',
    value: "Optima, 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Helvetica, Arial, sans-serif",
});
exports.palatino = createFont({
    label: 'Palatino',
    value: "Palatino, 'Book Antiqua', Georgia, Garamond, 'Times New Roman', Times, serif",
});
exports.fonts = [
    exports.americanTypewriter,
    exports.arial,
    exports.baskerville,
    exports.bookAntiqua,
    exports.brushScript,
    exports.chalkboard,
    exports.didot,
    exports.futura,
    exports.gillSans,
    exports.helveticaNeue,
    exports.hoeflerText,
    exports.lucidaGrande,
    exports.myriad,
    exports.openSans,
    exports.optima,
    exports.palatino,
];
