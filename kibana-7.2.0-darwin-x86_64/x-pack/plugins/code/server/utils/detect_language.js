"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const path_1 = tslib_1.__importDefault(require("path"));
const extensions = tslib_1.__importStar(require("./extensions.json"));
const languageMap = extensions;
// patch the lib
languageMap['.ts'] = 'typescript';
languageMap['.tsx'] = 'typescript';
function detectByFilename(file) {
    const ext = path_1.default.extname(file);
    if (ext) {
        return languageMap[ext];
    }
    return 'other'; // TODO: if how should we deal with other types?
}
// function readFile(file: string) {
//   return new Promise<string>((resolve, reject) =>
//     fs.readFile(file, 'utf8', (err, content) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(content);
//       }
//     })
//   );
// }
function detectLanguageByFilename(filename) {
    const lang = detectByFilename(filename);
    return lang && lang.toLowerCase();
}
exports.detectLanguageByFilename = detectLanguageByFilename;
async function detectLanguage(file, fileContent) {
    const lang = detectByFilename(file);
    return await Promise.resolve(lang ? lang.toLowerCase() : null);
    // if (!lang) {
    //   let content: string;
    //   if (fileContent) {
    //     content = typeof fileContent === 'string' ? fileContent : fileContent.toString('utf8');
    //   } else {
    //     content = await readFile(file);
    //   }
    //   lang = detect.contents(file, content);
    //   return lang ? lang.toLowerCase() : null;
    // } else {
    //   return Promise.resolve(lang.toLowerCase());
    // }
}
exports.detectLanguage = detectLanguage;
