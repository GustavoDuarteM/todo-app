import { PlusCircle } from '@phosphor-icons/react';
import styles from './TaskForm.module.css'
import { ChangeEvent, FormEvent, useState } from 'react';
import { TaskList } from './TaskList';
import { v4 as uuidv4 } from 'uuid';

export interface Task{
  id: string,
  content: string,
  isDone: boolean
}

export function TaskForm(){
  const [task, setTask] = useState('') 
  const [taskList, setTaskList] = useState(new Array<Task>())

  const isNewTaskEmpty = task.length == 0

  function handlerTaskChange(event: ChangeEvent<HTMLInputElement>)  { 
    setTask(event.target.value)
  }

  function handlerNewTask(event: FormEvent)  {
    event.preventDefault()
    const newTask:Task = {id: uuidv4(), content: task, isDone: false}
    const newTaskList = [...taskList, newTask]
    setTaskList(newTaskList) 
    setTask('') 
  }

  return(
    <div>
      <form onSubmit={handlerNewTask} className={styles.taskForm}>
        <input 
          type="text" 
          placeholder='Adicione uma nova tarefa'
          value={task}
          onChange={handlerTaskChange}
          
          required
        />
        <button disabled={isNewTaskEmpty} type='submit'> 
          Criar
          <PlusCircle size={22}/> 
        </button>
      </form>

      <TaskList taskList={taskList} setTaskList={setTaskList}/>
    </div>
  );
}