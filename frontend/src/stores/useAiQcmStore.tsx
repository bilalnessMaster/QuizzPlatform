import { Answer } from "@/lib/types";
import { create } from "zustand";

export const useAiQcmStore= create<any>((set, get) => ({
   
    QcmsData: [],
    start: false,
    completed: false,
    currentIndex: 0,
    time: 0,
    SelectedAnswers: [],
    score: 0,
    attemptSaved: false,
    setAttemptSaved: (value : boolean) => set({ attemptSaved: value }),
  
    updateScore: (value: number) => {
      const { score  } = get();
  
      set({ score: score + value});
    },
    setStart: (value: boolean) => set({ start: value }),
    SetSelectedAnswerCheckBox: (question : string , answer: {answer : string , right : boolean}) => {
      const { SelectedAnswers } = get();
      const updatedAnswers = SelectedAnswers.map((qcm: {category : string , question : string , answers :{answer : string , right : boolean}[]})=>{
        if(qcm.question.toLowerCase() === question.toLowerCase()){
          const isAlreadySelected = qcm.answers.find((ans)=> ans.answer === answer.answer)
          return {
            ...qcm , 
            answers : isAlreadySelected ?  qcm.answers.filter(ans => ans.answer !== answer.answer) :[...qcm.answers ,answer ]
          }
        }
        return qcm
      })
      set({SelectedAnswers  : updatedAnswers})
    },
    SetSelectedAnswerRadio : (question : string , value: {answer : string , right : boolean}) =>{ 
      const { SelectedAnswers } = get();
      const updatedAnswers = SelectedAnswers.map((qcm : {category : string , question : string , answers :{anwer : string , right : boolean}[]})=>{
        if(qcm.question.toLowerCase() === question.toLowerCase()){
          return {
            ...qcm , 
            answers : [value]
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
      const arrayAnswer = dataQcm.map((qcm : any) => {
        const rightAnswers = qcm.answers.filter((answer : Answer) => answer.right )
        return ({ category : qcm.category , rightAnswers ,  question : qcm.question , answers: []})
      }) 
      
      // { answer : 'something'  , right : true }
      set({ QcmsData: dataQcm , SelectedAnswers : arrayAnswer })
    },
    setTime: (value: number) => set({ time: value }),
    ResetQcmDetails: () => {
      set({
        formQcms : {
          category: [],
          language: "",
          numberQcms: 5,
          level: "",
        },
        QcmsData: [],
        start: false,
        completed: false,
        currentIndex: 0,
        time: 0,
        SelectedAnswers: [],
        score: 0,
        attemptSaved: false,
      });
    },
    handleNumberofQcms : (number: number) => {
      const {formQcms}= get()
      if(number >= 5 && number <= 30) {
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
  