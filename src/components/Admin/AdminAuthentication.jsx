import React from 'react';
import { getAllAdministrators } from '../../handlers/AdminAPIHandler';
import { Card, CardContent, Typography, Button } from '@mui/material';

const loginButtonStyle = {
	textAlign: "center",
	width: "100%",
	minWidth: "200px",
	height: "75px",
	backgroundColor: "#007bff",
	color: "white",
	fontWeight: 600,
	fontSize: "1.2rem",
	mb: 1,
	"&:hover": {
		backgroundColor: "#0056b3",
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

const withAdminAuth = (WrappedComponent) => {
    return (props) => {
        const [administrators, setAdministrators] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            getAllAdministrators(setAdministrators);
            setLoading(false);
        }, []);

        const user = JSON.parse(localStorage.getItem('user'));

        if (loading) {
            return <div>Loading...</div>;
        }

        let errorMessage = "";
        if (!user) {
            errorMessage = "You must be logged in to view this page.";
        } else if (!administrators.map(admin => admin.user.id).includes(user.id)) {
            errorMessage = "You are not authorized to view this page. Please log in with an administrator account to access this page.";
        }

        if (errorMessage) {
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
                            <Typography 
                                variant="h1"
                                sx={headerStyle}
                            >
                                Unauthorized!
                            </Typography>
                            
                            <Typography 
                                variant="body1"
                                sx={paragraphStyle}
                            >
                                {errorMessage}
                            </Typography>
                            
                            <Button 
                                sx={loginButtonStyle}
                                href="/login">
                                Log In
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAdminAuth;
