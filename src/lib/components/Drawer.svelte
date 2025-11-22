<script lang="ts">
  import { isDrawerOpen, closeDrawer } from '../stores/drawer';
  import { user } from '../stores/user';
  import { locale } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { LANGUAGES, COUNTRIES, CURRENCIES } from '../config';

  // Close drawer on Escape key
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeDrawer();
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>

{#if $isDrawerOpen}
  <div class="drawer-backdrop" on:click={closeDrawer} />
  <aside class="drawer" on:click|stopPropagation>
    <div class="profile-section">
      <img class="avatar" src="{$user.avatar || '/default-avatar.png'}" alt="User Avatar" />
      <div class="user-info">
        <span class="name">{$user.name || 'Guest'}</span>
        <span class="email">{$user.email || ''}</span>
      </div>
    </div>
    <nav class="menu">
      <ul>
        <li><a href="/" on:click={closeDrawer}>🏠 Home</a></li>
        <li><a href="/profile" on:click={closeDrawer}>👤 Profile</a></li>
        <li><a href="/sessions" on:click={closeDrawer}>📅 Sessions</a></li>
        <li><a href="/chat" on:click={closeDrawer}>💬 Chat</a></li>
        <li><a href="/book" on:click={closeDrawer}>📖 Book</a></li>
        <li><a href="/goals" on:click={closeDrawer}>🎯 Goals</a></li>
        <li><a href="/badges" on:click={closeDrawer}>🏅 Badges</a></li>
        <li><a href="/career" on:click={closeDrawer}>🚀 Career Path</a></li>
        <li><a href="/resume" on:click={closeDrawer}>📝 Resume Builder</a></li>
        <li><a href="/skill" on:click={closeDrawer}>🛠️ Skill Assessment</a></li>
        <li><a href="/notifications" on:click={closeDrawer}>🔔 Notifications</a></li>
        <li><a href="/leaderboard" on:click={closeDrawer}>📊 Leaderboard</a></li>
        <li><a href="/achievements" on:click={closeDrawer}>🏆 Achievements</a></li>
      </ul>
    </nav>
  </aside>
{/if}

<style>
  .drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    z-index: 998;
  }
  .drawer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    max-width: 80%;
    background: var(--glass-layer-1);
    backdrop-filter: blur(12px);
    box-shadow: 2px 0 8px rgba(0,0,0,0.2);
    z-index: 999;
    display: flex;
    flex-direction: column;
    padding: var(--space-md);
    overflow-y: auto;
    animation: slideIn 0.25s ease-out forwards;
  }
  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  .profile-section {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-lg);
  }
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--color-primary);
  }
  .user-info .name { font-weight: 600; color: var(--color-text); }
  .user-info .email { font-size: 0.85rem; color: var(--color-text-light); }
  .menu ul { list-style: none; padding: 0; margin: 0; }
  .menu li { margin-bottom: var(--space-sm); }
  .menu a {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    text-decoration: none;
    color: var(--color-text);
    font-size: 0.95rem;
    padding: 0.4rem 0.6rem;
    border-radius: var(--radius-sm);
    transition: background 0.2s;
  }
  .menu a:hover {
    background: rgba(var(--primary-hue), var(--primary-sat), var(--primary-light), 0.1);
  }
</style>
