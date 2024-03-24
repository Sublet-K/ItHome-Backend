import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { roomOptionsStore } from 'pages/GuestRequest/store/RoomOptionsStore';


export function NumberBedroom() {
	const number_bedroom = '';

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
				침실 개수
			</InputLabel>
			<Select
				name={'number_bedroom'}
				value={number_bedroom}
				label="number_bedroom"
				onChange={requestHandle}>
				<MenuItem value={'one'}>1개</MenuItem>
				<MenuItem value={'two'}>2개</MenuItem>
			</Select>
		</FormControl>
	);
};