import styles from '../styles/Form.module.css';

type Options = {
    type: string,
    name: string,
    placeholder: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

const Input = ({ options, error }: { options: Options, error: string }) => {
    return (
        <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>{options.name}</label>
            <input className={styles.input} {...options} />
            <p className={styles.inputError}>{error}</p>
        </div>
    );
}

export default Input;
