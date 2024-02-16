module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'microphoneMuted', name: 'Microphone Muted' },
		{ variableId: 'voiceChangerStatus', name: 'Voice Changer Enabled' },
		{ variableId: 'voiceSelected', name: 'Current Voice Selected' },
		{ variableId: 'hearMyVoice', name: 'Hear My Voice Enabled' },
		{ variableId: 'hearBackgroundMusic', name: 'Background Music Enabled' },
		{ variableId: 'hearMemesForMe', name: 'Hear Memes for Me Enabled' },
	])
}
