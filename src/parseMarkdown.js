const parseMarkdown = (text) => {
  let data = []
  let cols = {}

  const lines = text.trim().split("\n")
  lines.forEach((line, lineIndex) => {
    if(lineIndex != 1) {
      let row = []
      line.split("|").forEach((cell, colIndex, cells) => {
        if(colIndex != 0 && colIndex != cells.length - 1) {
          let value = cell.trim()
          row.push(value)
        }
      })

      data.push(row)
    }
  })

  lines[1].split("|").forEach((item, colIndex, items) => {
    if(colIndex != 0 && colIndex != items.length -1) { 
      const chars = item.trim().split("")
      if(chars[0] == ":" && chars[chars.length-1] == ":") {
        cols[colIndex] = {align: "center"}
      } else if (chars[0] == ":") {
        cols[colIndex] = {align: "left"}
      } else if (chars[chars.length-1] == ":") {
        cols[colIndex] = {align: "right"}
      }
    }
  })

  const table = {cols: cols, data: data}

  return table
}

export default parseMarkdown
