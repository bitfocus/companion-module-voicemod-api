const { InstanceBase, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const { VoiceMod } = require('voicemod')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		this.config = {}
		this.memes = []
	}

	async init(config) {
		this.config = config
		this.log('debug', 'init called')

		this.updateStatus(InstanceStatus.Connecting)
		this.vm = new VoiceMod(this.config.host, this.config.apiKey === '' ? 'anyClient' : this.config.apiKey)
		try {
			this.vm.init().then(
				async () => {
					this.updateStatus(InstanceStatus.Ok)
					this.updateActionsFeedbacksVariables()

					this.log('debug', 'connected to VM and ready')
				},
				(reason) => {
					this.log('debug', reason)
					this.updateStatus(InstanceStatus.ConnectionFailure)
				}
			)
		} catch (e) {
			this.log('debug', e)
			this.updateStatus(InstanceStatus.UnknownError)
		}
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
				tooltip: 'Enter your developer API Key for voicemod (not required for now)',
				default: '',
			},
		]
	}

	updateActionsFeedbacksVariables() {
		this.updateActions() // export actions
		// this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

		this.subscribeActions()
		// this.subscribeFeedbacks()
		// this.checkFeedbacks()
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
