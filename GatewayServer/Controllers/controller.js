const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const monthNames = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];

exports.dataRetrieve = async (req, res) => {
  console.log("entered data retrieval service");
  const { radar, date, user_id } = req.body;
  const day = date["date"];
  let mon = date["month"];
  const month = monthNames.indexOf(mon.toLowerCase()) + 1;
  const year = date["year"];
  // write code to retrieve day, month and year from date.
  //write code to refresh the url to get the dataretrieval service with radar, day, month and year.
  url = process.env.DATA_RETRIEVE_URL;
  url +=
    "/dataretrieval/" +
    radar +
    "/" +
    day +
    "/" +
    month +
    "/" +
    year +
    "/" +
    user_id;
  axiosResponse = await axios
    .get(url)
    .then(response => {
      // console.log(response);
      console.log(response.data);
      // write code to call the java session post method.
      payload = {
        sessionId: response.data["sessionId"],
        userId: user_id,
        createdDate: "",
        status: ""
      };
      javaURL = process.env.SESSION_MGMT_URL + "/addActivity";
      javaResponse = axios
        .post(javaURL, payload)
        .then(response => {
          console.log(response.data);
          return response.data;
        })
        .catch(error => {
          console.log(error);
        });
      return response;
    })
    .catch(error => {
      console.log(error);
    });

  res.status(200).json(axiosResponse.data["sessionId"]);
};

exports.realtime = async (req, res) => {
  console.log("Entered realtime service");
  const { city, state } = req.body;
  realtimeURL = process.env.REALTIME_URL + "/realtime/" + city + "/" + state;
  realtimeResponse = await axios
    .get(realtimeURL)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
  res.status(200).json(realtimeResponse);
};

exports.activityHelper = async (req, res) => {};

exports.activityRetrieve = async (req, res) => {
  const { user_id } = req.body;
  console.log(user_id);
  activityListURL =
    process.env.SESSION_MGMT_URL + "/findAllActivities/" + user_id;
  activityList = await axios
    .get(activityListURL)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return [];
    });
  if (activityList != null) {
    res.status(200).json(activityList);
  } else {
    res.status(500).json("No activity list");
  }
};

exports.getActivity = async (req, res) => {
  console.log("Inside get activity service");
  const { user_id, session_id } = req.body;
  singleActivityURL =
    process.env.SESSION_MGMT_URL + "/findBySessionId/" + session_id;
  activity = await axios
    .get(singleActivityURL)
    .then(response => {
      // console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return [];
    });
  if (activity != null) {
    res.status(200).json(activity);
  } else {
    res.status(500);
  }
};
