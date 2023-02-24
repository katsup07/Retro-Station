import AddPostForm from "../../components/AddPostForm";
import classes from './index.module.css';

const AddNewEventPage = () => {
	return (
		<>
			<h1 className={classes.header}>Add Event</h1>
			<AddPostForm />
		</>
	);
};

export default AddNewEventPage;
