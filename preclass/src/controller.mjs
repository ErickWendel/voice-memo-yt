export default class Controller {
    constructor({ media, recorder, view }) {
        this.media = media
        this.recorder = recorder
        this.view = view
    }

    static initialize(deps) {
        const instance = new Controller(deps)
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