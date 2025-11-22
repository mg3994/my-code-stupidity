<script lang="ts">
    export let padding: "none" | "sm" | "md" | "lg" = "md";
    export let hoverEffect = false;
</script>

<div class="card padding-{padding} {hoverEffect ? 'hover-effect' : ''}">
    <slot />
</div>

<style>
    .card {
        background: var(--glass-bg);
        backdrop-filter: blur(var(--glass-blur));
        -webkit-backdrop-filter: blur(var(--glass-blur));
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        overflow: hidden;
        transition:
            transform var(--transition-normal),
            box-shadow var(--transition-normal);
    }

    .hover-effect:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
    }

    .padding-none {
        padding: 0;
    }
    .padding-sm {
        padding: var(--space-sm);
    }
    .padding-md {
        padding: var(--space-md);
    }
    .padding-lg {
        padding: var(--space-lg);
    }
</style>
