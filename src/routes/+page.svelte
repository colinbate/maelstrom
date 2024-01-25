<script lang="ts">
  import type { PageData } from "./$types";
  let {data} = $props<{data: PageData}>();
</script>

<main>
  <img src="/maelstrom.webp" alt="an icon of a lock in a whirling maelstrom" width="820" height="820">
  <pre>{JSON.stringify(data, null, 2)}</pre>
</main>

<style>
  :global(body) {
    height: 100svh;
  }
  main {
    display: grid;
    place-items: center;
    inset: 0;
    height: 100%;
  }
  img {
    max-width: 100%;
  }
</style>