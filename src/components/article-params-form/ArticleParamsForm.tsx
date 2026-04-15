// src/components/article-params-form/ArticleParamsForm.tsx
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text/Text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: containerRef,
		onChange: setIsSidebarOpen,
	});

	// Состояние шрифты
	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	// Состояние размера шрифта
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	// Состояние цвета шрифта
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);

	// Сщстояние цвета фона
	const [bgColor, setBgColor] = useState(defaultArticleState.backgroundColor);

	// Состояние размера фона
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	// Обработчик изменения шрифта
	const handleFontFamilyChange = (option: OptionType) => {
		setFontFamily(option);
	};
	// Обработчик размера шрифта
	const handleFontSizeChange = (option: OptionType) => {
		setFontSize(option);
	};
	// Обработчик размера фона
	const handleContentWidthChange = (option: OptionType) => {
		setContentWidth(option);
	};
	// Обработчик изменения цвета шрифта
	const handleFontColorChange = (option: OptionType) => {
		setFontColor(option);
	};
	// Обработчик цвета фона
	const handleBackgroundColorChange = (option: OptionType) => {
		setBgColor(option);
	};

	// Сброс к значению по умолчанию
	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		props.onApply(defaultArticleState);
	};

	// Применение стилей к странице
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Создаем объект с текущим состоянием
		const currentState = {
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		};
		// Вызываем функцию из пропсов и передаем в нее текущее состояние
		props.onApply(currentState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			<aside
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={bgColor}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
