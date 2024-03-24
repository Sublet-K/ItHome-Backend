import { FetchRequestPost } from '@shared/components/FetchList/FetchList';
import { roomOptionsStore } from 'pages/GuestRequest/store/RoomOptionsStore';

import * as s from '../styles/GuestRequest.styles';



export function ComfilrmButton() {
	const { roomOptions } = roomOptionsStore.getState();

	return (
		<div className="mt-4">
			<s.confilrmButton onClick={() => FetchRequestPost(roomOptions)}>
				확인하기
			</s.confilrmButton>
		</div>
	);
};