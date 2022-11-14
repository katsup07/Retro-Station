import Link from 'next/link'
import classes from './BaseButton.module.css';

const BaseButton = ({ type = 'button', destination = '/1980s', text, children, onClick }) => {
  console.log('destination: ', destination)
  function getJsxContent(){
    if(type === 'link'){
      return (<div className={classes.btn}>
			<Link href={destination}>{text || children }</Link>
		</div>)
    }
    // else
    return (
      <div className={classes.btn}>
       <button onClick = {onClick}>{text || children }</button>
     </div>
   );
    }

    return getJsxContent();
  }

export default BaseButton;
