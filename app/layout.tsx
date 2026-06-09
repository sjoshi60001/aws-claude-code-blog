import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: "AWS Claude Code Blog",
  description: "A blog about building AI-powered applications with Claude Code on AWS",
  keywords: ["AWS", "Claude Code", "AI", "Machine Learning", "Bedrock", "Development"],
  authors: [{ name: "AWS Workshop" }],
  openGraph: {
    title: "AWS Claude Code Blog",
    description: "Learn to build AI-powered applications with Claude Code on AWS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* AWS Theme Variables - Inline to bypass MIME type issues with CloudFront proxy */
            :root {
              --aws-orange: #FF9900;
              --aws-dark: #232F3E;
              --aws-blue: #146EB4;
              --aws-light-gray: #F2F3F3;
              --aws-dark-gray: #545B64;
            }

            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              font-family: ui-sans-serif, system-ui, sans-serif;
              background: #ffffff;
              color: #232F3E;
              line-height: 1.6;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
            }

            .bg-aws-orange { background-color: var(--aws-orange); }
            .bg-aws-dark { background-color: var(--aws-dark); }
            .bg-aws-blue { background-color: var(--aws-blue); }
            .text-white { color: white; }
            .text-aws-dark-gray { color: var(--aws-dark-gray); }
            .text-aws-light-gray { color: var(--aws-light-gray); }

            .container { max-width: 1200px; margin: 0 auto; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .px-12 { padding-left: 3rem; padding-right: 3rem; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
            .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
            .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
            .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
            .p-12 { padding: 3rem; }
            .mb-16 { margin-bottom: 4rem; }
            .mb-8 { margin-bottom: 2rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mt-auto { margin-top: auto; }

            .text-center { text-align: center; }
            .text-6xl { font-size: 3.75rem; line-height: 1; }
            .text-5xl { font-size: 3rem; line-height: 1; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }

            .rounded-lg { border-radius: 0.5rem; }
            .rounded-2xl { border-radius: 1rem; }
            .rounded-3xl { border-radius: 1.5rem; }
            .flex-1 { flex: 1 1 0%; }
            .inline-block { display: inline-block; }
            .no-underline { text-decoration: none; }
            .max-w-4xl { max-width: 56rem; }

            /* Button and link styles */
            a {
              text-decoration: none;
            }

            button, a.btn {
              cursor: pointer;
              border: none;
              transition: all 0.3s ease;
              display: inline-block;
            }

            .bg-aws-dark:hover {
              background-color: var(--aws-blue);
            }

            /* Fade-in animation */
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fadeIn {
              animation: fadeIn 0.8s ease-out forwards;
            }

            .animation-delay-200 {
              animation-delay: 0.2s;
              opacity: 0;
            }

            /* Button hover effects */
            .btn.bg-aws-dark {
              transition: all 0.3s ease;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .btn.bg-aws-dark:hover {
              background-color: #146EB4;
              transform: translateY(-2px);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }

            /* Navigation styles */
            .sticky { position: sticky; }
            .top-0 { top: 0; }
            .z-50 { z-index: 50; }

            nav {
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .nav-logo:hover {
              opacity: 0.8;
            }

            .nav-link {
              font-size: 1rem;
              font-weight: 500;
              color: white;
              text-decoration: none;
              transition: color 0.3s ease;
              position: relative;
              padding-bottom: 4px;
            }

            .nav-link:hover {
              color: var(--aws-orange);
            }

            .nav-link::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 0;
              height: 2px;
              background-color: var(--aws-orange);
              transition: width 0.3s ease;
            }

            .nav-link:hover::after {
              width: 100%;
            }

            /* Responsive design */
            @media (max-width: 768px) {
              .text-6xl { font-size: 2.5rem; }
              .text-5xl { font-size: 2rem; line-height: 1.2; }
              .text-4xl { font-size: 1.875rem; }
              .text-xl { font-size: 1.125rem; line-height: 1.6; }

              /* Hero section mobile adjustments */
              .py-20 { padding-top: 3rem; padding-bottom: 3rem; }
              .px-8 { padding-left: 1.5rem; padding-right: 1.5rem; }
              .px-6 { padding-left: 1rem; padding-right: 1rem; }
              .mb-8 { margin-bottom: 1.5rem; }
              .mb-6 { margin-bottom: 1rem; }

              /* Navigation mobile adjustments */
              .nav-link {
                font-size: 0.875rem;
              }
            }
          `
        }} />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-aws-dark text-aws-light-gray py-6 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              Built with Claude Code on AWS | Workshop Exercise
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
