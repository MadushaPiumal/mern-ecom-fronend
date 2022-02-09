import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  Box,
  Typography,
  Button,
  ListItem,
  withStyles,
} from "@material-ui/core";

import UploadService from "../services/upload-files.service";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      isError: false,
      fileInfos: [],
    };
  }

  state = {
    imageUrl: null,
    imageAlt: null,
  };

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
          isError: false,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
          isError: true,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  handleImageUpload = () => {
    // get the first input element with the type of file,
    const imageFile = document.querySelector('input[type="file"]');
    // destructure the files array from the resulting object
    const files = imageFile.files;
    // log the result to the console
    console.log("Image file", files[0]);

    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "y5sw55jv");
    const options = {
      method: "POST",
      body: formData,
    };

    return fetch(
      "https://api.Cloudinary.com/v1_1/m-sonasu/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    const { imageUrl, imageAlt } = this.state;
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      isError,
    } = this.state;

    return (
      <div className="mg20">
        {currentFile && (
          <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`${progress}%`}</Typography>
            </Box>
          </Box>
        )}

        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: "none" }}
            type="file"
            onChange={this.selectFile}
          />
          <Button className="btn-choose" variant="outlined" component="span">
            Choose Files
          </Button>
        </label>
        <div className="file-name">
          {selectedFiles && selectedFiles.length > 0
            ? selectedFiles[0].name
            : null}
        </div>
        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!selectedFiles}
          onClick={this.handleImageUpload}
        >
          Upload
        </Button>

        <Typography
          variant="subtitle2"
          className={`upload-message ${isError ? "error" : ""}`}
        >
          {message}
        </Typography>

        {/* <Typography variant="h6" className="list-header">
          List of Files
          </Typography>
        <ul className="list-group">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <ListItem
                divider
                key={index}>
                <a href={file.url}>{file.name}</a>
              </ListItem>
            ))}
        </ul> */}
        <div>
          <section className="right-side">
            <p>The resulting image will be displayed here</p>
            {imageUrl && (
              <img src={imageUrl} alt={imageAlt} className="displayed-image" />
            )}
          </section>
        </div>
      </div>
    );
  }
}
