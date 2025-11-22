<script lang="ts">
    import { t } from "svelte-i18n";
    import Button from "../lib/components/Button.svelte";
    import Card from "../lib/components/Card.svelte";

    const navigateTo = (path: string) => {
        window.history.pushState({}, "", path);
        window.dispatchEvent(new PopStateEvent("popstate"));
    };
</script>

<div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
        <div class="container flex-col flex-center">
            <h1 class="hero-title animate-fade-in">
                {$t("hero.title")}
                <span class="text-gradient">{$t("hero.title_highlight")}</span>
            </h1>
            <p
                class="hero-subtitle animate-fade-in"
                style="animation-delay: 0.1s"
            >
                {$t("hero.subtitle")}
            </p>
            <div
                class="hero-actions animate-fade-in"
                style="animation-delay: 0.2s"
            >
                <Button size="lg" onClick={() => navigateTo("/auth")}
                    >{$t("hero.cta_primary")}</Button
                >
                <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => navigateTo("/book")}
                    >{$t("hero.cta_secondary")}</Button
                >
            </div>
        </div>

        <!-- Decorative Background Elements -->
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
    </section>

    <!-- Features Section -->
    <section class="features container">
        <h2 class="section-title">{$t("features.title")}</h2>
        <div class="grid-responsive">
            <Card hoverEffect>
                <div class="feature-icon">🚀</div>
                <h3>{$t("features.expert.title")}</h3>
                <p>{$t("features.expert.desc")}</p>
            </Card>
            <Card hoverEffect>
                <div class="feature-icon">📅</div>
                <h3>{$t("features.schedule.title")}</h3>
                <p>{$t("features.schedule.desc")}</p>
            </Card>
            <Card hoverEffect>
                <div class="feature-icon">💬</div>
                <h3>{$t("features.feedback.title")}</h3>
                <p>{$t("features.feedback.desc")}</p>
            </Card>
        </div>
    </section>
</div>

<style>
    .landing-page {
        min-height: 100vh;
        padding-bottom: var(--space-xl);
    }

    .hero {
        position: relative;
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        overflow: hidden;
        padding: var(--space-xl) 0;
    }

    .hero-title {
        font-size: clamp(2.5rem, 5vw, 4.5rem);
        font-weight: 800;
        margin-bottom: var(--space-md);
        letter-spacing: -0.02em;
    }

    .hero-subtitle {
        font-size: clamp(1.1rem, 2vw, 1.25rem);
        color: var(--color-text-light);
        max-width: 600px;
        margin-bottom: var(--space-lg);
    }

    .hero-actions {
        display: flex;
        gap: var(--space-md);
        flex-wrap: wrap;
        justify-content: center;
    }

    .features {
        padding-top: var(--space-xl);
    }

    .section-title {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: var(--space-xl);
    }

    .feature-icon {
        font-size: 2.5rem;
        margin-bottom: var(--space-sm);
    }

    h3 {
        margin-bottom: var(--space-xs);
        font-size: 1.25rem;
    }

    p {
        color: var(--color-text-light);
    }

    /* Decorative Blobs */
    .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        z-index: -1;
        opacity: 0.6;
    }

    .blob-1 {
        top: -10%;
        left: -10%;
        width: 500px;
        height: 500px;
        background: radial-gradient(
            circle,
            var(--color-primary-light),
            transparent
        );
        animation: float 10s infinite ease-in-out;
    }

    .blob-2 {
        bottom: -10%;
        right: -10%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, hsl(180, 70%, 80%), transparent);
        animation: float 12s infinite ease-in-out reverse;
    }

    @keyframes float {
        0%,
        100% {
            transform: translate(0, 0);
        }
        50% {
            transform: translate(30px, 50px);
        }
    }
</style>
