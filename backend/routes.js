const express = require("express");
const router = express.Router();

// Static cloud data
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

// CRUD data
let providers = [
  { id: 1, name: "AWS EC2", model: "IaaS", region: "Global" },
  { id: 2, name: "Heroku", model: "PaaS", region: "USA" },
  { id: 3, name: "Gmail", model: "SaaS", region: "Global" }
];

/* -------- CLOUD ROUTES -------- */
router.get("/cloud", (req, res) => {
  res.json(cloudData);
});

router.get("/cloud/:type", (req, res) => {
  const type = req.params.type;
  res.json(detailedCloudData[type]);
});

/* -------- PROVIDERS CRUD -------- */
router.get("/providers", (req, res) => {
  res.json(providers);
});

router.post("/providers", (req, res) => {
  const newProvider = {
    id: Date.now(),
    name: req.body.name,
    model: req.body.model,
    region: req.body.region
  };
  providers.push(newProvider);
  res.json(newProvider);
});

router.put("/providers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  providers = providers.map(p =>
    p.id === id ? { ...p, ...req.body } : p
  );
  res.json({ message: "Updated" });
});

router.delete("/providers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  providers = providers.filter(p => p.id !== id);
  res.json({ message: "Deleted" });
});

module.exports = router;
