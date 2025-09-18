import {Case} from "../models/Case";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    SerializedCase,
    SerializedDistortionThought,
    SerializedEmotion
} from "../models/Types";
import {Emotion} from "../models/Emotion";
import {DistortionThought} from "../models/DistortionThought";



export class Services {

    async getCases(diary: number): Promise<Case[]> {
        console.log("getCases diary ", diary);
        let storedCases: string | null = null;
        storedCases = await AsyncStorage.getItem('cases' + diary);

        if (storedCases) {
            const parsed = JSON.parse(storedCases) as SerializedCase[];

            return parsed.map(caseItem => {
                const caseInstance = new Case();
                caseInstance.id = caseItem.id;
                caseInstance.caseName = caseItem.caseName;
                caseInstance.caseDate = new Date(caseItem.caseDate);
                caseInstance.caseDescription = caseItem.caseDescription;
                caseInstance.thought = caseItem.thought;
                caseInstance.emotions = caseItem.emotions?.map((e: SerializedEmotion) =>
                    new Emotion(e._emotion, e._intensity)) || [];
                caseInstance.behavior = caseItem.behavior;
                caseInstance.symptoms = caseItem.symptoms;
                caseInstance.distortions = caseItem.distortions?.map((e: SerializedDistortionThought) =>
                    new DistortionThought(e._distortion)) || [];
                caseInstance.counterThoughts = caseItem.counterThoughts;
                return caseInstance;
            });
        }
        return [];
    }

    async getCase(diary: number, id: number): Promise<Case | null> {
        console.log("getCase ", id);

        const cases: Case[] = await this.getCases(diary);
        const index: number = cases.findIndex(c => c.id === id);
        if (index !== -1) {
            return cases[index];
        }
        return null;
    }

    async updateCase(diary: number, updatedCase: Case): Promise<void> {
        console.log("updateCase diary ", diary);

        const cases: Case[] = await this.getCases(diary);
        const index = cases.findIndex(c => c.id === updatedCase.id);
        if (index !== -1) {
            const serializedCase: SerializedCase = {
                ...updatedCase,
                emotions: updatedCase.emotions.map(e => ({
                    _emotion: e.getEmotion,
                    _intensity: e.getIntensity
                })),
                distortions: updatedCase.distortions.map(e => ({
                    _distortion: e.getDistortion,
                })),
                counterThoughts: updatedCase.counterThoughts,
                caseDate: updatedCase.caseDate.toISOString()
            };
            const updatedCases = [...cases];
            updatedCases[index] = this.parseSerializedCase(serializedCase);

            await AsyncStorage.setItem('cases' + diary, JSON.stringify(updatedCases.map(c => this.serializeCase(c))));

        }
    }

    async addCase(diary: number, newCase: Case): Promise<void> {
        console.log("addCase diary ", diary);

        const cases: Case[] = await this.getCases(diary);
        if (cases.length > 0) {
            newCase.id = Math.max(...cases.map(c => c.id || 0)) + 1;
        } else {
            newCase.id = 1;
        }
        const serializedCase = {
            ...newCase,
            emotions: newCase.emotions.map(e => ({
                _emotion: e.getEmotion,
                _intensity: e.getIntensity
            })),
            distortions: newCase.distortions.map(e => ({
                _distortion: e.getDistortion,
            })),
            counterThoughts: newCase.counterThoughts,
            caseDate: newCase.caseDate.toISOString()
        };

        await AsyncStorage.setItem('cases' + diary, JSON.stringify([...cases, serializedCase]));

    }

    async clearCases(diary: number): Promise<void> {
        console.log("clearCases diary ", diary);
        await AsyncStorage.removeItem('cases' + diary);
    }

    async deleteCase(diary: number, caseId: number): Promise<void> {
        console.log("deleteCase ", caseId);

        const cases: Case[] = await this.getCases(diary);
        const newCases = cases.filter(caseItem => caseItem.id !== caseId);

        await AsyncStorage.setItem('cases' + diary, JSON.stringify(newCases));

    }

    private parseSerializedCase(serialized: SerializedCase): Case {
        const caseInstance = new Case();
        caseInstance.id = serialized.id;
        caseInstance.caseDate = new Date(serialized.caseDate);
        caseInstance.caseName = serialized.caseName;
        caseInstance.caseDescription = serialized.caseDescription;
        caseInstance.thought = serialized.thought;
        caseInstance.emotions = serialized.emotions.map(e =>
            new Emotion(e._emotion, e._intensity)
        );
        caseInstance.behavior = serialized.behavior;
        caseInstance.symptoms = serialized.symptoms;
        caseInstance.distortions = serialized.distortions.map(e =>
            new DistortionThought(e._distortion)
        );
        caseInstance.counterThoughts = serialized.counterThoughts;
        return caseInstance;
    }

    private serializeCase(caseInstance: Case): SerializedCase {
        return {
            ...caseInstance,
            caseDate: caseInstance.caseDate.toISOString(),
            emotions: caseInstance.emotions.map(e => ({
                _emotion: e.getEmotion,
                _intensity: e.getIntensity,
            })),
            distortions: caseInstance.distortions.map(e => ({
                _distortion: e.getDistortion,
            })),
            counterThoughts: caseInstance.counterThoughts,
        };
    }

}
const services =new Services();
export default services;
