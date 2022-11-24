import Link from 'next/link';
import BaseButton from '../ui/BaseButton';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import classes from './MainHeader.module.css';

const MainHeader = () => {
	const router = useRouter();
	const isAuth = useSelector((state) => state.authReducer.isAuth);
	const username = useSelector((state) => state.authReducer.username);

	return (
		<header className={classes.header}>
			<nav className={classes.nav}>
				<ul>
					<li>
						<Link href='/' className={router.pathname === '/' ? 'active' : ''}>
							Retro Station
						</Link>
					</li>
					<li className={classes.auth}>
						<BaseButton
							onClick={() => router.push('/auth')}
							className={router.pathname === '/auth' ? 'active' : ''}>
							{isAuth ? `Logout - ${username}` : `Login`}
						</BaseButton>
					</li>
					<div className={classes.decades}>
						<li>
							<Link
								href='/1960s'
								className={router.pathname === '/1960s' ? 'active' : ''}>
								1960s
							</Link>
						</li>
						<li>
							<Link
								href='/1970s'
								className={router.pathname === '/1970s' ? 'active' : ''}>
								1970s
							</Link>
						</li>
						<li>
							<Link
								href='/1980s'
								className={router.pathname === '/1980s' ? 'active' : ''}>
								1980s
							</Link>
						</li>
						<li>
							<Link
								href='/1990s'
								className={router.pathname === '/1990s' ? 'active' : ''}>
								1990s
							</Link>
						</li>
					</div>
				</ul>
			</nav>
		</header>
	);
};

export default MainHeader;
