import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_IPS = ['121.165.94.37', '72.14.201.174']

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const isLocal = request.headers.get('host')?.startsWith('localhost')
    const token = request.cookies.get('access_token')?.value // 로그인 쿠키

    // 1. /login 페이지는 누구나 접근 가능
    if (pathname === '/login') {
        return NextResponse.next()
    }

    // 2. 로컬은 무조건 허용
    if (isLocal) {
        return NextResponse.next()
    }

    // 3. 로그인되어 있으면 IP 무시하고 허용
    if (token) {
        return NextResponse.next()
    }

    if (
        pathname.startsWith('/_next') || // 정적 파일
        pathname.startsWith('/api') ||   // API 요청
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next()
    }

    // 4. IP 확인
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor?.split(',')[0].trim() || 'unknown'

    const isAllowed = ALLOWED_IPS.includes(clientIp)

    if (!isAllowed) {
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}