import { useState } from 'react';

import { Task, useAppContext, useDispatch } from '../context';
import styles from '../styles/Home.module.css';
import Input from './Input';
import Loading from './Loading';
import request, { Response } from '../request';
import { UPDATE_TASK } from '../context/actions';

const Updatetask = ({ taskId, close }: { taskId: string, close: () => void }) => {
    const state = useAppContext();
    const [task, setTask] = useState(
        (): Task => state.tasks.find(task => task._id === taskId) as Task
    );
    const [invalid, setInvalid] = useState({
        title: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTask(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
            error: ''
        }));

        setInvalid(prev => ({
            ...prev,
            [event.target.name]: ''
        }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let isInvalid = false
        if (!task.title) {
            setInvalid(prev => ({ ...prev, title: "title can't be empty" }));
            isInvalid = true;
        }
        if (!task.description) {
            setInvalid(prev => ({ ...prev, description: "description can't be empty" }));
            isInvalid = true;
        }

        if (isInvalid) return;

        setLoading(true);

        const response: Response = await request(
            '/task',
            {
                method: 'put',
                body: JSON.stringify({
                    taskId,
                    updatedTask: {
                        title: task.title,
                        description: task.description,
                        status: task.status
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.success) {
            dispatch({ type: UPDATE_TASK, payload: response.data });
            close();
        } else {
            setError(response.error)
        }

        setLoading(false);
    }

    if (loading) return <Loading />

    return (
        <form className={styles.updateForm} onSubmit={handleSubmit}>
            {error && <p className={styles.serverError}>{error}</p>}
            <Input
                options={{
                    type: 'text',
                    name: 'title',
                    placeholder: 'Type title',
                    value: task.title,
                    onChange: handleChange
                }}
                error={invalid.title}
            />

            <Input
                options={{
                    type: 'text',
                    name: 'description',
                    placeholder: 'Type description',
                    value: task.description,
                    onChange: handleChange
                }}
                error={invalid.description}
            />

            <label className={styles.selectLabel}>
                Select an option:
                <select
                    name='status'
                    className={styles.selectStatus}
                    value={task.status}
                    onChange={handleChange}
                >
                    <option value="pending">pending</option>
                    <option value="completed">completed</option>
                </select>
            </label>

            <button className={styles.submitUpdate} type="submit">Update</button>
        </form >
    );
};

export default Updatetask;