<script lang="ts">
    export let label: string;
    export let type = "text";
    export let value = "";
    export let placeholder = "";
    export let required = false;
    export let id: string;
</script>

<div class="input-group">
    <input
        {id}
        {type}
        {required}
        {placeholder}
        bind:value
        class="input-field"
    />
    <label for={id} class="input-label">{label}</label>
</div>

<style>
    .input-group {
        position: relative;
        margin-bottom: var(--space-md);
        width: 100%;
    }

    .input-field {
        width: 100%;
        padding: 0.8rem 1rem;
        background: rgba(255, 255, 255, 0.5);
        border: 2px solid transparent;
        border-radius: var(--radius-sm);
        font-size: 1rem;
        color: var(--color-text);
        transition: all var(--transition-fast);
        outline: none;
    }

    .input-field:focus {
        background: white;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 4px
            rgba(var(--primary-hue), var(--primary-sat), 90%, 0.5);
    }

    .input-label {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--color-text-light);
        pointer-events: none;
        transition: all var(--transition-fast);
        font-size: 0.9rem;
        background: transparent;
        padding: 0 0.2rem;
    }

    /* Float label when focused or has value */
    .input-field:focus + .input-label,
    .input-field:not(:placeholder-shown) + .input-label {
        top: 0;
        font-size: 0.75rem;
        color: var(--color-primary);
        background: white;
        border-radius: 4px;
    }
</style>
