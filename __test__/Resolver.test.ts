import { createTodo } from "../Resolvers";

describe("serverTest", () => {
  test("passed", async () => {

    let isSaveMethodCalled = false
    
    const result = await createTodo(null, {
      message:"test"
    }, {
      TodoModel: class MockTodoModel {
        public message: string
        constructor(message: string) {
          this.message = message
        }
        async save() {
            console.log("Save !!")
            isSaveMethodCalled = true
        }
      }
    })

    expect(result).toEqual("test")
    expect(isSaveMethodCalled).toBeTruthy()

  })
})