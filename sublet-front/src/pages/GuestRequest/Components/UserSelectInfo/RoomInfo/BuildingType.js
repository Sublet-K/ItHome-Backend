import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { roomOptionsStore } from "@pages/GuestRequest/store/RoomOptionsStore";

export function BuildingType() {
	const building_type = '';

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
				건물 유형
			</InputLabel>
			<Select
				name={'building_type'}
				value={building_type}
				label="building_type"
				onChange={requestHandle}>
				<MenuItem value={'oneRoom'}>원룸</MenuItem>
				<MenuItem value={'twoThree_Room'}>투-쓰리룸</MenuItem>
				<MenuItem value={'office'}>오피스텔</MenuItem>
				<MenuItem value={'apartment'}>아파트</MenuItem>
			</Select>
		</FormControl>
	);
};