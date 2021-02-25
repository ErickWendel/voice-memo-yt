import Media from "./util/media.mjs";
import Recorder from "./util/recorder.mjs";
import Controller from "./controller.mjs"
import View from "./view.mjs";


const view = new View()
const recorder = new Recorder()
const media = new Media()

Controller.initialize({
    view,
    recorder,
    media
})

