import Link from 'next/link';
import { withBasePath } from '../lib/basePath';

export default function Navigation() {
  return (
    <nav className="bg-aws-dark text-white sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div style={{
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo Area */}
          <Link
            href={withBasePath('/')}
            className="nav-logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'opacity 0.3s ease',
              textDecoration: 'none',
              color: 'white'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="bg-aws-orange rounded font-bold text-lg" style={{
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
              }}>
                AWS
              </div>
              <span className="text-xl font-semibold">Claude Code Blog</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link
              href={withBasePath('/')}
              className="nav-link"
            >
              Home
            </Link>
            <Link
              href={withBasePath('/posts')}
              className="nav-link"
            >
              Posts
            </Link>
            <Link
              href={withBasePath('/about')}
              className="nav-link"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
