import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react'

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	let isFirstSlide = activeIndex === 0;
	let isLastSlide = activeIndex === steps.length - 1;

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала

	const goToNextSlide = () => {
		if (!isLastSlide) {
			setActiveIndex(activeIndex + 1);
		}
	}
	const goToPreviousSlide = () => {
		if (!isFirstSlide) {
			setActiveIndex(activeIndex - 1);
		}
	}

	const startAgain = () => {
		setActiveIndex(0);
	}
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex]['content']}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map(({ id, title }, index) =>
							<li key={id} className={styles['steps-item'] + (index <= activeIndex ? ' ' + styles.done : '') + (index === activeIndex ? ' ' + styles.active : '')}>
								<button className={styles['steps-item-button']} onClick={() => { setActiveIndex(index) }}>{index + 1}</button>
								{title}
							</li>
						)}

					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={goToPreviousSlide} disabled={isFirstSlide}>Назад</button>
						{!isLastSlide ? <button className={styles.button} onClick={goToNextSlide}>
							Далее
						</button> :
							<button className={styles.button} onClick={startAgain}>
								Начать сначала
							</button>}

					</div>
				</div>
			</div>
		</div>
	);
};
