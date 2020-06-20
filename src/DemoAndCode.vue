<template>
	<section class="demo-and-code-wrapper">
		<div class="demo-style">
			<slot name="demo" />
		</div>
		<div class="code-style">
			<div
				ref="codeControl"
				class="code-control"
				@click="onClickControl"
				:style="codeControlStyle"
			>
				<span class="control-btn" v-show="shouldShowControl">
					{{ controlText }}
					<i class="arrow-icon" :style="iconStyle" />
				</span>
			</div>
			<div v-show="shouldShowCode" class="code-wrapper">
				<slot name="code" />
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'DemoAndCode',
	props: {
		showText: { type: String, default: 'show code' },
		hideText: { type: String, default: 'hide code' },
		minHeight: {
			type: Number,
			default: 0,
			validator: val => val >= 0,
		},
	},
	data () {
		return {
			navbarHeight: 0,
			shouldShowCode: false,
			shouldShowControl: true,
		}
	},
	computed: {
		// icon animation
		iconStyle: (vm) => ({
			transform: vm.shouldShowCode ? 'rotate(0)' : 'rotate(-180deg)',
		}),
		// button text
		controlText: (vm) => vm.shouldShowCode ? vm.hideText : vm.showText,
		// sticky
		codeControlStyle: (vm) => ({
			top: vm.shouldShowCode ? `${vm.navbarHeight}px` : '0',
			cursor: vm.shouldShowControl ? 'pointer' : 'auto',
		}),
	},
	methods: {
		onClickControl () {
			this.shouldShowCode = !this.shouldShowCode
		},
	},
	mounted () {
		this.shouldShowCode = false;
	},
}
</script>

<style lang="stylus">
html {
	scroll-behavior: smooth;
}

.demo-and-code-wrapper:hover {
  box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
}

.demo-and-code-wrapper {
	margin: 20px 0;
	border-radius: 3px;
	transition: .2s;
	border: 1px solid #ebebeb;

	.demo-style {
		padding: 24px;
	}

	div[class*=language-] {
		border-radius: 0 !important;
	}

	pre[class*="language-"] {
		margin: 0 !important;
	}
	.content pre, .content pre[class*=language-] {
		margin-bottom: 0 !important;
	}

	.code-control {
		position: sticky;
		z-index: 9;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 50px;
		text-align: center;
		background-color: #fff;
		font-size: 20px;
		line-height: 50px;
		border-top: 1px solid #eaeefb;

		.control-btn {
			display: flex;
			flex: 1;
			justify-content: center;
			font-size: 14px;
		}

		.arrow-icon {
			display: inline-block;
			align-self: center;
			margin-left: 5px;
			transition: transform .3s ease-in-out;
			border-top: none;
			border-right: 6px solid transparent;
			border-bottom: 6px solid #2c3e50;
			border-left: 6px solid transparent;
		}

		.online-wrapper {
			position: absolute;
			right: 0;
			top: 0;
		}
	}

	.code-wrapper {
		overflow: hidden;
		transition: max-height .2s;
	}
}

@media (max-width: 419px) {
	.demo-and-code-wrapper {
		margin: 0 -1.5rem;
		border-radius: 0 !important;

		.code-wrapper {
			overflow: auto;
		}

		div[class*="language-"] {
			margin: 0 !important;
		}
	}

	.demo-and-code-wrapper:hover {
		box-shadow: none;
	}

	.online-wrapper {
		display: none;
	}
}
</style>
