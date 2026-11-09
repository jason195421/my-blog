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

<div class="font-switch" class:is-open={open} bind:this={container}>
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
			class="text-[1.25rem] font-switch-icon"
		></Icon>
	</button>

	<!-- 菜单常驻 DOM，用 class 控制显隐，进出都能走 CSS 过渡 -->
	<div
		class="font-menu"
		role="menu"
		aria-labelledby="font-switch"
		aria-hidden={!open}
	>
		{#each options as option, i (option.id)}
			<button
				type="button"
				role="menuitemradio"
				aria-checked={current === option.id}
				class="font-menu-item"
				class:is-active={current === option.id}
				style={`--stagger: ${i * 45}ms`}
				onclick={() => choose(option)}
			>
				<span style={`font-family: ${option.fontFamily}`}
					>{option.label}</span
				>
				<Icon
					icon="material-symbols:check-rounded"
					class="text-[1.1rem] font-check"
				></Icon>
			</button>
		{/each}
	</div>
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

		/* 收起态：淡出 + 上移 + 轻微缩小 */
		opacity: 0;
		visibility: hidden;
		transform: translateY(-8px) scale(0.96);
		transform-origin: top right;
		pointer-events: none;
		transition:
			opacity 200ms ease,
			transform 240ms cubic-bezier(0.16, 1, 0.3, 1),
			visibility 0s 260ms;
	}

	.font-switch.is-open .font-menu {
		opacity: 1;
		visibility: visible;
		transform: translateY(0) scale(1);
		pointer-events: auto;
		transition:
			opacity 200ms ease,
			transform 240ms cubic-bezier(0.16, 1, 0.3, 1),
			visibility 0s 0s;
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

		/* 交错入场：打开菜单时依次滑入 */
		opacity: 0;
		transform: translateX(8px);
		transition:
			opacity 200ms ease var(--stagger, 0ms),
			transform 240ms cubic-bezier(0.16, 1, 0.3, 1) var(--stagger, 0ms),
			background-color 150ms ease,
			color 150ms ease;
	}

	.font-switch.is-open .font-menu-item {
		opacity: 1;
		transform: translateX(0);
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

	/* 选中项的勾：弹入 / 淡出 */
	:global(.font-check) {
		opacity: 0;
		transform: scale(0.5);
		transition:
			opacity 180ms ease,
			transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.font-menu-item.is-active :global(.font-check) {
		opacity: 1;
		transform: scale(1);
	}

	/* 按钮图标：打开时轻微旋转并高亮 */
	:global(.font-switch-icon) {
		transition:
			transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1),
			color 200ms ease;
	}

	.font-switch.is-open :global(.font-switch-icon) {
		transform: rotate(-15deg) scale(1.12);
		color: var(--primary);
	}

	/* 尊重系统「减少动态效果」设置 */
	@media (prefers-reduced-motion: reduce) {
		.font-menu,
		.font-menu-item,
		:global(.font-check),
		:global(.font-switch-icon) {
			transition-duration: 0.01ms !important;
			animation-duration: 0.01ms !important;
		}
	}
</style>
