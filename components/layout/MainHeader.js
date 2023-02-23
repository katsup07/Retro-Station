import Link from 'next/link';
import BaseButton from '../ui/BaseButton';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import classes from './MainHeader.module.css';

const MainHeader = () => {
	const router = useRouter();
	const isAuth = useSelector((state) => state.authReducer.isAuth);
	const username = useSelector((state) => state.authReducer.username);
 console.log('router.query.decadeId: ', router.query.decadeId);
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
					{router.pathname !== '/auth' && <BaseButton
							onClick={() => router.push('/auth')}
              >
							{isAuth ? `Logout - ${username}` : `Login`}
						</BaseButton>}
					</li>
				{ isAuth && <li className={classes.auth}>
						<BaseButton
							onClick={() => router.push('/userPage')}
							className={router.pathname === '/auth' ? 'active' : ''}>
							Editor
						</BaseButton>
					</li>}
					<div className={classes.decades}>
						<li>
							<Link
								href='/decades/1960s'
								className={router.query.decadeId === '1960s' ? 'active' : ''}>
								1960s
							</Link>
						</li>
						<li>
							<Link
								href='/decades/1970s'
								className={router.query.decadeId === '1970s' ? 'active' : ''}>
								1970s
							</Link>
						</li>
						<li>
							<Link
								href='/decades/1980s'
								className={router.query.decadeId === '1980s' ? 'active' : ''}>
								1980s
							</Link>
						</li>
						<li>
							<Link
								href='/decades/1990s'
								className={router.query.decadeId === '1990s' ? 'active' : ''}>
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
