const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const { catchErrors } = require("../handlers/errorHandlers");

// Do work here
router.get("/", catchErrors(storeController.getStores));
router.get("/stores", catchErrors(storeController.getStores));

router.get("/add", storeController.addStore);
router.post("/add", storeController.addStore);
router.post("/add/:id", catchErrors(storeController.updateStores));
router.get("/stores/:id/edit", catchErrors(storeController.editStores));

module.exports = router;
