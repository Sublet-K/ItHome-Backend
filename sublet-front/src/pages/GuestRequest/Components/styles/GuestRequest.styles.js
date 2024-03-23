import styled from 'styled-components';
import tw from 'twin.macro';

export const GuestType = styled.button`
${tw`inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm ring-1 ring-inset ring-black hover:bg-gray-50`}
`;

export const GuestType_Arrow = styled.svg`
${tw`-mr-1 h-5 w-5 text-black`}
`;

export const Checkbox_additional = styled.input`
${tw`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}`;

export const additional_text = styled.label`
${tw`ms-2 text-base font-medium font-semibold text-gray-900 dark:text-gray-300`}
`;

export const alarm_text = styled.input`
${tw`w-px h-0.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
`;
export const confilrmButton = styled.button`
${tw`text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-extrabold rounded-lg text-lg px-10 py-2.5 me-2 ml-4 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700`}
`;

export const GuestRequestDetail = styled.div`
	display: flex;
	flexWrap: wrap;
	flexDirection: column;
	margin: 0 2px 0 0;
`;

export const GuestRequestMap = styled.div`
	aspectRatio: 1 / 1;
`

export const UserInfoContainer = styled.div`
	display: flex;
	flexDirection: row;
	width: 100%;
	margin: 0 0 1em 0;
	justifyContent: space-around;
	alignItems: center;
	border: 2px solid #000000;
	borderRadius: 10px;
	padding: 0.2em;
	fontSize: 1.3em;
`

export const UserInfoContainer2 = styled.div`
	width: 25em;
	position: relative;
	display: flex;
	justifyContent: start;
	alignItems: center;
	margin: 0 0 1em 0;
`

export const DetailTitle = styled.p`
	fontWeight: bold;
	color: rgba(0, 0, 0, 1);
	margin: 0.5em 0;
	font: extrabold;
	fontSize: 1.5rem;
`

export const GuestRequestmap = styled.div`
	aspectRatio: 1 / 1;
`

const GuestRequeststyles = () => {
	const styles = {
		BigContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignTiems: 'center',
			flexDirection: 'column',
			margin: '1em 15em 0 15em',
		},
		GuestRequest_RequestContainer: {
			display: 'flex',
			flexDirection: 'column',
		},
		logoContainer: {
			display: 'flex',
			flex: 1,
		},
		logoIcon: {
			width: '4em',
			height: '100%',
			color: 'rgba(0, 0, 0, 1)',
			justifyContent: 'left',
		},
		GuestRequest_Content: {
			margin: '2em 0 0 0',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		RequestBox: {
			flexDirection: 'colum',
			justifyContent: 'start',
		},
		Requestselect: {

		},
		RequestLocation: {
			fontWeight: 'bold',
			color: 'rgba(0, 0, 0, 1)',
		},

		RequestminiBox1: {

			margin: '0 0.5em 0 0',
			border: '2px solid #000000',
			borderRadius: '10px',
			padding: '0.5em',
			fontSize: '1.3em',
			fontWeight: 'bold',
			color: 'rgba(0, 0, 0, 1)',
		},
		RequestminiBox2: {

			margin: '0 0 0 0',
			border: '2px solid #000000',
			borderRadius: '10px',
			padding: '0.7em',
			fontSize: '1.3em',
			fontWeight: 'bold',
			color: 'rgba(0, 0, 0, 1)',
		},
		GuestRequest_map_img: {

			borderRadius: '15px',
			objectfit: 'cover',
		},
	};
	return styles;
};

export default GuestRequeststyles;
