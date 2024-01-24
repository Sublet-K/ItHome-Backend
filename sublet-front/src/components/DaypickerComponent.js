import React, { useState, useRef } from 'react';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IconButton } from '@mui/material';
import 'dayjs/locale/ko';


const DaypickerComponent = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const [searchDate, setSearchDate] = useState([null, null]); // [start, end]
  const buttonRef = useRef(null);

  const styles = {
    calandersContainer: {
      justifyContent: 'center',
      textAlign: 'center'
    },
    serachByDate: {
      fontWeight: 'bold',
      color: 'rgba(0, 0, 0, 1)',
    },
    calanderStyle: {
      backgroundColor: 'white',
      border: '1px solid black',
      position: 'absolute',
      top: `${buttonRef.current ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight : 0}px`,
      left: `${buttonRef.current ? buttonRef.current.offsetLeft : 0}px`,
      zIndex: 101
    },
  };

  const toggleCalander = () => {
    setIsListVisible(true);
  };

  if (isListVisible) {
    /* range로 해야하는데 계속 깨져서, 이걸로 임시 대체 합니다. */
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <div style={styles.calandersContainer}>
          <div>
            <DatePicker
              value={searchDate[0]}
              onChange={(newDate) => {
                setSearchDate([newDate, searchDate[1]]);
                console.log(searchDate);
              }}
            />
          </div>
          ~
          <div>
            <DatePicker
              value={searchDate[1]}
              onChange={(newDate) => {
                setSearchDate([searchDate[0], newDate]);
                console.log(searchDate);
              }}
            />
          </div>
        </div>
      </LocalizationProvider>
    );
  }
  else {
    return (
      <button ref={buttonRef} onClick={toggleCalander}>
        <div style={styles.serachByDate}>
          날짜
          <DateRangeOutlinedIcon />
        </div>
      </button>
    );
  }
}
export default DaypickerComponent;
