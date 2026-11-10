import { makeStep, type TutorialStep } from './tutorial';
import nativeSetup from '../../../public/media/1c/personal-content-v2/setup/_meta.json';
import webSetup from '../../../public/media/web/personal-content-v2/setup/_meta.json';
import nativeView from '../../../public/media/1c/personal-content-v2/view/_meta.json';
import webView from '../../../public/media/web/personal-content-v2/view/_meta.json';

const steps = (mode: '1c' | 'web', scenario: 'setup' | 'view', data: typeof nativeSetup): TutorialStep[] =>
  data.steps.map(step => makeStep(mode, `personal-content-v2/${scenario}`, step.name, step.title, step.description));

export const personalPanelSetupSteps1c = steps('1c', 'setup', nativeSetup);
export const personalPanelSetupStepsWeb = steps('web', 'setup', webSetup);
export const personalPanelViewSteps1c = steps('1c', 'view', nativeView);
export const personalPanelViewStepsWeb = steps('web', 'view', webView);
