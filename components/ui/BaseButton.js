import classes from './BaseButton.module.css';

const BaseButton = ({ text, children, onClick }) => {
	return (
		<div className={classes.btn}>
			<button onClick = {onClick}>{text || children }</button>
		</div>
	);
};

export default BaseButton;
