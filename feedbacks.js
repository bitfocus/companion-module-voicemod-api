const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		VoiceChangerState: {
			name: 'Voice Changer Enabled',
			type: 'boolean',
			label: 'Voice Changer Enabled',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: (feedback, context) => {
				return self.voiceChangerEnabled
			},
		},
		BackgroundEffectState: {
			name: 'Background Effect Enabled',
			type: 'boolean',
			label: 'Background Effect Enabled',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: (feedback, context) => {
				return self.backgroundEffectsEnabled
			},
		},
		HearMyVoiceState: {
			name: 'Hear My Voice Enabled',
			type: 'boolean',
			label: 'Hear My Voice Enabled',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: (feedback, context) => {
				return self.hearMyVoiceEnabled
			},
		},
		MicMutedState: {
			name: 'Microphone Mute Enabled',
			type: 'boolean',
			label: 'Microphone Mute Enabled',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: (feedback, context) => {
				return self.muteEnabled
			},
		},
		MemesMutedForMeState: {
			name: 'Soundboard - Mute For Me Enabled',
			type: 'boolean',
			label: 'Soundboard Mute For Me Enabled',
			defaultStyle: {
				bgcolor: combineRgb(255, 0, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: (feedback, context) => {
				return self.muteMemesEnabled
			},
		},
	})
}
