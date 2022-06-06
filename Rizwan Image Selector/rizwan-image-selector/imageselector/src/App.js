import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [picture, setpicture] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setpicture({
      ...picture,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  const [isSucces, setSuccess] = useState(null);
  const submit = async () => {
    const formdata = new FormData();
    formdata.append("avatar", picture.file);
    axios
      .post("http://localhost:5000", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === 1) {
          setSuccess("Image upload successfully");
        }
      });
  };

  return (
    <div className="container mr-60">
      <h3 className="text-white">Rizwan Image Selector</h3>

      <div className="formdesign">
        {isSucces !== null ? <h4> {isSucces} </h4> : null}
        <div className="form-row">
          <label className="text-white">Select Your Image :</label>
          <input
            type="file"
            className="form-control"
            name="upload_file"
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="form-row">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={() => submit()}
          >
            Show
          </button>
        </div> */}
      </div>

      {picture.filepreview !== null ? (
        <img
          className="previewimg"
          src={picture.filepreview}
          alt="UploadImage"
        />
      ) : null}
    </div>
  );
}
export default App;
