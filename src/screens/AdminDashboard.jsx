import { Button, ButtonGroup, Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";

const buttonGroupStyle = {
	display: "flex",
	justifyContent: "space-around",
	flexWrap: "wrap",
	boxShadow: "none",
	gap: 1,
	width: "100%",
};

const buttonStyle = {
	textAlign: "center",
	width: "calc(33.33% - 8px)",
	minWidth: "200px",
	height: "75px",
	mb: 1,
	"&:hover": {
		backgroundColor: "#0056b3",
	},
	"@media (max-width: 600px)": {
		width: "100%",
	},
};

const headerStyle = {
	fontWeight: 600,
	fontSize: "2rem",
	mb: 2,
};

const paragraphStyle = {
	fontSize: "1.2rem",
	lineHeight: 1.6,
	color: "text.secondary",
	marginBottom: "1rem",
};

const AdminDashboard = () => {
	return (
		<div
			className="container"
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "60vh",
			}}
		>
			<Card>
				<CardContent>
					<Typography variant="h1" sx={headerStyle}>
						Admin Dashboard
					</Typography>

					<Typography variant="body1" sx={paragraphStyle}>
						Welcome to the <strong>Admin Dashboard</strong> page! From this page, you
						can manage the following all of the data contained
						within this application. This includes but is not
						limited to the creation, deletion and updating of job
						postings, job applications, users, hiring managers, and
						administrators.
					</Typography>

					<ButtonGroup
						variant="contained"
						aria-label="Admin Navigation Buttons"
						sx={buttonGroupStyle}
					>
						<Button sx={buttonStyle} href="/admin/administrator">
							Administrator
						</Button>
						<Button sx={buttonStyle} href="/admin/candidates">
							Candidates
						</Button>
						<Button sx={buttonStyle} href="/admin/hiringManagers">
							Hiring Managers
						</Button>
						<Button sx={buttonStyle} href="/admin/jobApplications">
							Job Applications
						</Button>
						<Button sx={buttonStyle} href="/admin/jobListings">
							Job Listings
						</Button>
						<Button sx={buttonStyle} href="/admin/users">
							Users
						</Button>
					</ButtonGroup>
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminDashboard;
