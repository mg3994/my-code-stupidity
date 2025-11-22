<script lang="ts">
    import { t } from "svelte-i18n";
    import Button from "../lib/components/Button.svelte";
    import Input from "../lib/components/Input.svelte";
    import Card from "../lib/components/Card.svelte";

    let isSignUp = false;
    let email = "";
    let password = "";
    let name = "";
    let isLoading = false;

    const toggleMode = () => {
        isSignUp = !isSignUp;
        // Reset form
        email = "";
        password = "";
        name = "";
    };

    const handleSubmit = async () => {
        isLoading = true;
        // Simulate API call
        setTimeout(() => {
            isLoading = false;
            alert(`Successfully ${isSignUp ? "Signed Up" : "Signed In"}!`);
            // Navigate using history API
            window.history.pushState({}, "", "/book");
            window.dispatchEvent(new PopStateEvent("popstate"));
        }, 1500);
    };
</script>

<div class="auth-page flex-center">
    <div class="auth-container animate-fade-in">
        <Card padding="lg">
            <div class="auth-header">
                <h2>
                    {isSignUp
                        ? $t("auth.signup_title")
                        : $t("auth.signin_title")}
                </h2>
                <p class="subtitle">
                    {isSignUp
                        ? $t("auth.signup_subtitle")
                        : $t("auth.signin_subtitle")}
                </p>
            </div>

            <form on:submit|preventDefault={handleSubmit} class="auth-form">
                {#if isSignUp}
                    <div class="form-group animate-fade-in">
                        <Input
                            id="name"
                            label={$t("auth.name_label")}
                            bind:value={name}
                            required
                        />
                    </div>
                {/if}

                <div class="form-group">
                    <Input
                        id="email"
                        type="email"
                        label={$t("auth.email_label")}
                        bind:value={email}
                        required
                    />
                </div>

                <div class="form-group">
                    <Input
                        id="password"
                        type="password"
                        label={$t("auth.password_label")}
                        bind:value={password}
                        required
                    />
                </div>

                <div class="form-actions">
                    <Button type="submit" fullWidth disabled={isLoading}>
                        {isLoading
                            ? $t("auth.processing")
                            : isSignUp
                              ? $t("auth.submit_signup")
                              : $t("auth.submit_signin")}
                    </Button>
                </div>
            </form>

            <div class="auth-footer">
                <p>
                    {isSignUp ? $t("auth.have_account") : $t("auth.no_account")}
                    <button class="link-btn" on:click={toggleMode}>
                        {isSignUp
                            ? $t("auth.submit_signin")
                            : $t("auth.submit_signup")}
                    </button>
                </p>
            </div>
        </Card>
    </div>

    <!-- Background decoration -->
    <div class="bg-circle"></div>
</div>

<style>
    .auth-page {
        min-height: 100vh;
        position: relative;
        padding: var(--space-md);
        overflow: hidden;
    }

    .auth-container {
        width: 100%;
        max-width: 420px;
        z-index: 1;
    }

    .auth-header {
        text-align: center;
        margin-bottom: var(--space-lg);
    }

    h2 {
        font-size: 2rem;
        margin-bottom: var(--space-xs);
    }

    .subtitle {
        color: var(--color-text-light);
    }

    .auth-form {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    .form-actions {
        margin-top: var(--space-md);
    }

    .auth-footer {
        margin-top: var(--space-lg);
        text-align: center;
        font-size: 0.9rem;
        color: var(--color-text-light);
    }

    .link-btn {
        background: none;
        border: none;
        color: var(--color-primary);
        font-weight: 600;
        cursor: pointer;
        padding: 0;
        margin-left: 0.25rem;
    }
    .link-btn:hover {
        text-decoration: underline;
    }

    .bg-circle {
        position: absolute;
        top: -20%;
        right: -10%;
        width: 800px;
        height: 800px;
        border-radius: 50%;
        background: radial-gradient(
            circle,
            rgba(var(--primary-hue), var(--primary-sat), 90%, 0.4),
            transparent 70%
        );
        z-index: 0;
    }
</style>
