import React from 'react';
import PropTypes from 'prop-types';
import './Dropzone.css';
import {
  Typography, withStyles, List, ListItem, Fab, Grid, Button,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

const detect = require('charset-detector');
const legacy = require('legacy-encoding');

const styles = () => ({
  grow: {
    flexGrow: 1,
  },
});

class Dropzone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: [],
    };
  }

  onFilesChange = (evt) => {
    const { files } = evt.target;
    this.setState({ uploadedFiles: Array.from(files) });
  }

  reset = () => {
    this.setState({ uploadedFiles: [] });
  }

  onDownloadFile = file => () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      let buffer = Buffer.from(event.target.result);
      const possibleEncodings = detect(buffer);
      const encoding = possibleEncodings
        .find(enc => enc.confidence === Math.max(...possibleEncodings
          .map(possibleEncoding => possibleEncoding.confidence)));
      buffer = legacy.decode(buffer, encoding.charsetName, { mode: 'fatal' });
      const blob = new Blob([buffer.toString()], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);

      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute('download', file.name);
      tempLink.click();

      this.href = url;
      this.target = '_blank';

      // target filename
      this.download = file.name;
    };
    reader.readAsArrayBuffer(file);
  }

  render() {
    const { uploadedFiles } = this.state;
    const { classes } = this.props;
    if (uploadedFiles.length === 0) {
      return (
        <form
          encType="multipart/form-data"
          noValidate={uploadedFiles.length === 0}
        >
          <div>
            <Typography variant="h3" align="center">Upload .srt files</Typography>
          </div>
          <br />
          <div className="dropbox">
            <input
              type="file"
              multiple
              onChange={this.onFilesChange}
              accept=".srt"
              className="input-file"
            />
            <p>
              Drag your file(s) here to begin
              <br />
              or click to browse
            </p>
          </div>
        </form>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h3" align="center">Uploaded Files</Typography>
        <br />
        <List align="center">
          {uploadedFiles.map((uploadedFile, index) => (
            <ListItem key={`uploadedFile_${uploadedFile.name + index}`}>
              <Grid container style={{ justifyContent: 'center' }}>
                <Grid item xs={12} sm={3}>
                  <Typography>{`Name: ${uploadedFile.name}`}</Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Fab
                    size="small"
                    aria-label="Delete"
                    className={classes.fab}
                    onClick={this.onDownloadFile(uploadedFile)}
                  >
                    <CloudDownload />
                  </Fab>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <br />
        <Button variant="contained" className={classes.button} color="primary" onClick={this.reset}>Cancel</Button>
      </div>
    );
  }
}

Dropzone.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dropzone);
