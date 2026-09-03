import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const HeaderBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 10px 20px;
  background-color: #ffffff;
  pointer-events: auto;

  ${theme.media.mobile} {
    padding: 10px 10px;
    gap: 4px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
`;

export const Brand = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 8px;
  border-radius: 5px;
  font-weight: 700;
  color: #000;
  letter-spacing: -0.01em;
  white-space: nowrap;
  line-height: 1.6;
`;

export const NavGroup = styled.nav`
  display: flex;
  align-items: center;
  gap: 3px;
  height: 30px;
  padding: 3px;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.45);
`;

export const NavList = styled.nav`
  display: flex;
  align-items: center;
  gap: 3px;

  ${theme.media.mobile} {
    display: none;
  }
`;

export const NavLink = styled('span', {
  shouldForwardProp: (prop) => prop !== 'active',
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 3px;
  background: ${(props) => (props.active ? '#ffffff' : 'transparent')};
  font-weight: 400;
  color: ${(props) => (props.active ? '#000000' : '#a0a0a0')};
  letter-spacing: -0.01em;
  line-height: 1.6;
  cursor: pointer;
  border: none;
  font-family: inherit;
  white-space: nowrap;

  ${theme.media.mobile} {
    padding: 0 6px;
  }

  &:hover {
    color: #000000;
  }
`;

export const ArchiveWrap = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const ArchiveMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 120px;
  padding: 6px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ArchiveItem = styled('span', {
  shouldForwardProp: (prop) => prop !== 'active',
})`
  padding: 8px 10px;
  border-radius: 4px;
  font-weight: ${(props) => (props.active ? 600 : 400)};
  color: ${(props) => (props.active ? '#111' : '#555')};
  background: ${(props) => (props.active ? '#f3f3f3' : 'transparent')};

  &:hover {
    background: #f6f6f6;
    color: #111;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const LangButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  min-width: 36px;
  padding: 0 8px;
  border: none;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.45);
  font-weight: 400;
  letter-spacing: -0.01em;
  color: #000;
  cursor: pointer;
  font-family: inherit;
  line-height: 1.6;

  &:hover {
    background: rgba(227, 227, 227, 0.7);
  }
`;

export const IconButton = styled.button`
  width: 30px;
  height: 30px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.45);
  color: #222;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 12px;
    height: auto;
    display: block;
  }

  &:hover {
    background: rgba(227, 227, 227, 0.7);
  }
`;

export const MenuToggle = styled.button`
  display: none;
`;

export const MobilePanel = styled.div`
  display: none;
`;

export const MobileLink = styled.span`
  padding: 12px 4px;
  font-weight: ${(props) => (props.active ? 700 : 500)};
  color: ${(props) => (props.active ? '#111' : '#555')};
`;

export const MobileSubLink = styled.span`
  padding: 8px 4px 8px 16px;
  font-weight: ${(props) => (props.active ? 700 : 400)};
  color: ${(props) => (props.active ? '#111' : '#777')};
`;

export const MapToggleButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 500;
  opacity: 0.8;
  background: #999;
  color: white;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  font-family: var(--font-gothic);
  position: fixed;
  bottom: 20px;
  left: 28px;
  z-index: 5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  ${theme.media.mobile} {
    padding: 10px 14px;
    border-radius: 25px;
    left: unset;
    right: 20px;
    bottom: 20px;
  }
`;

export const SwitchTrack = styled.div`
  position: relative;
  width: 20px;
  height: 40px;
  background: ${(props) =>
    props.isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)'};
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const SwitchThumb = styled.div`
  position: absolute;
  top: ${(props) => (props.isActive ? '22px' : '2px')};
  left: 1px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: ${(props) => (props.isActive ? 'scale(1.1)' : 'scale(1)')};
`;

export const SwitchText = styled.span`
  font-weight: 600;
  color: ${(props) => (props.isActive ? 'white' : '#444')};
  white-space: nowrap;
  transition: all 0.3s ease;
`;
