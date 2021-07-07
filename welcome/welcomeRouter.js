const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
	res.status(200).json({
        site_endpoints: process.env.SITE_ENDPOINTS,
		message: `Welcome ${process.env.COHORT}`,
		fun_fact_i_found_online: process.env.FUN_FACT || "I have no fun facts right now.",
	})
})

module.exports = router
