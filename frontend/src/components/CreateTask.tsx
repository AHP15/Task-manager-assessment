import { useState } from 'react';
import Input from './Input';
import { useDispatch } from '../context';
import request, { Response } from '../request';
import Loading from './Loading';
import { ADD_TASK } from '../context/actions';
import styles from '../styles/Form.module.css';

const CreateTask = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        error: '',
    });
    const [error, setError] = useState({
        title: '',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
            error: ''
        }));

        setError(prev => ({
            ...prev,
            [event.target.name]: ''
        }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        let isInvalid = false
        if (!task.title) {
            setError(prev => ({ ...prev, title: "title can't be empty" }));
            isInvalid = true;
        }
        if (!task.description) {
            setError(prev => ({ ...prev, description: "description can't be empty" }));
            isInvalid = true;
        }

        if (isInvalid) return;

        setLoading(true);

        const response: Response = await request(
            '/task',
            {
                method: 'post',
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.success) {
            dispatch({ type: ADD_TASK, payload: response.data });
        } else {
            setTask(prev => ({
                ...prev,
                error: response.error
            }))
        }

        setLoading(false);
        setTask({
            title: '',
            description: '',
            error: '',
        });

    }

    if (loading) return <Loading />

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Task</h2>
            {task.error && <p title='error' className={styles.serverError}>{task.error}</p>}
            <Input
                options={{
                    type: 'text',
                    name: 'title',
                    placeholder: 'Type title',
                    value: task.title,
                    onChange: handleChange
                }}
                error={error.title}
            />
            <Input
                options={{
                    type: 'text',
                    name: 'description',
                    placeholder: 'Type description',
                    value: task.description,
                    onChange: handleChange
                }}
                error={error.description}
            />
            <button className={styles.btn} type="submit">Create Task</button>
        </form>
    );
}

export default CreateTask;
