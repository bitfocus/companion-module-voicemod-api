const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	const presets = {}
	presets[`beep`] = {
		type: 'button',
		category: 'Sounds',
		name: 'Beep!',
		style: {
			text: `Beep!`,
			size: '24',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'set_beep_sound',
						options: {
							beepEnabled: true,
						},
					},
				],
				up: [
					{
						actionId: 'set_beep_sound',
						options: {
							beepEnabled: false,
						},
					},
				],
			},
		],
		feedbacks: [],
	}

	self.setPresetDefinitions(presets)
}
