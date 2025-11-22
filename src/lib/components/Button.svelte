<script lang="ts">
    export let variant: "primary" | "secondary" | "outline" | "ghost" =
        "primary";
    export let size: "sm" | "md" | "lg" = "md";
    export let type: "button" | "submit" | "reset" = "button";
    export let disabled = false;
    export let fullWidth = false;
    export let onClick: (() => void) | undefined = undefined;

    function handleClick(e: MouseEvent) {
        if (onClick) {
            e.preventDefault();
            e.stopPropagation();
            onClick();
        }
    }
</script>

<button
    {type}
    class="btn btn-{variant} btn-{size} {fullWidth ? 'w-full' : ''}"
    {disabled}
    on:click={handleClick}
>
    <slot />
</button>

<style>
    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: var(--radius-sm);
        font-weight: 600;
        cursor: pointer;
        transition: all var(--transition-fast);
        font-family: "Inter", sans-serif;
        gap: 0.5rem;
    }

    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .btn-primary {
        background: var(--color-primary);
        color: white;
        box-shadow: 0 4px 12px
            rgba(var(--primary-hue), var(--primary-sat), 50%, 0.3);
    }
    .btn-primary:hover:not(:disabled) {
        background: var(--color-primary-dark);
        transform: translateY(-1px);
        box-shadow: 0 6px 16px
            rgba(var(--primary-hue), var(--primary-sat), 50%, 0.4);
    }

    .btn-secondary {
        background: var(--color-surface);
        color: var(--color-text);
        border: 1px solid var(--glass-border);
    }
    .btn-secondary:hover:not(:disabled) {
        background: var(--color-bg);
        border-color: var(--color-text-light);
    }

    .btn-outline {
        background: transparent;
        border: 2px solid var(--color-primary);
        color: var(--color-primary);
    }
    .btn-outline:hover:not(:disabled) {
        background: rgba(var(--primary-hue), var(--primary-sat), 90%, 0.1);
    }

    .btn-ghost {
        background: transparent;
        color: var(--color-text-light);
    }
    .btn-ghost:hover:not(:disabled) {
        color: var(--color-primary);
        background: rgba(0, 0, 0, 0.05);
    }

    .btn-sm {
        padding: 0.4rem 0.8rem;
        font-size: 0.875rem;
    }
    .btn-md {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
    }
    .btn-lg {
        padding: 1rem 2rem;
        font-size: 1.125rem;
    }

    .w-full {
        width: 100%;
    }
</style>
