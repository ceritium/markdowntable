<script>
  export let head, callback
  const updateAlign = (e)=> {
    head.align = e.target.value
    callback()
  }

  const updateText = (e)=> {
    head.text = e.target.value
    callback()
  }

  const CLASSNAMES = {left: "text-start", center: "text-center", right: "text-end"}
  $: className = CLASSNAMES[head.align]
</script>

<th class={className}>
  <input type="text" on:keyup={updateText} bind:value={head.text}>
  <select on:change={updateAlign} bind:value={head.align}>
    <option value="left">left</option>
    <option value="center">center</option>
    <option value="right">right</option>
  </select>
</th>
