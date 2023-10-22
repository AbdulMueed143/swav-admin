import React from 'react';
import { Paper, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import Header from '../Header';
import Footer from '../Footer';
import { theme, useStyle } from './styles';
export default function MaterialLayout(props) {
  const { children } = props;
  const classes = useStyle();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> <Header />
      <div className={classes.root}>
        <Paper className={classes.paper}>{children}</Paper>
      </div>
      <Footer />
    </ThemeProvider>
  );
}