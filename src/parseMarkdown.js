const BOLD_REGEX = /^\*\*(.*)\*\*$/

const parseMarkdown = (text) => {
  let data = []
  let colsData = {}
  let cellsData = {}

  const lines = text.trim().split("\n")
  let rowIndex = 0
  lines.forEach((line, lineIndex) => {
    if(lineIndex != 1) {
      let row = []
      line.split("|").forEach((cell, colIndex, cells) => {
        if(colIndex != 0 && colIndex != cells.length - 1) {
          let value = cell.trim()
          let match
          if (match = BOLD_REGEX.exec(value)) {
            value = match[1]
            cellsData[`${rowIndex}:${colIndex-1}`] ||= {}
            cellsData[`${rowIndex}:${colIndex-1}`].bold = true
          }

          row.push(value)
        }
      })

      rowIndex++;
      data.push(row)
    }
  })

  lines[1].split("|").forEach((item, colIndex, items) => {
    if(colIndex != 0 && colIndex != items.length -1) { 
      const chars = item.trim().split("")
      if(chars[0] == ":" && chars[chars.length-1] == ":") {
        colsData[colIndex] = {align: "center"}
      } else if (chars[0] == ":") {
        colsData[colIndex] = {align: "left"}
      } else if (chars[chars.length-1] == ":") {
        colsData[colIndex] = {align: "right"}
      }
    }
  })

  const table = {cols: colsData, data: data, cells: cellsData}

  return table
}

export default parseMarkdown
