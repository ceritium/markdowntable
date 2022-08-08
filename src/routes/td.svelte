<script>
  export let cell, head, callback

  const updateText = (e)=> {
    cell.text = e.target.value
    callback()
  }

  const CLASSNAMES = {left: "text-start", center: "text-center", right: "text-end"}
  $: className = CLASSNAMES[head.align]
</script>

<td class={className}>
  <input type="text" on:keyup={updateText} value={cell.text}>
</td>
