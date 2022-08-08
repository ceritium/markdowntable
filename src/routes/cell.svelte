<script>
  export let value, withHead, index
  export let align = "left";

  const tag = withHead && index == 0 ? "th" : "td"
</script>

<svelte:element this={tag}>
  { value }
  {#if index == 0}
    <select bind:value={align}>
      <option value="left">left</option>
      <option value="center">center</option>
      <option value="right">right</option>
    </select>
  {/if}
</svelte:element>
