import React, { useState } from 'react';
import Editor, { Value } from '@anylate/editor';
import { theme } from '@anylate/themes';
import '@anylate/themes/lib/index.css';
import { cx } from 'emotion';
import value from './value.json';

const initialValue = Value.fromJSON(value);
const Register = () => {
	const [ currentTheme, setTheme ] = useState(theme.base);
	return (
		<div>
			<button
				onClick={() => {
					setTheme(theme.dark);
				}}
			>
				dark
			</button>
			<button
				onClick={() => {
					setTheme(theme.light);
				}}
			>
				light
			</button>
			<Editor
				className={cx(theme.base, currentTheme)}
				placeholder="Write the code , change the world..."
				defaultValue={initialValue}
			/>
		</div>
	);
};
export default Register;
