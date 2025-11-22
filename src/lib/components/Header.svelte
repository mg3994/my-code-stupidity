        <button
            class="settings-trigger"
            on:click={openSettings}
            aria-label="Open Settings"
        >
            <span class="settings-icon">⚙️</span>
            <span class="settings-text">Settings</span>
        </button>
    </div>
</header>

<!-- Settings Modal Dialog -->
<dialog
    bind:this={dialog}
    class="settings-dialog"
    on:click={handleBackdropClick}
>
    <div class="dialog-content glass-panel">
        <div class="dialog-header">
            <h2>Settings</h2>
            <button
                class="close-btn"
                on:click={closeSettings}
                aria-label="Close">✕</button
            >
        </div>

        <div class="dialog-body">
            <!-- Language -->
            <section class="setting-section">
                <h3>🌐 {$t("settings.language")}</h3>
                <select
                    class="setting-select"
                    value={$locale}
                    on:change={(e) => setLanguage(e.currentTarget.value)}
                >
                    {#each LANGUAGES as lang}
                        <option value={lang.code}>{lang.nativeName}</option>
                    {/each}
                </select>
            </section>

            <!-- Location -->
            <section class="setting-section">
                <h3>📍 Location & Currency</h3>

                <label class="setting-label">
                    Country
                    <select
                        class="setting-select"
                        value={$user.preferences?.country || ""}
                        on:change={handleCountryChange}
                    >
                        <option value="">
                            {#if $user.detectedLocation}
                                Auto: {$user.detectedLocation.country_name}
                            {:else}
                                Auto-detect
                            {/if}
                        </option>
                        {#each COUNTRIES as country}
                            <option value={country.code}>{country.name}</option>
                        {/each}
                    </select>
                </label>

                <label class="setting-label">
                    Currency
                    <select
                        class="setting-select"
                        value={$user.preferences?.currency || "USD"}
                        on:change={handleCurrencyChange}
                    >
                        {#each CURRENCIES as curr}
                            <option value={curr.code}
                                >{curr.symbol} {curr.code} - {curr.name}</option
                            >
                        {/each}
                    </select>
                </label>
            </section>

            <!-- Theme -->
            <section class="setting-section">
                <h3>🎨 Appearance</h3>

                <label class="setting-label">Theme Mode</label>
                <div class="theme-buttons">
                    <button
                        class="theme-btn"
                        class:active={$theme.mode === "light"}
                        on:click={() => setMode("light")}
                    >
                        <span class="theme-icon">☀️</span>
                        <span>Light</span>
                    </button>
                    <button
                        class="theme-btn"
                        class:active={$theme.mode === "system"}
                        on:click={() => setMode("system")}
                    >
                        <span class="theme-icon">💻</span>
                        <span>System</span>
                    </button>
                    <button
                        class="theme-btn"
                        class:active={$theme.mode === "dark"}
                        on:click={() => setMode("dark")}
                    >
                        <span class="theme-icon">🌙</span>
                        <span>Dark</span>
                    </button>
                </div>

                <label class="setting-label">
                    Primary Color
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={$theme.primaryHue}
                        on:input={handleHueChange}
                        class="color-slider"
                    />
                    <div
                        class="color-preview"
                        style="background: linear-gradient(90deg, hsl({$theme.primaryHue}, 80%, 60%), hsl({$theme.primaryHue}, 60%, 50%))"
                    ></div>
                </label>
            </section>

            <!-- Detected Location Info -->
            {#if $user.detectedLocation}
                <section class="info-section">
                    <small
                        >📍 Detected: {$user.detectedLocation.city}, {$user
                            .detectedLocation.country_name}</small
                    >
                </section>
            {/if}
        </div>
    </div>
</dialog>

<style>
    /* Header */
    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        border-radius: 0 0 var(--radius-md) var(--radius-md);
        border-top: none;
    }

    .header-content {
        height: 64px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--space-md);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        font-family: "Outfit", sans-serif;
        font-weight: 700;
        font-size: 1.5rem;
        margin: 0;
    }

    .settings-trigger {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: transparent;
        border: 1px solid transparent;
        color: var(--color-text-light);
        padding: 0.6rem 1.2rem;
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-size: 0.95rem;
        font-weight: 500;
        transition: all 0.3s ease;
        font-family: "Inter", sans-serif;
    }

    .settings-trigger:hover {
        color: var(--color-primary);
        background: rgba(0, 0, 0, 0.05);
        border-color: var(--color-primary);
    }

    .settings-icon {
        font-size: 1.2rem;
    }

    /* Dialog */
    .settings-dialog {
        border: none;
        padding: 0;
        background: transparent;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow: visible;
    }

    .settings-dialog::backdrop {
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(8px);
    }

    .dialog-content {
        border-radius: var(--radius-lg);
        overflow: hidden;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
    }

    .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .dialog-header h2 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .close-btn {
        background: transparent;
        border: none;
        font-size: 1.5rem;
        color: var(--color-text-light);
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s;
    }

    .close-btn:hover {
        background: rgba(0, 0, 0, 0.1);
        color: var(--color-text);
    }

    .dialog-body {
        padding: 1.5rem;
        overflow-y: auto;
        flex: 1;
    }

    /* Setting Sections */
    .setting-section {
        margin-bottom: 2rem;
    }

    .setting-section:last-child {
        margin-bottom: 0;
    }

    .setting-section h3 {
        margin: 0 0 1rem 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--color-text);
    }

    .setting-label {
        display: block;
        font-size: 0.9rem;
        color: var(--color-text-light);
        font-weight: 500;
        margin-bottom: 1rem;
    }

    .setting-select {
        width: 100%;
        margin-top: 0.5rem;
    }

    /* Theme Buttons */
    .theme-buttons {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
        margin-top: 0.5rem;
    }

    .theme-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        background: rgba(0, 0, 0, 0.03);
        border: 2px solid transparent;
        padding: 1rem;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: all 0.2s;
        font-size: 0.85rem;
        color: var(--color-text);
    }

    .theme-btn:hover {
        background: rgba(0, 0, 0, 0.05);
        border-color: var(--color-primary);
    }

    .theme-btn.active {
        background: var(--color-primary-light);
        border-color: var(--color-primary);
        color: var(--color-primary);
    }

    .theme-icon {
        font-size: 1.8rem;
    }

    /* Color Slider */
    .color-slider {
        width: 100%;
        height: 12px;
        -webkit-appearance: none;
        appearance: none;
        background: linear-gradient(
            to right,
            red,
            orange,
            yellow,
            green,
            blue,
            indigo,
            violet
        );
        border-radius: 6px;
        outline: none;
        cursor: pointer;
        margin-top: 0.5rem;
    }

    .color-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: white;
        border: 3px solid var(--color-primary);
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .color-preview {
        height: 12px;
        border-radius: 6px;
        margin-top: 0.75rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    /* Info Section */
    .info-section {
        padding-top: 1rem;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .info-section small {
        color: var(--color-text-light);
        font-size: 0.85rem;
    }

    /* Responsive */
    @media (max-width: 640px) {
        .settings-text {
            display: none;
        }

        .theme-buttons {
            grid-template-columns: 1fr;
        }

        .dialog-header {
            padding: 1rem;
        }

        .dialog-body {
            padding: 1rem;
        }
    }
</style>
