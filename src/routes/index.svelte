<script>
  import LZString from 'lz-string'
  import { onMount } from 'svelte'
  import contextMenu from '../contextMenu.js'
  import generateMarkdown from '../generateMarkdown.js'
  import { clickToCopy } from "../clickToCopy.js"

  let table
  let loading = true;
  let url;
  let cols = {}
  let rows = {}
  let cells = {}
  let data = []

  onMount(() => {
    loadFromUrl()

    const options = {
      data: data,
      toolbar:[
        {
          type: 'i',
          content: 'format_align_left',
          onclick: () => setColumnAlign("left")
        },
        {
          type: 'i',
          content: 'format_align_center',
          onclick: () => setColumnAlign("center")
        },
        {
          type: 'i',
          content: 'format_align_right',
          onclick: () => setColumnAlign("right")
        },
        {
          type: 'i',
          content: 'format_bold',
          onclick: () => setBold()
        },
      ],
      defaultColWidth: 100,
      minDimensions:[3,3],
      columnDrag: true,
      rowDrag: true,
      allowRenameColumn: false,
      allowComments: false,
      parseFormulas: false,
      nestedHeaders: false,
      onchange: onChange,
      oninsertrow: onChange,
      ondeleterow: onChange,
      oninsertcolumn: onChange,
      ondeletecolumn: onChange,
      onmoverow: onChange,
      onmovecolumn: onChange,
      onSort: onChange,
      onmerge: onChange,
      onundo: onChange,
      onredo: onChange,
      updateTable: (instance, cell, col, row, val, label, cellName) => {
        const cellConfig = cells[`${row}:${col}`]
        if(cellConfig) {
          if(cellConfig.bold) {
            cell.style.fontWeight = "bold"
          }
        }

        const rowConfig = rows[row]
        if(rowConfig) {
          if(rowConfig.bold) {
            cell.style.fontWeight = "bold"
          }
        }

        const colConfig = cols[col]
        if (colConfig) {
          cell.style.textAlign = colConfig.align || "left"
          if(colConfig.bold) {
            cell.style.fontWeight = "bold"
          }
        } else {
          cell.style.textAlign = 'left'
        }
      }
    }

    table = jspreadsheet(document.getElementById('spreadsheet'), options);
    window.table = table
  })

  const updateTable = () => {
    table.setData(table.getData())
    data = table.getData()
  }

  const setColumnAlign = (align) => {
    const selectedColumns = table.getSelectedColumns()
    selectedColumns.forEach((col) => {
      cols[col] ||= {}
      cols[col].align = align
    })
    updateTable()
  }

  const setBold = () => {
    const selectedRows = table.getSelectedRows(true)
    const selectedColumns = table.getSelectedColumns()

    // Full columns
    if(selectedRows.length == data.length) {
      selectedColumns.forEach((col) => {
        cols[col] ||= {}
        cols[col].bold = !!!cols[col].bold
      })

    // Full rows
    } else if(selectedColumns.length == data[0].length) {
      selectedRows.forEach((row) => {
        rows[row] ||= {}
        rows[row].bold = !!!rows[row].bold
      })

    // Cells
    } else {
      selectedRows.forEach((row) => {
        selectedColumns.forEach((col) => {
          cells[`${row}:${col}`] ||= {}
          cells[`${row}:${col}`].bold = !!!cells[`${row}:${col}`].bold
        })
      })
    }

    updateTable()

    // Restore selection
    table.updateSelectionFromCoords(selectedColumns[0], selectedRows[0], selectedColumns[selectedColumns.length-1], selectedRows[selectedRows.length-1])
  }

  const onChange = (e) => {
    data = table.getData()
  }

  const addRow = () => {
    table.insertRow()
    data = table.getData()
  }
  const addColumn = () => {
    table.insertColumn()
    data = table.getData()
  }

  const resetTable = () => {
    table.deleteColumn(0, table.getData()[0].length)
    table.deleteRow(0, table.getData().length)
    addRow()
    addRow()
    addRow()
    addColumn()
    addColumn()
    addColumn()
    cols = {}
    data = []
    table.setData([[]])
  }

  const updateUrl = (cols, rows, data) => {
    if(!loading) {
      const table = LZString.compressToEncodedURIComponent(JSON.stringify({cols: cols, rows: rows, cells: cells, data: data}))
      url = `?table=${table}&v=0`
      history.replaceState(history.state, '', url)
    }
  }

  const loadFromUrl = () => {
    const table = (new URL(window.location)).searchParams.get('table')
    if (table) {
      const raw = JSON.parse(LZString.decompressFromEncodedURIComponent(table))
      cols = raw.cols || {}
      rows = raw.rows || {}
      data = raw.data || []
    }

    loading = false
  }

  $: updateUrl(cols, rows, data)
  $: markdownTable = generateMarkdown(cols, rows, cells, data)

</script>

<div class="container">
  <input type="button" value="Add row" on:click="{addRow}" />
  <input type="button" value="Add column" on:click="{addColumn}" />
  <input type="button" value="Reset" on:click="{resetTable}" />
  <br/>
  <div id="spreadsheet"></div>
    <div class="markdown-code">
      <button class="copy-button btn btn-sm btn-info" use:clickToCopy={'code.markdown'}>
        Click to copy
      </button>
<pre><code class="markdown">{ markdownTable }
{#if url}
[☝️edit me](https://markdowntable.jose.gr/{url})
{/if}
</code></pre>
    </div>
</div>
<style>
  .markdown-code {
    background: #eee;
    border: 2px solid #aaa;
    border-radius: 5px;
    padding: 20px;
    position: relative;
   }

  .markdown-code pre {
    overflow: hidden;
    margin-bottom: 0;
  }

  .markdown-code .copy-button {
    position: absolute;
    display: none;
    right: 5px;
    top: 5px;
  }

  .markdown-code:hover .copy-button {
    display: block;
  }
</style>
