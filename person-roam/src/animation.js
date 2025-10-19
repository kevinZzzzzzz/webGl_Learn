import { AnimationMixer } from "three"
export default class ModelAnimation {
    constructor(model) {
        this.mixer = new AnimationMixer(model)
        this.animations = model.animations;
        this.actionObj = {};
        this.currentAct = null;
        this.previousAct = null;
    }
    start(name) {
        this.actionInit(name)
    }
    actionInit(name) {
        this.animations.forEach((clip) => {
            const action = this.mixer.clipAction(clip);
            this.actionObj[clip.name] = action
        })
        this.currentAct = this.actionObj[name]
        this.currentAct?.play()
        console.log(this.actionObj)
    }
    updateAction(name, duration = 0.2) {
        this.previousAct = this.currentAct
        this.currentAct = this.actionObj[name]
        if (this.previousAct != this.currentAct) {
            this.previousAct?.fadeOut(duration)
            this.currentAct?.reset().fadeIn(duration).play()
        }
    }
    update(dt) {
        this.mixer.update(dt)
    }

    // 获取指定动作执行的时间
    getActionTime(name) {
        const action = this.actionObj[name]
        const clip = action.getClip()
        if (action && clip) {
            return clip.duration
        }
        return 0
    }
}