import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Login } from "../components/Login";
import * as s from "../components/styles/Login.styles"
import { useLoginPopUpStore } from "../components/store/Store";


function PopUp() {
  const [idState, setIdState] = useState('')
  const [passwordState, setPasswordState] = useState('')
  const { setPopUpState, popUpState } = useLoginPopUpStore((state) => ({ setPopUpState: state.setPopUpState, popUpState: state.popUpState }))

  const idChange = (e) => {
    setIdState(e.target.value)
  }
  const passwordChange = (e) => {
    setPasswordState(e.target.value)
  }

  const loginHandled = () => {
    const id = idState
    const password = passwordState
    Login({ id, password })
    setPopUpState()
  };


  return (
    <>
      <Modal show={popUpState} className="container bg-white border border-gray-300 shadow-xl rounded-lg">
        <Modal.Body>
          <s.start_div>
            <div className="mb-4">
              <s.close_button type="button" className='float-right'>
                <svg class="h-6 w-6" onClick={setPopUpState} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </s.close_button>
              <div className="float-left">
                <p className="text-2xl font-extrabold">로그인</p>
                <p className="text-base text-gray"> 합리적인 가격의 다양한 집을 확인하세요.</p>
              </div>
            </div>
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">

              <div>
                <s.label for="id">email</s.label>
                <div class="mt-2">
                  <s.input_text required="" type="text" placeholder="아이디" onChange={idChange} value={idState} />
                </div>
              </div>

              <div>
                <div class="mt-2 flex items-center justify-between">
                  <s.label for="password">Password</s.label>
                  <div class="text-sm">
                    <s.forget_password href="#">Forgot password?</s.forget_password>
                  </div>
                </div>
                <div class="mt-2">
                  <s.input_text type="password" placeholder="비밀번호" onChange={passwordChange} value={passwordState} />
                </div>
              </div>

              <div>
                <s.fetch_button type="submit" onClick={loginHandled} className="">
                  로그인 하기
                </s.fetch_button>
              </div>
            </div>
          </s.start_div>
        </Modal.Body>
      </Modal >

    </>
  );
}

function LoginPage() {
  const popUp = usePopUpStore((state) => state.setPopUpState)
  const popUpState = usePopUpStore((state) => state.popUpState)
  return (
    <div>
      <button onClick={popUp}>Login</button>
      {popUpState &&
        <PopUp></PopUp>}

    </div>
  )
}

export default LoginPage