/// <reference types="react-scripts" />

interface MonacoItem {
    name: string
    language: string
    value: string | undefined
}
  
interface MonacoModel {
  [key: number]: MonacoItem
}