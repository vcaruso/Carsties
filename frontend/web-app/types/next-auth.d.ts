import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            username: string
        } & DefaultSession['user']
    }

    interface Profile {
        username: stirng
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        username: string,
        access_token?: string
    }
}