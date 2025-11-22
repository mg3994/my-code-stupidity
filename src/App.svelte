<script lang="ts">
  import { onMount } from "svelte";
  import { locale, isLoading } from "svelte-i18n";
  import { isRTL } from "./lib/i18n"; // Use helper
  import { theme } from "./lib/stores/theme";
  import { user } from "./lib/stores/user";

  import Router from "./lib/Router.svelte";
  import Drawer from "./lib/components/Drawer.svelte";
  import Landing from "./routes/Landing.svelte";
  import Auth from "./routes/Auth.svelte";
  import Booking from "./routes/Booking.svelte";

  const routes = {
    "/": Landing,
    "/auth": Auth,
    "/book": Booking,
  };

  onMount(() => {
    user.init();
  });

  // Handle Direction (RTL/LTR)
  $: {
    if ($locale) {
      const dir = isRTL($locale) ? "rtl" : "ltr";
      document.documentElement.dir = dir;
      document.documentElement.lang = $locale;
    }
  }

  // Handle Theme
  $: {
    const root = document.documentElement;

    // Mode
    if ($theme.mode === "system") {
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      root.setAttribute("data-theme", systemDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", $theme.mode);
    }

    // Dynamic Color
    root.style.setProperty("--primary-hue", $theme.primaryHue.toString());
  }
</script>

{#if $isLoading}
  <div class="loading-screen flex-center">
    <div class="spinner"></div>
  </div>
{:else}
  <main>
    <Header />
    <Drawer />
  </main>
{/if}

<style>
  main {
    width: 100%;
    min-height: 100vh;
  }

  .content-wrapper {
    padding-top: 64px; /* Header height */
  }

  .loading-screen {
    height: 100vh;
    width: 100vw;
    background: var(--color-bg);
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: var(--color-primary);
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
