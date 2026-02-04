const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// BASIC DATA
const cloudData = [
  {
    type: "IaaS",
    description:
      "Infrastructure as a Service provides virtualized computing resources over the internet.",
    examples: ["AWS EC2", "Google Compute Engine"]
  },
  {
    type: "PaaS",
    description:
      "Platform as a Service provides a platform for developers to build and deploy applications.",
    examples: ["Heroku", "Render"]
  },
  {
    type: "SaaS",
    description:
      "Software as a Service delivers software applications over the internet.",
    examples: ["Gmail", "Google Drive"]
  }
];

// DETAILED DATA
const detailedCloudData = {
  IaaS: {
    features: ["Virtual Machines", "Storage", "Networking"],
    users: "System administrators and IT teams"
  },
  PaaS: {
    features: ["Application Runtime", "Development Tools", "Auto Scaling"],
    users: "Application developers"
  },
  SaaS: {
    features: ["Web-based Access", "No Installation", "Subscription Based"],
    users: "End users"
  }
};

// ENDPOINT 1: BASIC INFO
app.get("/api/cloud", (req, res) => {
  res.json(cloudData);
});

// ENDPOINT 2: DETAILS
app.get("/api/cloud/:type", (req, res) => {
  const type = req.params.type;
  res.json(detailedCloudData[type]);
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
