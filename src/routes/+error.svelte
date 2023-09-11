<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
</script>

<main>
  <h1>Error: Status Code {$page.status}</h1>
  <p>{$page.error?.message}</p>
  <button class="back" on:click={() => goto("/")}>Return Home</button>
</main>

<style lang="postcss">
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  h1 {
    color: var(--accent);
  }

  .back {
    padding: 1ch;
    outline: 0.2rem solid var(--accent);
    border-radius: 100vh;
    color: var(--accent);
    text-align: center;
    font-weight: 500;
  }
</style>
