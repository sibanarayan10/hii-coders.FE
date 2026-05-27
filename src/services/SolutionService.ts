import { ProgrammingLanguage } from "../enums/ProgrammingLanguage"
import { api } from "./AxiosConfig"

class SolutionService {
    route = "api/v1/solution"

    getSolution = (language: ProgrammingLanguage, userId: string, problemId: string) => api.get(`${this.route}?language=${language}&userId=${userId}&problemId=${problemId}`)
    saveSolution = (payload: any) => api.post(`${this.route}`, payload)

}

export default new SolutionService();