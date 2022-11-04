import parseMarkdown from './parseMarkdown.js'

test('it works', () => {
  const string = `
| Left   | Center | Right  | Default |
| :---   | :---:  | ---:   | ---     |
| A      | B      | C      | D       |
| E      | **F**  | G      | H       |
| I      | J      | K      | L       |
`

  const expectedData = [
    ["Left", "Center", "Right", "Default"],
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
    ["I", "J", "K", "L"],
  ]

  const expectedCols = {
    0: { align: "left" },
    1: { align: "center" },
    2: { align: "right" },
  }

  const expectedCells = {
    "2:1": { bold: true}
  }

  const table = parseMarkdown(string)
  expect(table.cols).toEqual(expectedCols);
  expect(table.data).toEqual(expectedData);
  expect(table.cells).toEqual(expectedCells);
});
