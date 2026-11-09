<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";

	type FontOption = {
		id: string;
		label: string;
		fontFamily: string;
	};

	export let options: FontOption[] = [];

	const STORAGE_KEY = "fontFamily";

	let open = false;
	let current = options[0]?.id ?? "";
	let container: HTMLDivElement;

	function apply(id: string) {
		current = id;
		if (id) {
			document.documentElement.setAttribute("data-font", id);
		} else {
			document.documentElement.removeAttribute("data-font");
		}
	}

	function choose(option: FontOption) {
		localStorage.setItem(STORAGE_KEY, option.id);
		apply(option.id);
		open = false;
	}

	function toggle() {
		open = !open;
	}

	function syncFromStorage() {
		const stored = localStorage.getItem(STORAGE_KEY) || options[0]?.id || "";
		if (stored !== current) {
			apply(stored);
		}
	}

	onMount(() => {
		syncFromStorage();

		const handleClickOutside = (event: MouseEvent) => {
			if (!open) {
				return;
			}
			if (container && !container.contains(event.target as Node)) {
				open = false;
			}
		};
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				open = false;
			}
		};

		document.addEventListener("click", handleClickOutside);
		document.addEventListener("keydown", handleKeydown);
		// Swup 切换页面后保持与本地存储一致
		document.addEventListener("swup:page:view", syncFromStorage);

		return () => {
			document.removeEventListener("click", handleClickOutside);
			document.removeEventListener("keydown", handleKeydown);
			document.removeEventListener("swup:page:view", syncFromStorage);
		};
	});
</script>

<div class="font-switch" bind:this={container}>
	<button
		type="button"
		id="font-switch"
		aria-label="切换字体"
		title="切换字体"
		aria-haspopup="menu"
		aria-expanded={open}
		class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90"
		onclick={toggle}
	>
		<Icon
			icon="material-symbols:font-download-outline-rounded"
			class="text-[1.25rem]"
		></Icon>
	</button>

	{#if open}
		<div class="font-menu" role="menu" aria-labelledby="font-switch">
			{#each options as option (option.id)}
				<button
					type="button"
					role="menuitemradio"
					aria-checked={current === option.id}
					class="font-menu-item"
					class:is-active={current === option.id}
					onclick={() => choose(option)}
				>
					<span style={`font-family: ${option.fontFamily}`}
						>{option.label}</span
					>
					{#if current === option.id}
						<Icon
							icon="material-symbols:check-rounded"
							class="text-[1.1rem]"
						></Icon>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.font-switch {
		position: relative;
	}

	.font-menu {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		z-index: 60;
		min-width: 8rem;
		padding: 0.375rem;
		border-radius: var(--radius-large);
		background: var(--float-panel-bg);
		border: 1px solid rgba(0, 0, 0, 0.05);
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
	}

	:global(.dark) .font-menu {
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
	}

	.font-menu-item {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		font-size: 0.95rem;
		line-height: 1.5;
		color: rgb(0 0 0 / 0.75);
		cursor: pointer;
		transition:
			background-color 150ms ease,
			color 150ms ease;
	}

	:global(.dark) .font-menu-item {
		color: rgb(255 255 255 / 0.75);
	}

	.font-menu-item:hover {
		background: var(--btn-plain-bg-hover);
		color: var(--primary);
	}

	.font-menu-item.is-active {
		color: var(--primary);
	}
</style>
