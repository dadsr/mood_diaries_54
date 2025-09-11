import {DistortionsThoughtKey, DistortionsThoughtsConst} from "./consts/DistortionsThoughtsConst";


export class DistortionThought {
    private _distortion: DistortionsThoughtKey | null;


    constructor(distortion: DistortionsThoughtKey | null) {
        this._distortion = distortion;
    }


    get getDistortion(): DistortionsThoughtKey | null {
        return this._distortion;
    }


}
