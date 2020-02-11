const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

exports.dataRetrieve = async (req, res) => {
  console.log("entered service");
  const { day, month, year, radar, user_id } = req.body;
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
      return javaResponse;
    })
    .catch(error => {
      console.log(error);
    });

  res.status(200).json(axiosResponse);
};

exports.realtime = async (req, res) => {
  console.log("Entered realtime service");
  const { city, state } = req.body;
  realtimeURL = process.env.REALTIME_URL + "/realtime/" + city + "/" + state;
  realtimeResponse = await axios
    .get(realtimeURL)
    .then(response => {
      // console.log(response.data);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
  // console.log("hi");
  // console.log(realtimeResponse);
  res.status(200).json(realtimeResponse);
};

exports.activityHelper = async (req, res) => {};

exports.activityRetrieve = async (req, res) => {
  const { user_id } = req.body;
  activityListURL =
    process.env.SESSION_MGMT_URL + "/findAllActivities/" + user_id;
  activityList = await axios
    .get(activityListURL)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      return json("Error getting activities");
    });
  if (activityList != "Error getting activities") {
    res.status(200).json(activityList);
  } else {
    res.status(500).json("activityList");
  }
};

exports.getActivity = async (req, res) => {
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
      // return json("Error getting activity");
    });
  if (activity != "Error getting activity") {
    res.status(200).json(activity);
  } else {
    res.status(500);
  }
};
