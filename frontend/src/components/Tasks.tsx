import { useState } from 'react';
import { useAppContext, useDispatch } from '../context';
import styles from '../styles/Home.module.css';
import Updatetask from './Updatetask';
import request, { Response } from '../request';
import { DELETE_TASK } from '../context/actions';

const TaskRow = (
    { id, title, decsription, status }
        : { id: string, title: string, decsription: string, status: string }
) => {

    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleClick = async () => {
        setLoading(true);
        const response: Response = await request(
            '/task',
            {
                method: 'delete',
                body: JSON.stringify({ taskId: id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.success) {
            dispatch({ type: DELETE_TASK, payload: response.data });
            close();
        } else {
            // handle error
        }
        setLoading(false);
    }

    return (
        <div className={styles.taskRow} style={{ filter: loading ? 'blur(5px)' : '' }}>
            <h3>{title}</h3>
            <p>{decsription}</p>
            <p className={styles.status}>status: {status}</p>

            <button onClick={() => setUpdate(prev => !prev)} className={styles.updateBtn}>
                {!update ? 'Update' : 'hide update'}
            </button>
            <button onClick={handleClick} className={styles.deleteBtn}>Delete</button>
            {update && <Updatetask taskId={id} close={() => setUpdate(false)} />}
        </div>
    );
};

const Tasks = () => {
    const state = useAppContext();

    return (
        <div className={styles.tasks}>
            <h2>My Tasks</h2>
            {state.tasks.length === 0 && <p>No Task create.</p>}
            {state.tasks.map(task => (
                <TaskRow
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    decsription={task.description}
                    status={task.status}
                />
            ))}
        </div>
    );
};

export default Tasks;
