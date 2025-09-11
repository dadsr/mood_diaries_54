import {CounterConditioningThoughtConst, CounterThoughtKey} from "./consts/CounterConditioningThoughtsConst";


export class CounterConditioningThought {
    private _counterThought: CounterThoughtKey | null;


    constructor(counterThought: CounterThoughtKey | null) {
        this._counterThought = counterThought;
    }


    get getCounterThought(): CounterThoughtKey | null {
        return this._counterThought;
    }

    get displayName(): string {
        if (!this._counterThought) return 'Unknown Thought';
        return CounterConditioningThoughtConst[this._counterThought]?.displayName || this._counterThought;
    }
}
