import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline,
  Grid,
  Typography,
} from '@material-ui/core';
import AppBarMenu from '../Components/AppBarMenu';
import Dropzone from '../Components/Dropzone';

const themes = {
  dark: createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      type: 'dark',
    },
  }),
  light: createMuiTheme({
    typography: {
      useNextVariants: true,
    },
    palette: {
      type: 'light',
    },
  }),
};

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

class App extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isThemeDark: true,
    };
  }

  handleThemeChange = (e) => {
    this.setState({ isThemeDark: e.target.checked });
  }

  render() {
    const { classes } = this.props;
    const { isThemeDark } = this.state;
    return (
      <MuiThemeProvider theme={themes[isThemeDark ? 'dark' : 'light']}>
        <CssBaseline />
        <AppBarMenu
          onThemeChange={this.handleThemeChange}
          isThemeDark={isThemeDark}
        />
        <Grid container className={classes.root} spacing={16} style={{ width: '100%', padding: 8 }}>
          <Grid item style={{ width: '100%' }} xs={12} sm={12}>
            <Typography align="center">Welcome to Subs2UTF-8 Converter</Typography>
          </Grid>
          <Grid item style={{ width: '100%' }} xs={12}>
            <Dropzone />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
