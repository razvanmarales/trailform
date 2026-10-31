# Excel export dependency

`exceljs.min.js` is the unmodified browser bundle from **ExcelJS 4.4.0**
(`exceljs@4.4.0`, `dist/exceljs.min.js` on npm). Its MIT license is
included in `exceljs-LICENSE`.

The local bundle keeps Excel exports available offline and when opening
`index.html` directly. No application build step or CDN is required.

To update it, install the chosen ExcelJS version in a temporary directory,
copy its browser bundle and license here, and verify the exported workbook
with an XLSX reader before changing the documented version.
