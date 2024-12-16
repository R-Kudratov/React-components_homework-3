import { useState } from 'react'
import data from './Calculator.buttons.json'
import styles from './Calculator.module.css'

export const Calculator = () => {
	const [result, setResult] = useState('')
	const [operator, setOperator] = useState('')
	const [operand1, setOperand1] = useState('')
	const [operand2, setOperand2] = useState('')

	const clear = () => {
		setOperand1('')
		setOperand2('')
		setOperator('')
	}

	const resetResult = () => {
		setResult('')
	}

	const onClick = (type, value) => {
		if (type === 'equal') {
			if (!operand2 || !operator) {
				setResult('Invalid operation')
				clear()
				return
			}
			const num1 = parseInt(operand1)
			const num2 = parseInt(operand2)
			let calcResult

			switch (operator) {
				case '+':
					calcResult = num1 + num2
					break
				case '-':
					calcResult = num1 - num2
					break
				default:
					clear()
					resetResult()
					return
			}
			clear()
			if (typeof calcResult === 'number') {
				setOperand1(calcResult)
			}
			setResult(calcResult)
		} else {
			resetResult()
			if (type === 'number') {
				if (operator) {
					setOperand2(operand2 + value)
				} else {
					setOperand1(operand1 + value)
				}
			} else if (type === 'operator') {
				setOperator(value)
			} else if (type === 'clear') {
				clear()
				resetResult()
			}
		}
	}
	const isResult = result !== ''
	const displayValue = isResult ? result : `${operand1}${operator}${operand2}`

	return (
		<div className={styles.calculator}>
			<div
				className={
					isResult
						? styles.result + ' ' + styles.display
						: styles.display
				}
			>
				{displayValue !== '' ? displayValue : '0'}
			</div>
			<div className={styles.buttons}>
				{data.map((button) => {
					const isTwoGrids = button.span === 2
					return (
						<button
							key={button.value}
							className={styles.btn + ' ' + styles[button.type]}
							onClick={() => onClick(button.type, button.value)}
							style={{
								gridColumn: isTwoGrids ? 'span 2' : 'auto',
							}}
						>
							{button.value}
						</button>
					)
				})}
			</div>
		</div>
	)
}
