import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { roomOptionsStore } from 'pages/GuestRequest/store/RoomOptionsStore';


export function LimitPeople() {
	const limit_people = '';

	const requestHandle = e => {
		roomOptionsStore.setState(state => ({
			roomOptions: {
				...state.roomOptions,
				[e.target.name]: e.target.value, // 새로운 가격 값으로 업데이트
			}
		}));
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 170 }} size="small">
			<InputLabel id="demo-simple-select-label">
				인원수
			</InputLabel>
			<Select
				name={'limit_people'}
				value={limit_people}
				label="limit_people"
				onChange={requestHandle}>
				<MenuItem value={'one'}>1명</MenuItem>
				<MenuItem value={'two'}>2명</MenuItem>
				<MenuItem value={'three'}>3명</MenuItem>
				<MenuItem value={'four'}>4명</MenuItem>
				<MenuItem value={'five'}>5명</MenuItem>
			</Select>
		</FormControl>
	);
};