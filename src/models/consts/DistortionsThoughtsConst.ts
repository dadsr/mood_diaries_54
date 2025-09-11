import {ThoughtItem} from "../Types";

export const DistortionsThoughtsConst = {
    ALL_OR_NOTHING: { name: 'ALL_OR_NOTHING' },
    OVERGENERALIZATION: { name: 'OVERGENERALIZATION' },
    MENTAL_FILTER: { name: 'MENTAL_FILTER' },
    DISQUALIFYING_THE_POSITIVE: { name: 'DISQUALIFYING_THE_POSITIVE' },
    CATASTROPHIZING: { name: 'CATASTROPHIZING' },
    FORTUNE_TELLING: { name: 'FORTUNE_TELLING' },
    EMOTIONAL_REASONING: { name: 'EMOTIONAL_REASONING' },
    SHOULD_STATEMENTS: { name: 'SHOULD_STATEMENTS' },
    LABELING: { name: 'LABELING' },
    PERSONALIZATION: { name: 'PERSONALIZATION' },
    BLAMING: { name: 'BLAMING' }
} as const;

export type DistortionsThoughtKey = keyof typeof DistortionsThoughtsConst;

export const distortionsThoughtsArray: ThoughtItem[] = Object.entries(DistortionsThoughtsConst).map(
    ([key, value]) => ({
        id: key,
        name: value.name,
    })
);
