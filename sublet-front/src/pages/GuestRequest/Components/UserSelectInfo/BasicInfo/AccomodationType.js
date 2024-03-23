import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { roomOptionsStore } from "@pages/GuestRequest/store/RoomOptionsStore";


export function AccomodationType() {
	const accomodation_type = '';

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
				숙박 유형
			</InputLabel>
			<Select
				name={'accomodation_type'}
				value={accomodation_type}
				label="Accomodation Type"
				onChange={requestHandle}>
				<MenuItem value={'short'}>단기</MenuItem>
				<MenuItem value={'medium'}>중기</MenuItem>
				<MenuItem value={'long'}>장기</MenuItem>
			</Select>
		</FormControl>
	)
};