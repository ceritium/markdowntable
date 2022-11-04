<script>
  import { clickToCopy } from "../clickToCopy.js"
  export let markdownTable, url, importMarkdown

  let currenTab = "markdown-code"
  const changeTab = (target) => {
    currenTab = target
  }


  let importText = `
| **Bold Column** | Align left column | Align center column | Align right column |
| ---             | :---              | :---:               | ---:                |
| **A**           | B                 | C                   | D                   |
| **E**           | F                 | G                   | H                   |
| **I**           | J                 | K                   | L                   |
| **M**           | N                 | O                   | P                   |
| **Bold row**    | **R**             | **S**               | **T**               |
`


</script>
<ul class="nav nav-tabs mb-4" role="tablist">
  <li class="nav-item" role="presentation">
    <button on:click={() => changeTab("markdown-code") } class="nav-link" class:active={currenTab == "markdown-code"} >Markdown output</button>
  </li>
  <li class="nav-item" role="presentation">
    <button on:click={() => changeTab("import") } class="nav-link" class:active={currenTab == "import"} >Import markdown</button>
  </li>
</ul>

<div class="tab-content">
  <div class:active={currenTab == "markdown-code"} class="tab-pane" id="markdown-code" role="tabpanel" aria-labelledby="markdown-code" tabindex="0">
    <button class="copy-button btn btn-sm btn-info" use:clickToCopy={'code.markdown'}>
      Click to copy
    </button>
<pre><code class="markdown">{ markdownTable }
{#if url}
[☝️edit me](https://markdowntable.jose.gr/{url})
{/if}</code></pre>
  </div>

  <div class:active={currenTab == "import"} class="tab-pane" id="import" role="tabpanel" aria-labelledby="import" tabindex="0">
    <textarea bind:value={importText} rows=10 class="form-control mb-3"></textarea>
    <btn on:click={() => importMarkdown(importText)} class="btn btn-info"> Import as markdown </btn>
  </div>
</div>

<style>
  #import textarea {
    font-family: var(--bs-font-monospace);
    white-space: pre;
    overflow-wrap: normal;
    overflow-x: scroll;
  }
  #markdown-code {
    background: #eee;
    border: 2px solid #aaa;
    border-radius: 5px;
    padding: 20px;
    position: relative;
   }

  #markdown-code pre {
    overflow: hidden;
    margin-bottom: 0;
  }

  #markdown-code .copy-button {
    position: absolute;
    display: none;
    right: 5px;
    top: 5px;
  }

  #markdown-code:hover .copy-button {
    display: block;
  }
</style>
