<script lang="ts">
	async function fetchVisitors() {
		const response = await fetch('/api/visitors')
		return response.json()
	}
</script>

<footer>
	<h2>Footer</h2>

	<dl class="grid grid-cols-[auto_1fr] gap-x-ch [&_dt]:text-right">
		<dt>Age:</dt>
		<dd>
			<label class="group/age">
				<input type="checkbox" hidden />

				<span class="transition-opacity group-has-checked/age:hidden starting:opacity-0">
					{new Intl.NumberFormat().format(
						Math.floor(
							(new Date().getTime() - new Date('1995-12-04').getTime()) / (1000 * 60 * 60 * 24),
						),
					)} days
				</span>

				<span class="transition-opacity group-not-has-checked/age:hidden starting:opacity-0">
					{(
						(new Date().getTime() - new Date('1995-12-04').getTime()) /
						(1000 * 60 * 60 * 24 * 365)
					).toFixed(1)} years
				</span>
			</label>
		</dd>

		<dt>Visitors:</dt>
		<dd>
			{#await fetchVisitors()}
				<loading></loading>
			{:then { visitors }}
				<span class="transition-opacity starting:opacity-0">
					{new Intl.NumberFormat().format(visitors)}
				</span>
			{/await}
		</dd>
	</dl>

	<p class="mt-lh text-center text-current/50">
		&copy; {new Date().getFullYear()} nuotsu. Web Dev is my passion.
	</p>
</footer>
