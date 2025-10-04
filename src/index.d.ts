interface Answer {
  chance?: number
  value: string
}

type CreateGetter<T, K extends string> = Record<Getter<K>, () => T>

type CreateSetter<T, K extends string> = Record<Setter<K>, (x: T) => void>

interface DbOrigin {
  doc: SingleLearningInstance
}

interface DecoratedFrontendSentence extends FrontendSentence {
  questionsModesLength: number
}

interface FrontendSentence extends SentenceOrigin {
  words: Word[]
}

type Getter<T extends string> = `get${PascalCase<T>}`

interface InitDatabase extends UseInitDatabase {
  setLoading: (input: boolean) => void
  sortingOrder: SortingOrder
}

type matcher = (sentence: Word[]) => Word[]

type PascalCase<Str extends string> = Str extends `${infer Start}-${infer End}`
  ? PascalCase<`${Capitalize<Start>}${Capitalize<End>}`>
  : Capitalize<Str>

interface QuestionWord extends SimpleWord {
  correct: boolean
  isVisible: boolean
  questionGroup: string
  selectionChoices: SelectionChoice[]
}

interface SelectionChoice {
  correct: boolean
  value: string
}

interface Sentence {
  translation: string
  words: Word[]
}

interface SentenceOrigin {
  text: string
  translation: string
}

type Setter<T extends string> = `set${PascalCase<T>}`

interface SimpleWord {
  value: string
}

interface SingleLearningInstance {
  dePart: string
}

interface SolveSentenceInput {
  questions: QuestionWord[]
  sentenceToRenderInitialState: Word[]
  translation: string
}
// TODO: this is wrong as it should be read from the source
type SortingOrder =
  | 'index asc'
  | 'question count asc'
  | 'question count desc'
  | 'text length asc'
  | 'text length desc'

interface UseInitDatabase {
  hardMode: string
  limitQuestionsMode: string
  numberOfChoices: number
  readAsBookMode: string
  selectedBooks: BookFilePath[]
  sortingOrder: null | SortingOrder
}
type Word = QuestionWord | SimpleWord
