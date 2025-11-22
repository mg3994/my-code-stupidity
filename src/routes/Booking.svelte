<script lang="ts">
    import { t } from "svelte-i18n";
    import Button from "../lib/components/Button.svelte";
    import Card from "../lib/components/Card.svelte";

    // Mock Data
    const mentors = [
        {
            id: 1,
            name: "Sarah Chen",
            role: "Senior Engineer @ Google",
            avatar: "👩‍💻",
            tags: ["System Design", "React"],
        },
        {
            id: 2,
            name: "Alex Rivera",
            role: "Tech Lead @ Netflix",
            avatar: "👨‍💻",
            tags: ["Backend", "Rust"],
        },
        {
            id: 3,
            name: "Priya Patel",
            role: "Product Manager @ Stripe",
            avatar: "👩‍💼",
            tags: ["Product", "Strategy"],
        },
    ];

    const timeSlots = ["09:00 AM", "10:00 AM", "02:00 PM", "04:00 PM"];

    // State
    let step = 1;
    let selectedMentor: any = null;
    let selectedDate = "";
    let selectedTime = "";

    const nextStep = () => {
        if (step < 4) step++;
    };
    const prevStep = () => {
        if (step > 1) step--;
    };
    const selectMentor = (mentor: any) => {
        selectedMentor = mentor;
        nextStep();
    };
    const confirmBooking = () => {
        alert("Booking Confirmed! Check your email.");
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
    };
</script>

<div class="booking-page container">
    <div class="wizard-header">
        <h1 class="text-gradient">{$t("booking.title")}</h1>
        <div class="progress-bar">
            <div class="progress-fill" style="width: {(step / 4) * 100}%"></div>
        </div>
        <p class="step-indicator">
            {$t("booking.step", { values: { current: step, total: 4 } })}
        </p>
    </div>

    <div class="wizard-content animate-fade-in">
        {#if step === 1}
            <div class="step-container">
                <h2>{$t("booking.select_mentor")}</h2>
                <div class="grid-responsive">
                    {#each mentors as mentor}
                        <Card hoverEffect>
                            <div
                                class="mentor-card"
                                on:click={() => selectMentor(mentor)}
                                on:keydown={() => {}}
                                role="button"
                                tabindex="0"
                            >
                                <div class="mentor-avatar">{mentor.avatar}</div>
                                <h3>{mentor.name}</h3>
                                <p class="mentor-role">{mentor.role}</p>
                                <div class="tags">
                                    {#each mentor.tags as tag}
                                        <span class="tag">{tag}</span>
                                    {/each}
                                </div>
                                <div class="mt-4">
                                    <Button fullWidth variant="outline"
                                        >{$t("booking.select_btn")}</Button
                                    >
                                </div>
                            </div>
                        </Card>
                    {/each}
                </div>
            </div>
        {/if}

        {#if step === 2}
            <div class="step-container flex-col flex-center">
                <h2>{$t("booking.pick_date")}</h2>
                <Card padding="lg">
                    <input
                        type="date"
                        class="date-picker"
                        bind:value={selectedDate}
                        min={new Date().toISOString().split("T")[0]}
                    />
                    <div class="mt-4 flex-center">
                        <Button disabled={!selectedDate} onClick={nextStep}
                            >{$t("booking.continue")}</Button
                        >
                    </div>
                </Card>
            </div>
        {/if}

        {#if step === 3}
            <div class="step-container flex-col flex-center">
                <h2>{$t("booking.pick_time")}</h2>
                <div class="time-grid">
                    {#each timeSlots as time}
                        <button
                            class="time-slot {selectedTime === time
                                ? 'selected'
                                : ''}"
                            on:click={() => (selectedTime = time)}
                            >{time}</button
                        >
                    {/each}
                </div>
                <div class="mt-4">
                    <Button disabled={!selectedTime} onClick={nextStep}
                        >{$t("booking.continue")}</Button
                    >
                </div>
            </div>
        {/if}

        {#if step === 4}
            <div class="step-container flex-col flex-center">
                <h2>{$t("booking.confirm")}</h2>
                <Card padding="lg">
                    <div class="summary">
                        <div class="summary-item">
                            <span class="label"
                                >{$t("booking.mentor_label")}</span
                            >
                            <span class="value">{selectedMentor.name}</span>
                        </div>
                        <div class="summary-item">
                            <span class="label">{$t("booking.date_label")}</span
                            >
                            <span class="value">{selectedDate}</span>
                        </div>
                        <div class="summary-item">
                            <span class="label">{$t("booking.time_label")}</span
                            >
                            <span class="value">{selectedTime}</span>
                        </div>
                    </div>
                    <div class="mt-4">
                        <Button fullWidth onClick={confirmBooking}
                            >{$t("booking.confirm_btn")}</Button
                        >
                    </div>
                </Card>
            </div>
        {/if}
    </div>

    {#if step > 1}
        <div class="wizard-controls">
            <Button variant="ghost" onClick={prevStep}
                >{$t("booking.back")}</Button
            >
        </div>
    {/if}
</div>

<style>
    .booking-page {
        padding-top: var(--space-lg);
        padding-bottom: var(--space-xl);
        min-height: 100vh;
    }
    .wizard-header {
        text-align: center;
        margin-bottom: var(--space-lg);
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    .progress-bar {
        height: 6px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        margin: var(--space-sm) 0;
        overflow: hidden;
    }
    .progress-fill {
        height: 100%;
        background: var(--color-primary);
        transition: width 0.3s ease;
    }
    .step-indicator {
        font-size: 0.9rem;
        color: var(--color-text-light);
    }
    .step-container {
        animation: fadeIn 0.3s ease;
    }
    .step-container h2 {
        text-align: center;
        margin-bottom: var(--space-md);
    }
    .mentor-card {
        text-align: center;
        cursor: pointer;
        outline: none;
    }
    .mentor-avatar {
        font-size: 3rem;
        margin-bottom: var(--space-xs);
    }
    .mentor-role {
        color: var(--color-text-light);
        font-size: 0.9rem;
        margin-bottom: var(--space-sm);
    }
    .tags {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    .tag {
        background: rgba(var(--primary-hue), var(--primary-sat), 90%, 0.3);
        color: var(--color-primary-dark);
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
    }
    .date-picker {
        padding: 1rem;
        font-size: 1.2rem;
        border: 1px solid var(--glass-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        cursor: pointer;
    }
    .time-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-sm);
        width: 100%;
        max-width: 400px;
    }
    .time-slot {
        padding: 1rem;
        border: 1px solid var(--glass-border);
        background: white;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: all 0.2s;
    }
    .time-slot:hover {
        border-color: var(--color-primary);
    }
    .time-slot.selected {
        background: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
    }
    .summary {
        min-width: 300px;
    }
    .summary-item {
        display: flex;
        justify-content: space-between;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
    .summary-item:last-child {
        border-bottom: none;
    }
    .label {
        color: var(--color-text-light);
    }
    .value {
        font-weight: 600;
    }
    .mt-4 {
        margin-top: 1rem;
    }
    .wizard-controls {
        margin-top: var(--space-lg);
        display: flex;
        justify-content: center;
    }
</style>
