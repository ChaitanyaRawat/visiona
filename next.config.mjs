/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: ''
            },
            
        ],
        domains: ['img.clerk.com'],
    }

    
};

export default nextConfig;
