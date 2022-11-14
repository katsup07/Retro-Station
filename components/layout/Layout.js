import MainHeader from './MainHeader';
import classes from './Layout.module.css';

const MainLayout = ({ children }) => {
	return (
		<>
			<MainHeader />
			<div className={classes.layout}>{children}</div>
		</>
	);
};

export default MainLayout;
