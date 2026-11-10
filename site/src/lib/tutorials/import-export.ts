import { makeStep, type TutorialStep } from './tutorial';
import nativeExport from '../../../public/media/1c/transfer-content-v2/export/_meta.json';
import nativeImport from '../../../public/media/1c/transfer-content-v2/import/_meta.json';
import webExport from '../../../public/media/web/transfer-content-v2/export/_meta.json';
import webImport from '../../../public/media/web/transfer-content-v2/import/_meta.json';

const steps = (mode: '1c' | 'web', operation: 'export' | 'import', data: typeof nativeExport): TutorialStep[] =>
  data.steps.map(step => makeStep(mode, `transfer-content-v2/${operation}`, step.name, step.title, step.description));

export const exportSteps1c = steps('1c', 'export', nativeExport);
export const exportStepsWeb = steps('web', 'export', webExport);
export const importSteps1c = steps('1c', 'import', nativeImport);
export const importStepsWeb = steps('web', 'import', webImport);
