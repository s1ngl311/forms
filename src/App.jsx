import { useRef, useState } from 'react'
import './App.module.css'
import styles from './App.module.css'

export const App = () => {
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState(null)
	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState(null)
	const [againPassword, setAgainPassword] = useState('')
	const [againPasswordError, setAgainPasswordError] = useState(null)

	const submitButtonRef = useRef(null)

	const onEmailChange = ({ target }) => {
		setEmail(target.value)
	}

	const onEmailBlur = ({ target }) => {
		let error = null

		if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value)) {
			error =
				'Неверная форма почты или используются недопустимые символы. Пример: pochta123@pochta.pochta'
		}

		setEmailError(error)
	}

	const onPasswordChange = ({ target }) => {
		setPassword(target.value)

		let error = null

		if (!/^[\w_]*$/.test(target.value)) {
			error = 'Нельзя поставить данный пароль. Допустимые символы - буквы, цифрыи "_"'
		}

		setPasswordError(error)
	}

	const onAgainPasswordChange = ({ target }) => {
		setAgainPassword(target.value)
	}

	const onAgainPasswordBlur = () => {
		let error = null

		if (againPassword !== password) {
			error = 'Пароли не совпадают'
		} else {
			submitButtonRef.current.focus()
		}

		console.log(password, againPassword)
		setAgainPasswordError(error)
	}

	const onSubmit = (event) => {
		event.preventDefault()
		console.log(email, password, againPassword)
		setEmail('')
		setPassword('')
		setAgainPassword('')
	}

	return (
		<>
			<div className={styles.app}>
				<form className={styles.form} onSubmit={onSubmit}>
					<input
						className={styles.input}
						type="email"
						name="email"
						value={email}
						placeholder="Почта"
						onChange={onEmailChange}
						onBlur={onEmailBlur}
					/>
					<div className={styles.errorLabel}>{emailError}</div>
					<input
						className={styles.input}
						type="password"
						name="password.enter"
						value={password}
						placeholder="Пароль"
						onChange={onPasswordChange}
					/>
					<div className={styles.errorLabel}>{passwordError}</div>
					<input
						className={styles.input}
						type="password"
						name="password.confirm"
						value={againPassword}
						placeholder="повторите пароль"
						onChange={onAgainPasswordChange}
						onBlur={onAgainPasswordBlur}
					/>
					<div className={styles.errorLabel}>{againPasswordError}</div>
					<button
						className={styles.button}
						ref={submitButtonRef}
						type="submit"
						disabled={
							emailError !== null ||
							passwordError !== null ||
							againPasswordError !== null
						}
					>
						Зарегестрироваться
					</button>
				</form>
			</div>
		</>
	)
}
