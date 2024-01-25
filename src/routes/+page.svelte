<script lang="ts">
  import type { PageData } from "./$types";
  let {data} = $props<{data: PageData}>();
</script>

<main>
  <img src="/maelstrom.webp" alt="an icon of a lock in a whirling maelstrom" width="820" height="820">
  {#if typeof data.user === 'string'}
    <p>Welcome, {data.user ?? 'anonymous'}</p>
  {:else if typeof data.user === 'object'}
    <p class="error">{data.user?.message ?? 'Error'}</p>
  {/if}
</main>

<style>
  :global(body) {
    height: 100svh;
    padding: 0;
    margin: 0;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
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
  p {
    font-size: 2rem;
    margin: 0;
  }
  .error {
    color: crimson;
  }
</style>