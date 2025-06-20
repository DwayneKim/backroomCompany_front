import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ALLOWED_IPS = [
    '121.165.94.138'
]

export function middleware(request: NextRequest) {
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor?.split(',')[0].trim() || 'unknown'

    const isAllowed = ALLOWED_IPS.includes(clientIp)

    if (!isAllowed) {
        return new NextResponse('403 Forbidden: 내부 IP만 접근 가능합니다.', { status: 403 })
    }

    return NextResponse.next()
}