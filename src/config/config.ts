import { pascalCase, seoTitle } from 'string-fn'

import { getUrlInputs, parseUrlInputs } from '../modules/utils.ts'
import { SelectCorrectTranslationApp } from '../select-correct-translation/SelectCorrectTranslation.tsx'
import { SelectCorrectWordApp } from '../select-correct-word/SelectCorrectWordApp.tsx'
import {
  SpeakWordsOfSentenceApp,
  SpeakWordsOfSentenceContainer,
  type SpeakWordsOfSentenceContainerProps,
} from '../speak-words-of-sentence/SpeakWordsOfSentenceApp.tsx'

export const SELECT_CORRECT_TRANSLATION = {
  component: SelectCorrectTranslationApp,
  languageOptions: {
    bulgarian: {
      speakSpeed: 1,
    },
    finnish: {
      speakSpeed: 1,
    },
    french: {
      speakSpeed: 0.75,
    },
    german: {
      speakSpeed: 1,
    },
    greek: {
      speakSpeed: 1,
    },
    italian: {
      speakSpeed: 1,
    },
    portuguese: {
      speakSpeed: 1,
    },
    spanish: {
      speakSpeed: 1,
    },
  },
  languages: [
    'german',
    'french',
    'french-alternative',
    'spanish',
    'italian',
    'greek',
    'portuguese',
    'finnish',
  ],
  path: '/select-correct-translation',
}
const SELECT_CORRECT_WORD = {
  component: SelectCorrectWordApp,
  languages: ['german'],
  path: '/select-correct-word',
}
export const SPEAK_WORDS_OF_SENTENCE = {
  component: SpeakWordsOfSentenceApp,
  languageOptions: {
    bulgarian: {
      speakSpeed: 1,
    },
    french: {
      speakSpeed: 0.75,
    },
    german: {
      speakSpeed: 1,
    },
  },
  languages: ['french', 'german', 'bulgarian'],
  path: '/speak-words-of-sentence',
}

interface Application {
  component: React.FC<any>
  languages: string[]
  path: string
}

function buildRoutes(application: Application) {
  return application.languages.map((language: string)=> {
    const label = `${pascalCase(application.path)} - ${language}`
    return {
      browserTitle: `${seoTitle(application.path)} - ${language.toUpperCase()}`,
      component: application.component,
      key: label,
      label,
      language,
      route: `${application.path}/${language}`,
    }
  })
}

export const SELECT_CORRECT_WORD_ROUTES_CONFIG =
  buildRoutes(SELECT_CORRECT_WORD)
export const SELECT_CORRECT_TRANSLATION_ROUTES_CONFIG = buildRoutes(
  SELECT_CORRECT_TRANSLATION,
)
export const SPEAK_WORDS_OF_SENTENCE_ROUTES_CONFIG = buildRoutes(
  SPEAK_WORDS_OF_SENTENCE,
)

export const APPLICATIONS_ROUTES_CONFIG = [
  ...SELECT_CORRECT_WORD_ROUTES_CONFIG,
  ...SELECT_CORRECT_TRANSLATION_ROUTES_CONFIG,
  ...SPEAK_WORDS_OF_SENTENCE_ROUTES_CONFIG,
]

interface E2eConfig<T> {
  component: React.FC<T>
  getProps: () => T
  path: string
}

function getE2eProps<T>() {
  return parseUrlInputs(getUrlInputs()) as T
}
const SPEAK_WORDS_OF_SENTENCE_E2E_TESTING: E2eConfig<SpeakWordsOfSentenceContainerProps> =
  {
    component: SpeakWordsOfSentenceContainer,
    getProps: ()=> {
      return {
        ...getE2eProps(),
        acceptMicInputOnInit: false,
        goToNextIndex: ()=> {
          console.log('goToNextIndex')
        },
        handsfreeMode: false,
        initState: true,
        playCorrectAnswerSound: ()=> {
          console.log('playCorrectAnswerSound')
        },
        playWrongAnswerSound: ()=> {
          console.log('playWrongAnswerSound')
        },
      }
    },
    path: '/e2e/speak-words-of-sentence',
  }

export const APPLICATIONS_ROUTES_E2E_TESTING_CONFIG = [
  SPEAK_WORDS_OF_SENTENCE_E2E_TESTING,
]
export const TICK_TIMEOUT = 100

export interface SpeakOptions {
  lang: string
  pitch: number
  rate: number
  volume: number
}
export interface SpeakProps {
  language: Language
  rate?: number
  text: string
}

const enOptions = {
  lang: 'en-US',
  pitch: 0.9,
  rate: 1,
  volume: 1,
}

const frOptions = {
  ...enOptions,
  lang: 'fr-FR',
  rate: 0.9,
}
const esOptions = {
  ...enOptions,
  lang: 'es-ES',
}
const grOptions = {
  ...enOptions,
  lang: 'el-GR',
  rate: 0.9,
}
const deOptions = {
  ...enOptions,
  lang: 'de-DE',
}
const itOptions = {
  ...enOptions,
  lang: 'it-IT',
}
const ptOptions = {
  ...enOptions,
  lang: 'pt-PT',
}
const fiOptions = {
  ...enOptions,
  lang: 'fi-FI',
}
const bgOptions = {
  ...enOptions,
  lang: 'bg-BG',
}

export const SPEAK_OPTIONS: Record<string, SpeakOptions> = {
  bulgarian: bgOptions,
  finnish: fiOptions,
  french: frOptions,
  german: deOptions,
  greek: grOptions,
  italian: itOptions,
  portuguese: ptOptions,
  spanish: esOptions,
}
