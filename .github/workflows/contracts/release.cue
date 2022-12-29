schemaVersion: "v1"
materials: [
	{ type: "CONTAINER_IMAGE", name: "frontend", output: true, },
	// Software Bill of Materials to be extracted from the created container image
	{ type: "SBOM_CYCLONEDX_JSON", name: "frontend-sbom" },
]
runner: type: "GITHUB_ACTION"
