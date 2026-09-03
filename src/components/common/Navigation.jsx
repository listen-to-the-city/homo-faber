'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import { useLanguage } from '@/hooks/useLanguage';
import LoginOverlay from '@/components/auth/LoginOverlay';
import * as S from '@/styles/common/navigation.style';

function isActive(pathname, href) {
  if (href === '/') {
    return pathname === '/' || pathname.startsWith('/home');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

const ARCHIVE_LINKS = [
  { href: '/interview', key: 'interview' },
  { href: '/word', key: 'word' },
  { href: '/info', key: 'info' },
];

function ProfileIcon() {
  return (
    <svg width="9" height="11" viewBox="0 0 9 11" fill="none" aria-hidden="true">
      <circle cx="4.5" cy="3" r="2.1" stroke="currentColor" strokeWidth="1" />
      <path
        d="M1.2 10c.5-2.1 2.1-3.3 3.3-3.3S7.8 7.9 8.3 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon({ open }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const archiveRef = useRef(null);
  const { isMobile } = useWindowSize();

  const isAdminRoute = pathname?.startsWith('/admin');
  const isArchiveActive = ARCHIVE_LINKS.some(({ href }) => isActive(pathname, href));
  const isLoginRoute = pathname === '/login';

  const closeLogin = useCallback(() => {
    setLoginOpen(false);
    if (pathname === '/login') {
      router.push('/');
    }
  }, [pathname, router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setArchiveOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (user) {
      setLoginOpen(false);
      return;
    }
    if (isLoginRoute) {
      setLoginOpen(true);
    }
  }, [isLoginRoute, user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (archiveRef.current && !archiveRef.current.contains(event.target)) {
        setArchiveOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isClient || isAdminRoute) {
    return null;
  }

  const handleProfileClick = () => {
    if (user) {
      router.push('/mypage');
      return;
    }
    setLoginOpen(true);
  };

  return (
    <>
      <S.HeaderBar opaque={pathname?.startsWith('/store')}>
        <S.HeaderLeft>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <S.Brand>Home Faber</S.Brand>
          </Link>

          <S.NavGroup>
            <Link href="/store" style={{ textDecoration: 'none', height: '100%' }}>
              <S.NavLink active={isActive(pathname, '/store')}>{t('nav.store')}</S.NavLink>
            </Link>
            <Link href="/fnq" style={{ textDecoration: 'none', height: '100%' }}>
              <S.NavLink active={isActive(pathname, '/fnq')}>{t('nav.fnq')}</S.NavLink>
            </Link>
            <S.ArchiveWrap ref={archiveRef}>
              <S.NavLink
                as="button"
                type="button"
                active={isArchiveActive}
                onClick={() => setArchiveOpen((open) => !open)}
                aria-expanded={archiveOpen}
              >
                {t('nav.archive')}
              </S.NavLink>
              {archiveOpen && (
                <S.ArchiveMenu>
                  {ARCHIVE_LINKS.map(({ href, key }) => (
                    <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                      <S.ArchiveItem active={isActive(pathname, href)}>{t(`nav.${key}`)}</S.ArchiveItem>
                    </Link>
                  ))}
                </S.ArchiveMenu>
              )}
            </S.ArchiveWrap>
          </S.NavGroup>
        </S.HeaderLeft>

        <S.HeaderRight>
          <S.LangButton type="button" onClick={toggleLanguage} aria-label="change language">
            {language === 'en' ? 'KO' : 'EN'}
          </S.LangButton>
          <S.IconButton
            type="button"
            aria-label={user ? t('nav.mypage') : t('nav.login')}
            onClick={handleProfileClick}
          >
            <ProfileIcon />
          </S.IconButton>
          <S.MenuToggle
            type="button"
            aria-label="menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <MenuIcon open={mobileOpen} />
          </S.MenuToggle>
        </S.HeaderRight>
      </S.HeaderBar>

      <S.MobilePanel isOpen={mobileOpen}>
        <Link href="/store" style={{ textDecoration: 'none' }}>
          <S.MobileLink active={isActive(pathname, '/store')}>{t('nav.store')}</S.MobileLink>
        </Link>
        <Link href="/fnq" style={{ textDecoration: 'none' }}>
          <S.MobileLink active={isActive(pathname, '/fnq')}>{t('nav.fnq')}</S.MobileLink>
        </Link>
        <S.MobileLink active={isArchiveActive}>{t('nav.archive')}</S.MobileLink>
        {ARCHIVE_LINKS.map(({ href, key }) => (
          <Link key={href} href={href} style={{ textDecoration: 'none' }}>
            <S.MobileSubLink active={isActive(pathname, href)}>{t(`nav.${key}`)}</S.MobileSubLink>
          </Link>
        ))}
      </S.MobilePanel>

      <LoginOverlay open={loginOpen && !user} onClose={closeLogin} />
    </>
  );
}
