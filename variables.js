module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'microphoneMuted', name: 'Microphone Muted' },
		{ variableId: 'voiceChangerStatus', name: 'Voice Changer Enabled' },
		{ variableId: 'voiceSelected', name: 'Current Voice Selected' },
	])
}
