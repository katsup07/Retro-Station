import Link from 'next/link';
import classes from './404.module.css';

const NotFound = () => {
	return (
		<div className={classes.notFound}>
			<h2>Page not found.</h2> <Link href='/'>Home page</Link>
		</div>
	);
};

export default NotFound;
