<script>
  export let value, head

  const CLASSNAMES = {left: "text-start", center: "text-center", right: "text-end"}
  $: className = CLASSNAMES[head.align]
</script>

<td class={className}>
  { value }
</td>
