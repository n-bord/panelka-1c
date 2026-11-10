import { makeStep, type TutorialStep } from './tutorial';
import nativeUrl from '../../../public/media/1c/link-content-v2/web-url/_meta.json';
import nativeObject from '../../../public/media/1c/link-content-v2/object-link/_meta.json';
import webUrl from '../../../public/media/web/link-content-v2/web-url/_meta.json';
import webObject from '../../../public/media/web/link-content-v2/object-link/_meta.json';

const steps = (mode: '1c' | 'web', scenario: string, data: typeof nativeUrl): TutorialStep[] =>
  data.steps.map(step => makeStep(mode, `link-content-v2/${scenario}`, step.name, step.title, step.description));
export const webUrlSteps1c = steps('1c', 'web-url', nativeUrl);
export const webUrlStepsWeb = steps('web', 'web-url', webUrl);
export const objectLinkSteps1c = steps('1c', 'object-link', nativeObject);
export const objectLinkStepsWeb = steps('web', 'object-link', webObject);
