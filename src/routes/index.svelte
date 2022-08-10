<script>
  import LZString from 'lz-string'
  import { onMount } from 'svelte'
  import ColumnControls from './columnControls.svelte'
  import Cell from './cell.svelte'
  import generateMarkdown from '../generateMarkdown.js'
  import buildFromPaste from '../buildFromPaste.js'
	import { clickToCopy } from "../clickToCopy.js"

  let selectedX, selectedY;
  let currentCell = {x: null, y: null}
  let url = ""
  let loading = true
  let headers = [
    {align: "left"},
    {align: "left"},
    {align: "left"},
  ]

  let data = [
    [{text: "D1"},
    {text: "D2"},
    {text: "D3"},]
  ]

  onMount(() => {
    loadFromUrl()
  })

  const onPaste = (event) => {
    event.preventDefault()

    let paste = (event.clipboardData || window.clipboardData).getData('text');
    const raw = buildFromPaste(paste)
    headers = raw.headers
    data = raw.data
  }

  const setFocus = (x,y) => {
    currentCell.x = x
    currentCell.y = y
  }

  const unsetFocus = () => {
    currentCell.x = null
    currentCell.y = null
  }

  const addRow = () => {
    let row = headers.map(() => {
      return {text: ""}
    })

    data.push(row)
    data = data
  }

  const addCol = () => {
    headers.push({text: "Header", align: "left"})
    data.forEach(row => {
      row.push({text: ""})
    })
    headers = headers
    data = data
  }

  const updateCallback = () => {
    headers = headers
    data = data
  }

  const removeColumn = (event) => {
    const head = event.detail.head
    const removeIndex = headers.indexOf(head)

    data = data.map((row) => {
      return row.filter((item, indexRow) => {
        return removeIndex != indexRow
      })
    })

    headers = headers.filter(function(value, index, arr){
      return index != removeIndex
    });
  }

  const removeRow = (row) => {
    data = data.filter((value) => {
      return value != row
    })
  }

  const updateUrl = (headers, data) => {
    if(!loading) {
      const table = LZString.compressToEncodedURIComponent(JSON.stringify({headers: headers, data: data, v: 0}))
      url = `?table=${table}`
      if(typeof window !== 'undefined' && typeof history !== 'undefined') {
        history.pushState(history.state, '', url)
      }
    }

    loading = false
  }

  const loadFromUrl = () => {
    const table = (new URL(window.location)).searchParams.get('table')
    if (table) {
      const raw = JSON.parse(LZString.decompressFromEncodedURIComponent(table))
      headers = raw.headers
      data = raw.data
      console.log(headers, data)
    }
  }

  $: output = generateMarkdown(headers, data)
  $: updateUrl(headers, data)

</script>
<svelte:window on:paste={(e) => { onPaste(e)}}/>
<div class="container p-3">
  { currentCell.x }:{currentCell.y}
  <button on:click={addRow}> Add row </button>
  <button on:click={addCol}> Add col </button>
  <br/>
  <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th></th> <!-- empty -->
        {#each headers as head}
          <ColumnControls on:removeColumn={removeColumn} on:update={updateCallback} head={head}/>
        {/each}
      </tr>
    </thead>
    <tbody class="table-group-divider">
      {#each data as row, rowIndex}
        <tr>
          <td>
            <button class="delete-row-button btn btn-sm btn-warning" on:click={() => removeRow(row)}> remove </button>
          </td>
          {#each row as cell, cellIndex}
            <Cell cell={cell} align={headers[cellIndex].align} on:blur={unsetFocus} on:focus={() => setFocus(rowIndex + 1, cellIndex)} on:update={updateCallback}/>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="markdown-code">
    <button class="copy-button btn btn-sm btn-info" use:clickToCopy={'code.markdown'}>
      Click to copy
    </button>
<pre><code class="markdown">{ output }
[☝️ edit me](https://markdowntable.netlify.app/{url})
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

  .markdown-code .copy-button {
    position: absolute;
    display: none;
    right: 5px;
    top: 5px;
  }

  .markdown-code:hover .copy-button {
    display: block;
  }

  .delete-row-button {
    visibility: hidden;
   }

  tr:hover .delete-row-button {
    visibility: visible;
   }
</style>
