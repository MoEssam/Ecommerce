import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import M from 'materialize-css'
import { useHistory } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const history = useHistory()
    const classes = useStyles();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, SetPassword] = useState("")
    const PostData = () => {
        fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    return M.toast({ html: 'No toast', classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: 'I am toast!', classes: "#43a047 green darken-1" })
                    history.push('/SignIn')

                }
            })
    }


    return (

        // <div className="mycard">
        //     <div className="card auth-card input-field">
        //         <h2>Instagram</h2>
        //         <form>
        //             <input
        //                 type="text"
        //                 placeholder="name"
        //                 value={name}
        //                 onChange={(e) => setName(e.target.value)}
        //             />
        //             <input
        //                 type="text"
        //                 placeholder="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //             />
        //             <input
        //                 type="password"
        //                 placeholder="password"
        //                 autoComplete="true"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //             <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
        //                 onClick={() => PostData()}
        //             >
        //                 Signup
        //     </button>
        //             <h5>
        //                 <Link to="/SignIn">Already have an account ?</Link>
        //             </h5>
        //         </form>
        //     </div>
        // </div>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                // required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="true"
                                value={password}
                                onChange={(e) => SetPassword(e.target.value)}
                            />

                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => PostData()}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="SignIn" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
};

export default SignUp


