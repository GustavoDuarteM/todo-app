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
  const doneTaskListCount = taskList.filter(task => task.isDone ).length
  
  function handlerChangeTaskStatus(event:  MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    const event_i:any = event.currentTarget.value;
    const newTaskList = taskList.map((task) => {
      if (task.id == event_i){ task.isDone = !task.isDone }
      return task
    })
    setTaskList(newTaskList);
  }
  
  function handlerDeleteTask(event:  MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    const event_id:string = event.currentTarget.value;
    const newTaskList = taskList.filter((task) => task.id != event_id)
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
          taskList.map((task)=>{
            return(
              <div className={styles.taskItem} key={task.id}>
                <button className={styles.taskItemSatus } onClick={handlerChangeTaskStatus} value={task.id}>
                    {
                      task.isDone ? 
                        (<Check  size={24} className={styles.checkCircle} /> ) : 
                        (<Circle size={24} className={styles.circle }/> )
                    }
                </button>
                <div className={styles.taskItemContent}>
                  <p className={task.isDone ? styles.taskItemContentDone : ''} >{task.content}</p>
                </div>
                <button className={styles.taskItemDelete} onClick={handlerDeleteTask} value={task.id}>
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