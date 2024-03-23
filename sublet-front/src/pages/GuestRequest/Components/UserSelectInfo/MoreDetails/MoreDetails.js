import * as s from '../../styles/GuestRequest.styles';
import GuestRequeststyles from "../../styles/GuestRequest.styles";

export function MoreDetails() {
	const styles = GuestRequeststyles();

	return (
		<div>
			<p style={styles.GuestRequest_DetailTitle}>추가 사항</p>

			<div>
				<s.Checkbox_additional type="checkbox" />
				<s.additional_text>요청 매물 알람 설정</s.additional_text>
			</div>
			<div>
				<s.Checkbox_additional type="checkbox" />
				<s.additional_text>
					완전 계약 인증된 매물만 보기
				</s.additional_text>
			</div>
		</div>
	);
};