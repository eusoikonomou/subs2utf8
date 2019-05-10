import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Switch,
  Typography,
  Grid,
} from '@material-ui/core';

const styles = () => ({
  grow: {
    flexGrow: 1,
  },
});

class AppBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment(),
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: moment() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    const {
      onThemeChange,
      isThemeDark,
    } = this.props;
    const { time } = this.state;
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={24} style={{ width: '100%' }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h4" style={{ userSelect: 'none', color: 'white' }}>Subs2UTF-8 Converter</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" className="v-mid" align="center" style={{ height: '100%', color: 'white' }}>
                <strong>{time.format('dddd DD MMM YYYY - HH:mm:ss')}</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div align="right">
                <Brightness7Icon style={{ marginBottom: -8 }} />
                <Switch
                  checked={isThemeDark}
                  onChange={onThemeChange}
                  value
                  color="secondary"
                />
                <Brightness3Icon style={{ marginBottom: -8 }} />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

AppBarMenu.propTypes = {
  onThemeChange: PropTypes.func.isRequired,
  isThemeDark: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AppBarMenu);
