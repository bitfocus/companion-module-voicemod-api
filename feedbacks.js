const { combineRgb } = require('@companion-module/base')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		VoiceChangerState: {
			name: 'Voice Changer State',
			type: 'boolean',
			label: 'Voice Changer State',
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
			name: 'Background Effect State',
			type: 'boolean',
			label: 'Background Effect Status',
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
			name: 'Hear My Voice State',
			type: 'boolean',
			label: 'Hear My Voice State',
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
			name: 'Microphone Mute State',
			type: 'boolean',
			label: 'Microphone Mute State',
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
			name: 'Soundboard - Mute For Me State',
			type: 'boolean',
			label: 'Soundboard Mute For Me State',
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
