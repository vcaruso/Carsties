/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        domains: [
            'cdn.pixabay.com',
            'www.google.com',
            'azzurracenter.it'
        ]
    }

}

module.exports = nextConfig
