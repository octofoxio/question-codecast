

interface Todo {
  message: string
  save(): Promise<void>
}

interface CreateTodoContext {
  TodoModel: new(message: string) => Todo
}

export async function createTodo(_, args, context: CreateTodoContext) {
  const todoItem = new context.TodoModel(args.message) // สร้าง Todomodel จริงๆ
  await todoItem.save() // ฟังก์ชั่นเรียก method save ของ TodoModel ที่สร้างขึ้นมา
  return todoItem.message // ฟังก์ชั่นจะ return todomodel.message ถ้าไม่ error
}
