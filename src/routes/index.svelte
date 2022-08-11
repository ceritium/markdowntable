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
  let data = []

  onMount(() => {
    loadFromUrl()

    const options = {
      data: data,
      toolbar:[
        {
            type: 'i',
            content: 'undo',
            onclick: function() {
                table.undo();
            }
        },
        {
            type: 'i',
            content: 'redo',
            onclick: function() {
                table.redo();
            }
        },
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
    const selectedColumns = table.getSelectedColumns()
    table.updateSelectionFromCoords(selectedColumns[0], 0, selectedColumns[selectedColumns.lenght], table.getData().length)
    table.setData(table.getData())
    cols = cols
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

    if(selectedRows.length == data.length) {
      selectedColumns.forEach((col) => {
        cols[col] ||= {}
        cols[col].bold = true
      })
    } else {
      selectedRows.forEach((row) => {
        selectedColumns.forEach((col) => {
          // TODO: indivual cells
          // continue
        })
      })
    }

    // TODO: fullrows

    updateTable()
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

  const updateUrl = (cols, data) => {
    if(!loading) {
      const table = LZString.compressToEncodedURIComponent(JSON.stringify({cols: cols, data: data, v: 0}))
      url = `?table=${table}`
      history.replaceState(history.state, '', url)
    }
  }

  const loadFromUrl = () => {
    const table = (new URL(window.location)).searchParams.get('table')
    if (table) {
      const raw = JSON.parse(LZString.decompressFromEncodedURIComponent(table))
      cols = raw.cols
      data = raw.data
    }

    loading = false
  }

  $: updateUrl(cols, data)
  $: markdownTable = generateMarkdown(cols, data)

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
[☝️edit me](https://markdowntable.netlify.app/{url})
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
