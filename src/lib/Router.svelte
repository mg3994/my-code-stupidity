<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";

    export let routes: Record<string, any>;
    export let useHash = false; // Changed default to false for history mode

    const currentPath = writable("/");

    function navigate(path: string) {
        if (useHash) {
            window.location.hash = path;
        } else {
            window.history.pushState({}, "", path);
            currentPath.set(path);
        }
    }

    function handleNavigation() {
        const path = useHash
            ? window.location.hash.slice(1) || "/"
            : window.location.pathname;
        currentPath.set(path);
    }

    onMount(() => {
        handleNavigation();
        if (useHash) {
            window.addEventListener("hashchange", handleNavigation);
        } else {
            window.addEventListener("popstate", handleNavigation);
        }
    });

    onDestroy(() => {
        if (useHash) {
            window.removeEventListener("hashchange", handleNavigation);
        } else {
            window.removeEventListener("popstate", handleNavigation);
        }
    });

    $: component = routes[$currentPath] || routes["/"];
</script>

<svelte:component this={component} />
