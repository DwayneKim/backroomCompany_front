'use client'
import {useState} from "react";
import {router} from "next/client";
import {login} from "@/app/api/v1/login/login";


const LoginPage = () => {

    const [password, setPassword] = useState('')
    const [id, setId] = useState('')

    const handleLogin = async () => {
        console.log(id)
        console.log(password)
        try {
            const data = await login(id, password);

            // 쿠키 저장 (키-값 형태로)
            document.cookie = `access_token=${data.data.content.accessToken}; path=/`;

            // 메인 페이지 이동
            router.push('/');
        } catch (e) {
            console.error('로그인 실패', e);
            alert('로그인 실패');
        }
    }


    return (
        <div>
            <main>
                <div style={{ padding: 20 }}>
                    <h1>로그인</h1>
                    <input
                        type="id"
                        placeholder="아이디 입력"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>로그인</button>
                </div>
            </main>
        </div>
    );
}

export default LoginPage;