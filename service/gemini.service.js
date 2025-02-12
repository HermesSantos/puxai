import { instance } from "../provider/axios.js";
import {question} from '../service/inquirer.js'

export class GeminiService {
  constructor (message) {
    this.message = message
  }
  getCommitMessage() {
    instance.post(`?key=${process.env.API_KEY}`,
      {
        "contents": [{
          "parts":[{"text": "Me retorne em português brasileiro, sem caracteres especiais como aspas nem quebra de linha, uma mensagem de commit curta que mostre o que foi alterado nesse commit: " + this.message}]
        }]
      },
    ).then((response) => {
        question(response.data.candidates[0].content.parts[0].text)
      }).catch((error) => {
        error.response
      });
  }
}
