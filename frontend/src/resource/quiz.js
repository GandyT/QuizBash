class QuizForm
{
  constructor(id, name, creatorId, description, thumbnailURL)
  {
    this.id = id;
    this.name = name;
    this.creatorId = creatorId;
    this.description = description;
    this.thumbnailURL = thumbnailURL;
    this.questions = [];
  }

  get(parameter)
  {
    if (parameter=="all")
    {
      return {
        id: this.id,
        name: this.name,
        creatorId: this.creatorId,
        description: this.description,
        thumbnailURL: this.thumbnailURL,
        questions: this.questions
      }
    }else if (parameter=="id")
    {
      return this.id;
    }else if (parameter=="name")
    {
      return this.name;
    }else if (parameter=="creatorId")
    {
      return this.creatorId;
    }else if (parameter=="description")
    {
      return this.description;
    }else if (parameter=="thumbnailURL")
    {
      return this.thumbnailURL;
    }else if (parameter=="questions")
    {
      return this.questions;
    }
    else
    {
      throw new Error("Invalid attribute.");
    }
  }
  set(parameter, value)
  {
    if (parameter=="id")
    {
      this.id = value;
    }else if (parameter=="name")
    {
      this.name = value;
    }else if (parameter=="creatorId")
    {
      this.creatorId = value;
    }else if (parameter=="description")
    {
      this.description = value;
    }else if (parameter=="thumbnailURL")
    {
      this.thumbnailURL = value;
    }else{
      throw new Error("Invalid attribute!")
    }
  }
  removeQuestion(index)
  {
    if (index>this.questions.length-1)
    {
      throw new Error("Out of bound!")
      return
    }
    this.questions.splice(index,1);
  }
  addQuestion(question, choices, correctchoice)
  {
    if (Array.isArray(choices)==false)
    {
      throw new Error("Choices must be an array!")
    }
    this.questions.push({question: question, choices:choices, correctchoice:correctchoice});
  }
}
