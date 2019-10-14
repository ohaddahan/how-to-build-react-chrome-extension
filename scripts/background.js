/*global chrome*/
// https://developer.chrome.com/extensions/runtime
import axios from 'axios';
function axiosGet(request, sender, sendResponse) {
  let url = `https://postman-echo.com/get`;
  try {
    axios.get(url, {
      params: request.params
    })
      .then(function (response) {
        console.log("axiosGet response: ", response);
        sendResponse(response);
      })
      .catch(function (error) {
        console.log("axiosGet error: ", error);
        // sendResponse(error);
      })
  } catch (error) {
    console.log("axiosGet: ", error);
    throw new Error(error.message);
  }
}

function axiosPost(request, sender, sendResponse) {
  let url = `https://postman-echo.com/post`;
  try {
    axios.post(url, {
      params: request.params
    })
      .then(function (response) {
        console.log("axiosPost response: ", response);
        sendResponse(response);
      })
      .catch(function (error) {
        console.log("axiosPost error: ", error);
        // sendResponse(error);
      })
  } catch (error) {
    console.log("axiosPost: ", error);
    throw new Error(error.message);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Starting onMessage");
  if (request.type === "GET") {
    axiosGet(request, sender, sendResponse);
  } else if (request.type === "POST") {
    axiosPost(request, sender, sendResponse);
  }
  return true;
});
