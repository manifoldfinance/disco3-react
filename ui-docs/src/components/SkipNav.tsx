import '@reach/skip-nav/styles.css';

import {
  SkipNavContent as ReachSkipNavContent,
  SkipNavLink as ReachSkipNavLink,
  SkipNavLinkProps,
} from '@reach/skip-nav';

import { Box } from 'disco-web3';
import { vars } from 'disco-web3/css';

export const SkipNavLink = ({ children, ...rest }: SkipNavLinkProps) => {
  return (
    <Box
      as={ReachSkipNavLink}
      {...rest}
      style={{
        background: vars.colors.accent,
        color: vars.colors.accentText,
        fontFamily: vars.fonts.sans,
      }}
    >
      {children}
    </Box>
  );
};

export const SkipNavContent = ReachSkipNavContent;
