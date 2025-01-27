import QcmForm from "@/components/QcmForm";
import { category } from "@/lib/dataConfigure";
import { create } from "zustand";

export const useQcmStore = create<any>((set, get) => ({
  formQcms : {
    category: [],
    language: "",
    numberQcms: 10,
    level: "",
  },
  QcmsData: [],
  start: false,
  completed: false,
  currentIndex: 0,
  time: 0,
  SelectedAnswers: [],
  score: 0,
  accuracy:0, 
  updateScore: (value: number) => {
    const { score ,QcmsData } = get();
    const accuracy = score ? (score/QcmsData.length)*100 : 0
    set({ score: score + value, accuracy});
  },
  setStart: (value: boolean) => set({ start: value }),
  SetSelectedAnswerCheckBox: (question : string , answer: string) => {
    const { SelectedAnswers } = get();
    const updatedAnswers = SelectedAnswers.map((qcm: {question : string , answers: string[]})=>{
      if(qcm.question.toLowerCase() === question.toLowerCase()){
        const isAlreadySelected = qcm.answers.includes(answer)
        return {
          ...qcm , 
          answers : isAlreadySelected ?  qcm.answers.filter(ans => ans !== answer) :[...qcm.answers ,answer ]
        }
      }
      return qcm
    })
    set({SelectedAnswers  : updatedAnswers})
  },
  SetSelectedAnswerRadio : (question : string , answer: string) =>{ 
    const { SelectedAnswers } = get();
    const updatedAnswers = SelectedAnswers.map((qcm : {question : string , answers :string[]})=>{
      if(qcm.question.toLowerCase() === question.toLowerCase()){
        return {
          ...qcm , 
          answers : [answer]
        }
      }
      return qcm
    })
    set({SelectedAnswers  : updatedAnswers})
  },
  setCurrentIndex: (index: number) => set({ currentIndex: index }),
  handleNextQuestion: () => {
    const { currentIndex, QcmsData } = get();
    if (currentIndex < QcmsData.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    } else {
      set({
        completed: true,
      });
    }
  },
  handlePreviousQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex >= 0 && currentIndex !== 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },
  setQcmData: (dataQcm: any) => {
    const arrayAnswer = dataQcm.map((qcm : any) => ({ question : qcm.question , answers: []}))
    set({ QcmsData: dataQcm , SelectedAnswers : arrayAnswer })
  },
  setTime: (value: number) => set({ time: value }),
  ResetQcmDetails: () => {
    set({
      QcmsData: [],
      start: false,
      completed: false,
      currentIndex: 0,
      time: 0,
      SelectedAnswer: [],
      score: 0,
      accuracy:0
    });
  },
  handleNumberofQcms : (number: number) => {
    const {formQcms}= get()
    if(number >= 10 && number <= 30) {
      set({formQcms : {...formQcms, numberQcms : number}})
    } else {
      console.log("minimume number is 10 question");
    }
  },
   handleCategory : (language: string) => {
      const {formQcms}= get()
      let isAlreadySelected = formQcms.category.includes(language)
      let  newCategory = isAlreadySelected ? 
      formQcms.category.filter((lang : string) => lang !== language) : [...formQcms.category , language]
      set({formQcms : {...formQcms, category : newCategory}})
    } , 
    setLevel: (level : string) =>{
       const {formQcms}= get()
       set({formQcms : {...formQcms, level}})
    },
    setLanguage: (language : string) =>{
      const {formQcms}= get()
      set({formQcms : {...formQcms, language}})
   },
   
}));