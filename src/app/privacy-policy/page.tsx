// app/privacy-policy/page.tsx
export default function PrivacyPolicyPage() {
    return (
        <main className="max-w-3xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="mb-4">
                Last updated: {new Date().toLocaleDateString()}
            </p>

            <p className="mb-4">
                Welcome to <strong>Leeds AI Social</strong>. This Privacy Policy explains how we collect,
                use, and protect your information when you use our website and app.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
            <p className="mb-4">
                We may collect information you provide directly (like your name, email, and login data)
                and information automatically through cookies and analytics tools.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
            <p className="mb-4">
                We use your information to provide, maintain, and improve our services, including
                authentication via Facebook or other providers.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
            <p className="mb-4">
                We do not sell your personal data. We may share limited information with third-party
                providers (like Meta or Supabase) for authentication and hosting services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Retention and Deletion</h2>
            <p className="mb-4">
                You can request deletion of your account and related data at any time by contacting
                us at <a href="mailto:nyangjeremy@gmail.com" className="text-blue-600 underline">
                    nyangjeremy@gmail.com
                </a>.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                <a href="mailto:nyangjeremy@gmail.com" className="text-blue-600 underline">
                    nyangjeremy@gmail.com
                </a>
            </p>
        </main>
    );
}
