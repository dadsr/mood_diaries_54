import { File, Paths } from 'expo-file-system';
import {Case} from "@/src/models/Case";
import services from "@/src/services/Services";

export class ExportServices {

    async exportDiaryToCSV(diary: number, t: (key: string) => string): Promise<string> {
        console.log("exportDiaryToCSV diary", diary);

        const cases: Case[] = await services.getCases(diary);

        if (cases.length === 0) {
            return t("exportDiary.noCasesFound");
        }

        const headers = diary === 1
            ? [
                t("exportDiary.id"),
                t("exportDiary.caseDate"),
                t("exportDiary.caseName"),
                t("exportDiary.caseDescription"),
                t("exportDiary.thoughts"),
                t("exportDiary.emotions"),
                t("exportDiary.behavior"),
                t("exportDiary.symptoms")
            ]
            : [
                t("exportDiary.id"),
                t("exportDiary.caseDate"),
                t("exportDiary.caseName"),
                t("exportDiary.caseDescription"),
                t("exportDiary.thoughts"),
                t("exportDiary.emotions"),
                t("exportDiary.distortions"),
                t("exportDiary.counterThoughts")
            ];


        let csvContent = headers.join(",") + "\n";


        cases.forEach(caseItem => {
            // Format emotions as readable string
            const emotions = caseItem.emotions
                .map(e => `${e.getEmotion}(${e.getIntensity})`).join("; ");

            let row = [
                caseItem.id?.toString() || "",
                `"${this.escapeCsvValue(caseItem.caseName || '')}"`,
                `"${caseItem.caseDate?.toLocaleDateString() || ''}"`,
                `"${this.escapeCsvValue(caseItem.caseDescription || '')}"`,
                `"${this.escapeCsvValue(caseItem.thought || '')}"`,
                `"${emotions}"`
            ];

            if (diary === 1) {
                row.push(
                    this.escapeCsvValue(caseItem.behavior ?? ""),
                    this.escapeCsvValue(caseItem.symptoms ?? "")
                );
            } else if (diary === 2) {
                const distortions = (caseItem.distortions ?? [])
                    .map(d => d.getDistortion).join("; ");
                row.push(
                    this.escapeCsvValue(distortions),
                    this.escapeCsvValue(caseItem.counterThoughts ?? "")
                );
            }

            csvContent += row.join(",") + "\n";
        });

        return csvContent;
    }

    private escapeCsvValue(value: string): string {
        if (!value) return '';
        return value
            .replace(/"/g, '""')
            .replace(/\n/g, ' ')
            .replace(/\r/g, ' ');
    }

    async saveCSVToFile(csv: string, fileName: string = 'diary_export.csv'): Promise<string> {
        const file = new File(Paths.document, fileName);
        await file.create();
        await file.write(csv); // UTF-8
        return file.uri;
    }

    async getExportSummary(diary: number): Promise<{
        totalEntries: number;
        dateRange: string;
        diaryType: string;
        oldestEntry?: Date;
        newestEntry?: Date;
    }> {
        console.log("getExportSummary diary", diary);
        const cases: Case[] = await services.getCases(diary);

        let dateRange = "No entries";
        let oldestEntry: Date | undefined;
        let newestEntry: Date | undefined;

        if (cases.length > 0) {
            const dates = cases
                .map(c => c.caseDate)
                .filter((d): d is Date => d instanceof Date);

            if (dates.length > 0) {
                oldestEntry = new Date(Math.min(...dates.map(d => d.getTime())));
                newestEntry = new Date(Math.max(...dates.map(d => d.getTime())));

                if (dates.length === 1) {
                    dateRange = oldestEntry.toLocaleDateString();
                } else {
                    dateRange = `${oldestEntry.toLocaleDateString()} - ${newestEntry.toLocaleDateString()}`;
                }
            }
        }

        return {
            totalEntries: cases.length,
            dateRange,
            diaryType: diary === 1 ? "First Diary (Behavior & Symptoms)" : "Second Diary (Cognitive Distortions)",
            oldestEntry,
            newestEntry
        };
    }

}

const exportServices =new ExportServices();
export default exportServices;
