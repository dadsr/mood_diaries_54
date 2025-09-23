import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Case } from '@/src/models/Case';
import services from '@/src/services/Services';
import {useTranslation} from "react-i18next";

const { t } = useTranslation();

export class ExportServices {

    async exportDiaryToCSV(
        diary: number,
        t: (key: string, options?: any) => string
    ): Promise<string> {
        const cases: Case[] = await services.getCases(diary);

        if (!cases.length) return t('exportDiary.noCasesFound');

        const headers = diary === 1
            ? [t('exportDiary.id'), t('exportDiary.caseDate'), t('exportDiary.caseName'), t('exportDiary.caseDescription'), t('exportDiary.thoughts'), t('exportDiary.emotions'), t('exportDiary.behavior'), t('exportDiary.symptoms')]
            : [t('exportDiary.id'), t('exportDiary.caseDate'), t('exportDiary.caseName'), t('exportDiary.caseDescription'), t('exportDiary.thoughts'), t('exportDiary.emotions'), t('exportDiary.distortions'), t('exportDiary.counterThoughts')];

        const rows: string[] = [headers.join(',')];

        cases.forEach((caseItem) => {
            const baseRow = [
                (caseItem.id ?? '').toString(),
                this.escapeCsvValue(caseItem.caseDate?.toLocaleDateString() ?? ''),
                this.escapeCsvValue(caseItem.caseName ?? ''),
                this.escapeCsvValue(caseItem.caseDescription ?? ''),
                this.escapeCsvValue(caseItem.thought ?? ''),
                // Handle emotions - check if it's a getter or method
                (caseItem.emotions ?? []).map((e) => {
                    const emotion = e.getEmotion ? t(`emotions.${e.getEmotion}`) : '';
                    const intensity = e.getIntensity ?? '';
                    return [emotion, intensity].filter(Boolean).join(' ');
                }).join('; '),
            ];

            if (diary === 1) {
                baseRow.push(
                    this.escapeCsvValue(caseItem.behavior ?? ''),
                    this.escapeCsvValue(caseItem.symptoms ?? '')
                );
            } else {
                const distortions = (caseItem.distortions ?? [])
                    .map((d) => {
                        const distortionKey = d.getDistortion ?? '';
                        return distortionKey ? t(`distortions.${distortionKey}`, { defaultValue: distortionKey }) : '';
                    })
                    .filter(Boolean)
                    .join('; ');

                baseRow.push(
                    this.escapeCsvValue(distortions),
                    this.escapeCsvValue(caseItem.counterThoughts ?? '')
                );
            }
            rows.push(baseRow.join(','));
        });

        //UTF-8 for Excel compatibility
        const BOM = '\uFEFF';
        return BOM + rows.join('\n');
    }

    private escapeCsvValue(value: string): string {
        if (!value) return '';
        let val = value.replace(/"/g, '""');
        if (val.includes(',') || val.includes('\n') || val.includes('"')) {
            val = `"${val}"`;
        }
        return val;
    }

    // Modern API - Simple and clean
    async exportAndShare(diary: number, t: (key: string) => string) {
        try {
            // Generate CSV content
            const csv = await this.exportDiaryToCSV(diary, t);

            // Create file using modern API
            const file = new File(Paths.cache, 'diaryexport.csv');
            file.write(csv); // Simple, synchronous write!

            // Share the file
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(file.uri, {
                    mimeType: 'text/csv',
                    dialogTitle: t('exportDiary.share'),
                });
            } else {
                throw new Error('Sharing not available');
            }
        } catch (error) {
            console.error('Export error:', error);
            throw error;
        }
    }
}

const exportServices = new ExportServices();
export default exportServices;
