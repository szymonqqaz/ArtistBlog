import React, { useContext } from 'react';
import { Link } from 'gatsby';
import propTypes from 'prop-types';

import loupeSvg from 'images/loupe.svg';

import DeviceViewContext from 'context/DeviceViewContext';
import SearchViewContext from 'context/SearchViewContext';

import Logo from 'components/Logo';
import SwitchThemeButton from 'components/SwitchThemeButton';

import {
  LogoWrapper,
  MainWrapper,
  MenuWrapper,
  MenuItems,
  Line,
  SearchIcon,
  SearchWrapper,
} from './styles';

const menuElements = [
  {
    title: 'Posty',
    link: '/posts',
  },
  {
    title: 'Sztuka',
    link: '/images',
  },
  {
    title: 'Kontakt',
    link: '/contact',
  },
];

const TopBarDesktop = ({ deviceSettings }) => {
  const deviceContext = useContext(DeviceViewContext);
  const searchViewContext = useContext(SearchViewContext);
  const { setIsSearchViewOpen } = searchViewContext;

  let marginForLogo = null;
  let marginLeft = null;

  const device = deviceSettings || deviceContext;

  if (device.deviceType === 'smallDesktop') {
    marginForLogo =
      (device.width - 968) / 2 <= 305
        ? 50
        : ((device.width - 968) / 2 - 202) / 2;
  } else if (device.deviceType === 'largeDesktop') {
    marginLeft = (device.width - 968) / 2;
  }

  return (
    <MainWrapper>
      {deviceContext.deviceType !== '' && (
        <>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <LogoWrapper marginWidth={marginForLogo}>
              <Logo />
            </LogoWrapper>
          </Link>
          <MenuWrapper>
            {menuElements.map(({ title, link }) => (
              <MenuItems key={link} marginleftsize={marginLeft} to={link}>
                {title}
              </MenuItems>
            ))}
            <Line />
            <SearchWrapper onClick={() => setIsSearchViewOpen(true)}>
              <SearchIcon src={loupeSvg} alt="search" />
            </SearchWrapper>
            <SwitchThemeButton />
          </MenuWrapper>
        </>
      )}
    </MainWrapper>
  );
};

TopBarDesktop.propTypes = {
  deviceSettings: propTypes.objectOf({
    width: propTypes.number,
    deviceType: propTypes.string,
  }),
};

TopBarDesktop.defaultProps = {
  deviceSettings: null,
};

export default TopBarDesktop;
