/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: [
        //     'raw.githubusercontent.com',
        //     'opengraph.githubassets.com'
        // ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'opengraph.githubassets.com',
            },
        ],
    },
};

export default nextConfig;
