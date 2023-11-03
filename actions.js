module.exports = function (self) {
	self.setActionDefinitions({
		set_voice_id: {
			name: 'Set Voice',
			options: [
				{
					id: 'voiceId',
					type: 'dropdown',
					label: 'Voice',
					default: 0,
					choices: self.vm.voices.map((item) => ({ id: item.id, label: item.name })),
				},
			],
			callback: async (event) => {
				const voiceId = event.options.voiceId
				self.vm.voices[voiceId].load()
			},
		},
		set_beep_sound: {
			name: 'Set Beep Sound',
			options: [
				{
					id: 'beepEnabled',
					type: 'checkbox',
					label: 'Enabled',
					default: false,
				},
			],
			callback: async (event) => {
				self.vm.internal.setBeepSound(event.options.beepEnabled)
			},
		},
		toggle_voice_changer: {
			name: 'Toggle Voice Changer',
			options: [],
			callback: async (event) => {
				self.vm.internal.toggleVoiceChanger()
			},
		},
		play_meme: {
			name: 'Play Meme',
			options: [
				{
					id: 'soundboardId',
					type: 'dropdown',
					label: 'Soundboard',
					default: 0,
					choices: self.vm.soundboards.map((item) => ({ id: item.id, label: item.name })),
				},
				{
					id: 'memeId',
					type: 'dropdown',
					label: 'Meme',
					default: 0,
				},
			],
			callback: async (event) => {
				console.log('in callback!')
				const soundboardId = event.options.soundboardId
				const memeId = event.options.memeId
				self.vm.soundboards[soundboardId][memeId].play()
			},
		},
		stop_all_sounds: {
			name: 'Stop all sounds',
			options: [],
			callback: async (event) => {
				self.vm.stopAllSounds()
			},
		},
	})
}
