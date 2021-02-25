export default class Controller {
    constructor({ view, media, recorder }) {
        this.view = view
        this.media = media
        this.recorder = recorder

    }

    static initialize(dependencies) {
        const instance = new Controller(dependencies)

        return instance._init()
    }

    _init() {
        this.view.configureStartRecordingButton(this.onStartRecording.bind(this))
        this.view.configureStopRecordingButton(this.onStopRecording.bind(this))
    }

    async onStartRecording() {
        const audioStream = await this.media.getAudio()
        this.recorder.startRecording(audioStream)
    }
    
    async onStopRecording() {
        this.recorder.stopRecording()
        
        setTimeout(() => {
            const audioURL = this.recorder.getRecordingURL()
            this.view.playAudio(audioURL)
        });
    }
}