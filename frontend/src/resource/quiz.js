import Axios from "axios";

export default class QuizForm {
  constructor(id, name, creatorId, description, thumbnailURL, questions) {
    this.id = id;
    this.name = name;
    this.creatorId = creatorId;
    this.description = description;
    this.thumbnailURL = thumbnailURL;
    this.questions = questions.length > 0 ? questions : [{ question: "", choices: ["edit choice"], correctchoice: 0 }];
  }

  get(parameter) {
    if (parameter == "all") return {
      id: this.id,
      name: this.name,
      creatorId: this.creatorId,
      description: this.description,
      thumbnailURL: this.thumbnailURL,
      questions: this.questions
    }

    if (this[parameter])
      return this[parameter];
    throw new Error("Invalid attribute.");
  }
  set(parameter, value) {
    if (this[parameter]) {
      this[parameter] = value;
    } else {
      throw new Error("Invalid attribute!")
    }
  }
  removeQuestion(index) {
    if (index > this.questions.length - 1) {
      throw new Error("Out of bound!")
      return
    }
    this.questions.splice(index, 1);
  }
  addQuestion(question) {
    if (Array.isArray(choices) == false) {
      throw new Error("Choices must be an array!")
    }
    this.questions.push({ question: question, choices: ["edit choice"], correctchoice: 0 });
  }
  setQuestion(index, newQuestion) {
    this.questions[index] = newQuestion;
  }
  getQuestion(index) {
    return this.questions[index];
  }
  save(token) {
    return new Promise((resolve, rej) => {
      Axios.post("api/savequiz", {
        token: token,
        id: this.id,
        name: this.name,
        questions: this.questions,
        description: this.description,
        thumbnailURL: this.thumbnailURL
      })
        .then(res => {
          resolve();
        });
    })
  }
}
