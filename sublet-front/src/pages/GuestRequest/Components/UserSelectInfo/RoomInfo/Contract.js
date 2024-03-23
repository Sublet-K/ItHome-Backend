import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { roomOptionsStore } from "@pages/GuestRequest/store/RoomOptionsStore";


export function Contract() {
    const contract = '';

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
                임대 종류
            </InputLabel>
            <Select
                name={'contract'}
                value={contract}
                label="contract"
                onChange={requestHandle}>
                <MenuItem value={'borrow'}>매물</MenuItem>
                <MenuItem value={'get'}>분양</MenuItem>
            </Select>
        </FormControl>
    );
};