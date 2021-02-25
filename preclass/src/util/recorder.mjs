export default class Recorder {
    constructor() {

        this.audioType = 'audio/webm;codecs=opus';
        this.stream = {}
        this.mediaRecorder = {}
        this.recordedBlobs = []
        this.recordingActive = false
    }
    _setup() {
       
        const options = { mimeType: this.audioType }

        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            const msg = `the codec: ${options.mimeType} isn't supported`
            alert(msg)
            
            throw new Error(msg)
        }

        return options
    }

    startRecording(stream) {
        const options = this._setup()
        this.recordedBlobs = []

        this.mediaRecorder = new MediaRecorder(stream)

        this.mediaRecorder.onstop = (event) => {
            console.log('Recorded Blobs', this.recordedBlobs)
        }

        this.mediaRecorder.ondataavailable = (event) => {
            if (!event.data || !event.data.size) return;

            this.recordedBlobs.push(event.data)
        }

        this.mediaRecorder.start()
        console.log(`Media Recorded started`, this.mediaRecorder)
        this.recordingActive = true
    }

    async stopRecording() {
        if (!this.recordingActive) return;
        if (this.mediaRecorder.state === "inactive") return;

        console.log('media recorded stopped!')
        this.mediaRecorder.stop()

        this.recordingActive = false
    }

    getRecordingURL() {
        const blob = new Blob(this.recordedBlobs, { type: this.audioType })
        return window.URL.createObjectURL(blob)
    }

}