import {Emotion} from "./Emotion";
import {DistortionThought} from "./DistortionThought";
import {CounterConditioningThought} from "./CounterConditioningThought";

export class Case {
    id:number;
    caseDate:Date;
    caseName: string | null;
    caseDescription: string | null;
    thought: string | null;
    emotions: Emotion[];
    behavior: string | null;
    symptoms: string | null;
    distortions: DistortionThought[];
    counterThoughts: string | null;


    constructor() {
        this.id = 0;
        this.caseDate = new Date();
        this.caseName = null;
        this.caseDescription = null;
        this.thought = null;
        this.emotions = [];
        this.behavior = null;
        this.symptoms = null;
        this.distortions = [];
        this.counterThoughts = null;

    }
}
