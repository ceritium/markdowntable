<script>
  export let head, callback
  const update = (e)=> {
    head.align = e.target.value
    callback()
  }

  const CLASSNAMES = {left: "text-start", center: "text-center", right: "text-end"}
  $: className = CLASSNAMES[head.align]
</script>

<th class={className}>
  { head.text }
  <select on:change={update} bind:value={head.align}>
    <option value="left">left</option>
    <option value="center">center</option>
    <option value="right">right</option>
  </select>
</th>
