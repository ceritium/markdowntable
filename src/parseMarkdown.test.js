// const parseMarkdown = require('./parseMarkdown.js');
import parseMarkdown from './parseMarkdown.js'

test('it works', () => {
  const string = `
| Left   | Center | Right  | Default |
| :---   | :---:  | ---:   | ---     |
| A      | B      | C      | D       |
| E      | F      | G      | H       |
`

  const expectedData = [
    ["Left", "Center", "Right", "Default"],
    ["A", "B", "C", "D"],
    ["E", "F", "G", "H"],
  ]

  const expectedCols = {
    1: { align: "left" },
    2: { align: "center" },
    3: { align: "right" },
  }
  const table = parseMarkdown(string)
  expect(table.cols).toEqual(expectedCols);
  expect(table.data).toEqual(expectedData);
});
