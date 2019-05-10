import React from 'react';
import PropTypes from 'prop-types';
import './Dropzone.css';
import {
  Typography, withStyles, List, ListItem, Fab, Grid, Button,
} from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';

const utf8 = require('utf8');
// const legacy = require('legacy-encoding');
// const detectCharacterEncoding = require('detect-character-encoding');

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
    console.log(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const buffer = new TextEncoder('utf-8').encode(event.target.result);
      console.log(buffer);
      console.log(buffer.toString());
    };
    reader.readAsArrayBuffer(file);
    // const buffer = Buffer.from(reader.readAsText(file));
    // console.log(buffer);
    // console.log(typeof buffer);
    // console.log(buffer.isEncoding('utf8'));
    // const originalEncoding = detectCharacterEncoding(buffer);
    // legacy.decode(buffer, originalEncoding.encoding, { 'mode': 'fatal' });
    // console.log(`Encoding successfully changed from ${originalEncoding.encoding} to ${detectCharacterEncoding(buffer).encoding}.`);
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
