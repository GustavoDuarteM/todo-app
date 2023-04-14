import { Check, Circle, Trash } from '@phosphor-icons/react';
import { Task } from './TaskForm';
import styles from './TaskList.module.css'
import { MouseEvent } from 'react';


interface TaskListProps{
  taskList: Task[],
  setTaskList: (taskList:Task[]) => void
}

export function TaskList({ taskList, setTaskList }:TaskListProps){
  const taskListCount = taskList.length
  const doneTaskListCount = taskList.filter(task => task.status == 'done').length
  
  function handlerChangeTaskStatus(event:  MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    const event_i:any = event.currentTarget.value;
    const newTaskList = taskList.map((task) => {
      if (task == taskList[event_i]){
        task.status =  task.status == 'todo' ? 'done': 'todo'
      }
      return task
    })
    setTaskList(newTaskList);
  }
  
  function handlerDeleteTask(event:  MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    const event_i:any = event.currentTarget.value;
    const newTaskList = taskList.filter((task) => task != taskList[event_i])
    setTaskList(newTaskList);
  }

  return(
    <div className={styles.taskList}>
      <header>
        <div className={styles.cretedTask}>
          <span>Tarefas criadas</span>
          <span>{taskListCount}</span>
        </div>
        <div className={styles.doneTask}>
          <span>Concluídas</span>
          <span>{`${doneTaskListCount} de ${taskListCount}`}</span>
        </div>
      </header>
      <main>
        {
          taskList.map((task, i)=>{
            return(
              <div className={styles.taskItem} key={i}>
                <button className={styles.taskItemSatus } onClick={handlerChangeTaskStatus} value={i}>
                    {task.status == "done" && <Check  size={24} className={styles.checkCircle} /> }
                    {task.status == "todo" && <Circle size={24} className={styles.circle }/> }
                </button>
                <div className={styles.taskItemContent}>
                  <p>{task.content}</p>
                </div>
                <button className={styles.taskItemDelete} onClick={handlerDeleteTask} value={i}>
                  <Trash/>
                </button>
              </div>
            );
          })
        }
      </main>
    </div>
  );
}