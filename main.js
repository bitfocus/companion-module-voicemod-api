const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const UpdatePresets = require('./presets')
const { VoiceMod } = require('voicemod')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		this.loaded = false
		this.failure = 0

		this.config = {}
		this.memes = []
		this.backgroundEffectsEnabled = false
		this.voiceChangerEnabled = false
		this.hearMyVoiceEnabled = false
		this.muteEnabled = false
		this.muteMemesEnabled = false
		this.currentVoiceName = ''
	}

	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	async init(config) {
		this.config = config
		this.log('debug', 'init called')

		do {
			this.updateStatus(InstanceStatus.Connecting)
			this.vm = new VoiceMod(this.config.host, this.config.apiKey === '' ? 'anyClient' : this.config.apiKey)
			try {
				await this.vm.init().then(
					async () => {
						this.vm.internal.on('backgroundEffectsEnabledEvent', (background) => {
							this.backgroundEffectsEnabled = true
							this.checkFeedbacks('BackgroundEffectState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('backgroundEffectsDisabledEvent', (background) => {
							this.backgroundEffectsEnabled = false
							this.checkFeedbacks('BackgroundEffectState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('voiceChangerEnabledEvent', (data) => {
							this.voiceChangerEnabled = true
							this.checkFeedbacks('VoiceChangerState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('voiceChangerDisabledEvent', (data) => {
							this.voiceChangerEnabled = false
							this.checkFeedbacks('VoiceChangerState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('hearMySelfEnabledEvent', (data) => {
							this.hearMyVoiceEnabled = true
							this.checkFeedbacks('HearMyVoiceState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('hearMySelfDisabledEvent', (data) => {
							this.hearMyVoiceEnabled = false
							this.checkFeedbacks('HearMyVoiceState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('muteMicrophoneEnabledEvent', (data) => {
							this.muteEnabled = true
							this.checkFeedbacks('MicMutedState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('muteMicrophoneDisabledEvent', (data) => {
							this.muteEnabled = false
							this.checkFeedbacks('MicMutedState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('muteMemeForMeEnabledEvent', (data) => {
							this.muteMemesEnabled = true
							this.checkFeedbacks('MemesMutedForMeState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('muteMemeForMeDisabledEvent', (data) => {
							this.muteMemesEnabled = false
							this.checkFeedbacks('MemesMutedForMeState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('getAllSoundboard', (data) => {
							this.updateActions()
						})
						this.vm.internal.on('voiceLoadedEvent', (data) => {
							this.currentVoiceName = data.voiceId
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('getCurrentVoice', (data) => {
							this.currentVoiceName = data.voiceId
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('toggleVoiceChanger', (data) => {
							this.voiceChangerEnabled = data.value
							this.checkFeedbacks('VoiceChangerState')
							this.updateVariableDefinitions()
						})
						this.vm.internal.on('toggleMuteMic', (data) => {
							this.muteEnabled = data.value
							this.checkFeedbacks('MicMutedState')
							this.updateVariableDefinitions()
						})

						await this.vm.internal.getCurrentVoice()
						this.vm.internal.getVoiceChangerStatus()
						this.vm.internal.getMuteMicStatus()

						this.failure = 0
						this.loaded = true
						this.updateStatus(InstanceStatus.Ok)
						this.updatePresets()
						this.updateActionsFeedbacksVariables()

						this.log('debug', 'connected to VM and ready')
					},
					(reason) => {
						this.log('debug', reason)
						this.updateStatus(InstanceStatus.ConnectionFailure)
						++this.failure
					}
				)
			} catch (e) {
				this.log('debug', e)
				this.updateStatus(InstanceStatus.UnknownError)
				++this.failure
			}
		} while (this.loaded === false && this.failure < 5)
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
		this.log('debug', 'config updated')
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				id: 'host',
				type: 'textinput',
				label: 'Host address',
				tooltip: 'Enter the IP/Hostname for the voicemod instance',
				default: '127.0.0.1',
			},
			{
				id: 'apiKey',
				type: 'textinput',
				label: 'API Key',
				tooltip: 'Enter your API Key for voicemod (https://control-api.voicemod.net)',
				default: '',
			},
		]
	}

	updateActionsFeedbacksVariables() {
		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

		this.subscribeActions()
		this.subscribeFeedbacks()
		this.checkFeedbacks()
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)

		this.setVariableValues({
			microphoneMuted: this.muteEnabled,
			hearMyVoice: this.hearMyVoiceEnabled,
			hearBackgroundMusic: this.backgroundEffectsEnabled,
			hearMemesForMe: this.muteMemesEnabled,
			voiceChangerStatus: this.voiceChangerEnabled,
			voiceSelected: this.currentVoiceName,
		})
	}

	updatePresets() {
		UpdatePresets(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
