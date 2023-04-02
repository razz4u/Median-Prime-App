import React, { useState } from 'react';
import { TextField, Button, Typography, Box, AppBar, Toolbar, Alert } from '@mui/material';
import { Container } from '@mui/system';

const UserInput = () => {
    const [n, setN] = useState('');
    const [median, setMedian] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [errMsg, setErrorMsg] = useState('')

    const handleNChange = e => {
        const value = e.target.value;
        setN(value);
        setIsDisabled(value === '' || isNaN(value) || !Number.isInteger(Number(value)));
        if (!Number.isInteger(Number(value))) {
            setErrorMsg("Please enter a positive integer.")
        }else {
            setErrorMsg('');
          }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/api/medianprime/${n}`)
            .then((res) => res.json())
            .then((data) => setMedian(data.join(' ')))
            .catch((error) => setMedian(`Error: ${error.message}`));
    };

    return (
        <div>
            <Box sx={{ display: "flex", width: '100%', marginBottom: 10 }}>
                <AppBar position="relative" color='primary' width='100%'>
                    <Toolbar sx={{ width: '100%' }}>
                        <Typography variant="h4" component="div">
                            Median Prime App
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container >
                <Typography variant="h4" sx={{
                    padding: 2,
                    backgroundColor: "#E0E0E0",
                    borderRadius: 2,
                    width: '50%'
                }}>Find Median Prime Number(s)</Typography>
                <div sx={{ backgroundColor: "#E0E0E0" }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Enter a number"
                            variant="outlined"
                            type="text"
                            value={n}
                            onChange={handleNChange}
                            style={{ marginRight: 2, width: '50%', align: "center", marginTop: 10 }}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{
                                display: "block",
                                marginTop: 2
                            }}
                            disabled={isDisabled}>
                            Find Median
                        </Button>
                    </form>
                    {errMsg && (
                        <Alert severity="error" style={{ marginTop: 10 }}>
                            {errMsg}
                        </Alert>
                    )}
                </div>

                {median !== null && (
                    <Typography variant="h6" style={{ padding: 10, marginTop: '20px', backgroundColor: "#EEEEEE", borderRadius: 2, width: '50%' }}>
                        {median}
                    </Typography>
                )}

            </Container>
        </div>

    );
}

export default UserInput;
