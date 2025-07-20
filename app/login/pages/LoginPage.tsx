'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/app/api/v1/login/login';
import '../css/LoginPage.css';

export default function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        if (!id || !password) {
            alert('아이디와 비밀번호를 입력하세요.');
            return;
        }

        try {
            const response = await login(id, password);
            const { accessToken } = response.data.content;

            document.cookie = `access_token=${accessToken}; path=/`;
            router.push('/');
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인 실패. 다시 시도해주세요.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">로그인</h1>
                <input
                    type="text"
                    placeholder="아이디 입력"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button onClick={handleLogin} className="login-button">
                    로그인
                </button>
            </div>
        </div>
    );
}