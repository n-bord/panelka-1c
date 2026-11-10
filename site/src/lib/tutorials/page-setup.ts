import { makeStep, type TutorialStep } from './tutorial';
import native from '../../../public/media/1c/page-content-v2/_meta.json';
import web from '../../../public/media/web/page-content-v2/_meta.json';

const steps = (mode: '1c' | 'web', data: typeof native): TutorialStep[] =>
  data.steps.map(step => makeStep(mode, 'page-content-v2', step.name, step.title, step.description));

export const pageSetupSteps1c = steps('1c', native);
export const pageSetupStepsWeb = steps('web', web);
