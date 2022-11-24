import EditEventForm from '../../../components/EditEventForm';
import { useRouter } from 'next/router';

const EditEvent = () => {
  const router = useRouter();
  console.log("router.query.eventId: ", router.query.eventId);
  const eventId = router.query.eventId;
	return (
		<>
			<h2>Edit Event</h2>
			<EditEventForm eventId={eventId}/>
		</>
	);
};

export default EditEvent;
