import * as svg from "polotno/utils/svg";

function generateTableSVGString(columns, data) {
  columns = columns.slice(0, columns.length - 1);
  const rowHeight = 25;
  const tableWidth = columns.reduce(
    (acc, curr) => acc + (curr.width || curr.minWidth),
    0
  );
  const tableHeight = (data.length + 1) * rowHeight;

  let svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${tableWidth}" height="${tableHeight}">`;

  const drawLine = (x1, y1, x2, y2) => {
    svgString += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="1" />`;
  };

  const renderRow = (row, rowIndex) => {
    let xPosition = 0;
    row.forEach((cell, cellIndex) => {
      const col = columns[cellIndex];

      svgString += `<text x="${xPosition + 2}" y="${
        (rowIndex + 0.7) * rowHeight
      }" font-size="14">${cell || ""}</text>`;
      if (rowIndex === 0) {
        drawLine(xPosition, 0, xPosition, tableHeight);
      }
      xPosition += col.width || col.minWidth;
    });
    drawLine(xPosition, 0, xPosition, tableHeight);
    drawLine(0, rowIndex * rowHeight, tableWidth, rowIndex * rowHeight);
  };

  // Render header row
  renderRow(
    columns.map((col) => col.label),
    0
  );

  // Render data rows
  data.forEach((dataRow, rowIndex) => {
    const row = columns.map((col) => dataRow[col.accessor]);
    renderRow(row, rowIndex + 1);
  });

  drawLine(0, tableHeight, tableWidth, tableHeight);

  svgString += "</svg>";

  return { svgString, ratio: tableWidth / tableHeight };
}

// create svg image for QR code for input text
export function getTableURL({ columns = [], data = [] }) {
  const { svgString, ratio } = generateTableSVGString(columns, data);
  return { src: svg.svgToURL(svgString), ratio };
}
