<script lang="ts">
	import { onMount } from 'svelte';
	import { loadForm, pushForm } from '../../lib-wrapper/useAxios';
	import Text from '../../components/text/text.svelte';
	import Button from '../../components/button/button.svelte';
	import Interactable from '../../components/interactable.svelte';
	import Image from '../../components/image/image.svelte';
	import './menu.scss';
	import '../../layouts/pagebuilder/pagebuilder.scss';

	let dataToSubmit: any = {
		customerInfo: {
			name: null,
			phone: null,
			eventType: null,
			eventVenue: null
		},
		menu: <any>[]
	};
	$: dataToSubmit;

	let numberOfDays: number;
	$: numberOfDays;

	let formData: any = {};
	$: formData;

	let temp: any;

	let renderData: any[];
	$: renderData;

	let displayForm: boolean;
	$: displayForm;

	let dayBasedRequirements: any = [];
	$: dayBasedRequirements;

	let miscRequirements: any = [];
	$: miscRequirements;

	const renderForm = () => {
		let x = 0;
		for (let key in dataToSubmit.customerInfo) {
			if (dataToSubmit.customerInfo[key]) x++;
		}
		if (x != Object.keys(dataToSubmit.customerInfo).length)
			return alert('Enter Details To Continue');

		let _ = structuredClone(temp);
		formData.repeatable = [];

		let days = 0;

		for (let i = 0; i < dayBasedRequirements.length; i++) {
			if (!dayBasedRequirements[i].selected) continue;
			days += 1;
			let toPush: any = [];
			let elem = dayBasedRequirements[i].selection;
			for (let req in elem) {
				if (!dayBasedRequirements[i].date) {
					alert(`Select Date For All Days To Continue`);
					return;
				}
				if (elem[req].selected) {
					for (let j = 0; j < _.repeatable[0].length; j++) {
						const element = _.repeatable[0][j];
						if (element.title == elem[req].bind) {
							element['date'] = dayBasedRequirements[i].date;
							element['headCount'] = elem[req].headCount;
							toPush.push(element);
						}
					}
				}
			}
			formData.repeatable.push(toPush);
		}

		if (days == 0) return alert('Selected atleast 1 day to continue');

		displayForm = true;
	};

	onMount(async () => {
		temp = await loadForm();
		temp.repeatable = [temp.repeatable];
		formData = structuredClone(temp);

		for (let i = 0; i < 3; i++) {
			dayBasedRequirements.push({
				date: null,
				selected: false,
				selection: {
					breakfast: { selected: false, headCount: 0, bind: 'Breakfast' },
					lunch: { selected: false, headCount: 0, bind: 'Lunch' },
					welcome_juice: { selected: false, headCount: 0, bind: 'Welcome Juice' },
					snacks: { selected: false, headCount: 0, bind: 'Evening Snacks' },
					dinner: { selected: false, headCount: 0, bind: 'Dinner' }
				}
			});

			dayBasedRequirements = dayBasedRequirements;
		}

		miscRequirements = temp.once.map((e: any) => {
			e.selected = false;
			return e;
		});
	});
</script>

<div class="vspace vspace--small" />
<div class="page__title">
	<Text text="Get A Quote" style="l-bold" alignment="center" />
</div>
<div class="vspace vspace--small" />

<div class="wrapper">
	<div class="form" on:submit={renderForm}>
		<div class="head">
			<Image src="/logo.svg" alt="logo" />
		</div>

		{#if !displayForm}
			<Text
				text="Enter your details and select days to continue"
				style="m-bold"
				alignment="center"
			/>
			<div class="vspace vspace--small" />
		{/if}

		<div class="row">
			<div class="inp">
				<Text text="Name" style="s-bold" />
				<input type="text" required bind:value={dataToSubmit.customerInfo.name} />
			</div>
			<div class="inp">
				<Text text="Phone" style="s-bold" />

				<input type="text" required bind:value={dataToSubmit.customerInfo.phone} />
			</div>
		</div>

		<div class="row">
			<div class="inp">
				<Text text="Event" style="s-bold" />

				<input type="text" required bind:value={dataToSubmit.customerInfo.eventType} />
			</div>
			<div class="inp">
				<Text text="Venue" style="s-bold" />

				<input type="text" required bind:value={dataToSubmit.customerInfo.eventVenue} />
			</div>
		</div>

		<div class="vspace vspace--small" />

		<div class="dayInput">
			{#each dayBasedRequirements as req, _}
				<div class="day">
					<div class="row">
						<input
							type="checkbox"
							on:change={() => {
								dayBasedRequirements[_].selected = !dayBasedRequirements[_].selected;
							}}
						/>
						<Text text="Day {_ + 1}" style="s-bold" />
						{#if dayBasedRequirements[_].selected}
							<input type="date" bind:value={dayBasedRequirements[_].date} />
						{/if}
					</div>
					{#if dayBasedRequirements[_].selected}
						<div class="sec-row" style="display: flex">
							{#each Object.keys(req.selection) as sReq}
								<div class="item-col">
									<div class="item-row">
										<input
											type="checkbox"
											on:change={() => {
												dayBasedRequirements[_].selection[sReq].selected =
													!dayBasedRequirements[_].selection[sReq].selected;
											}}
										/>
										<Text text={sReq.replace('_', ' ')} style="s-medium" alignment="left" cap />
									</div>

									<div class="item-col">
										{#if dayBasedRequirements[_].selection[sReq].selected}
											<Text text="Head Count" style="xs-medium" />
											<input
												type="number"
												min="0"
												style="width: 5rem"
												bind:value={dayBasedRequirements[_].selection[sReq].headCount}
											/>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="vspace vspace--small" />

		<div class="row row--small">
			{#each miscRequirements as m, _}
				<div class="misc">
					<div class="row">
						<input
							type="checkbox"
							on:change={() => {
								miscRequirements[_].selected = !miscRequirements[_].selected;
							}}
						/>
						<Text text={m.title} style="s-bold" />
					</div>
				</div>
			{/each}
		</div>

		<div class="vspace vspace--medium" />
		{#if dayBasedRequirements.length > 0}
			<Interactable onclick={renderForm}>
				<div style="width: fit-content; margin-inline: auto">
					<Button text="Select Menu" style="s-bold" flexible />
				</div>
			</Interactable>
		{/if}
	</div>

	<div class="vspace vspace--medium" />

	{#if formData.repeatable}
		<div class="menu">
			{#each formData.repeatable as repData, repIndex}
				{#if formData.repeatable.length > 1}
					<Text text="Day {repIndex + 1}" style="l-bold" alignment="center" />{/if}
				{#each repData as repItem, repItemIndex}
					<Text text={repItem.title} style="m-bold" />
					<div class="vspace vspace--small" />
					{#each repItem.sections as sec, secIndex}
						{#if sec.title}
							<div style="font-size: 1.3rem;">
								<Text text={sec.title} style="f-medium" />
							</div>
							<div class="vspace vspace--xsmall" />
						{/if}
						<div class="sec-row">
							{#each sec.options as opt, optIndex}
								{#if opt.value}
									<div class="item-row">
										<input
											type="checkbox"
											on:change={() => {
												formData.repeatable[repIndex][repItemIndex].sections[secIndex].options[
													optIndex
												].selected =
													!formData.repeatable[repIndex][repItemIndex].sections[secIndex].options[
														optIndex
													].selected;
											}}
											disabled={!displayForm}
										/>
										<Text text={opt.value} style="s-medium" alignment="left" />
									</div>
								{/if}
							{/each}
						</div>
						<div class="vspace vspace--small" />
						<div class="vspace vspace--small" />
					{/each}
				{/each}
				<div class="vspace vspace--medium" />
			{/each}
			{#each formData.once as onceData, onceIndex}
				{#if miscRequirements[onceIndex].selected}
					<Text text={onceData.title} style="m-bold" />
					<div class="vspace vspace--small" />
					{#each onceData.sections as sec, secIndex}
						{#if sec.title}
							<Text text={sec.title} style="f-medium" />
							<div class="vspace vspace--xsmall" />
						{/if}
						<div class={onceData.title == 'Other Arrangements' ? '' : 'sec-row'}>
							{#each sec.options as opt, optIndex}
								<div class="item-row">
									<input
										type="checkbox"
										on:change={() => {
											formData.once[onceIndex].sections[secIndex].options[optIndex].selected =
												!formData.once[onceIndex].sections[secIndex].options[optIndex].selected;
										}}
										disabled={!displayForm}
									/>
									<Text text={opt.value} style="s-medium" alignment="left" />
								</div>
							{/each}
						</div>
						<div class="vspace vspace--small" />
						<div class="vspace vspace--small" />
					{/each}
				{/if}
			{/each}
		</div>

		<div class="submit">
			<Interactable
				onclick={() => {
					if (!(displayForm && (formData.once || formData.repeatable))) return;
					dataToSubmit.menu = formData;
					pushForm(dataToSubmit);
				}}
			>
				<Button text="Submit" style="s-bold" flexible />
			</Interactable>
		</div>
	{/if}
</div>
