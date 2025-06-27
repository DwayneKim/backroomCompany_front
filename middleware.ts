import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_IPS = [
    '121.165.94.37',
]

export function middleware(request: NextRequest) {
    const isLocal = request.headers.get('host')?.startsWith('localhost')

    if (isLocal) {
        return NextResponse.next() // 로컬에서 온 요청은 무조건 통과
    }
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor?.split(',')[0].trim() || 'unknown'

    const isAllowed = ALLOWED_IPS.includes(clientIp)

    if (!isAllowed) {
        return new NextResponse('접근 권한이 없습니다', { status: 403 })
    }

    return NextResponse.next()
}