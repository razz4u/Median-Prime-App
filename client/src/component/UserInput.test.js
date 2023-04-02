import { render, screen, fireEvent } from '@testing-library/react';
import { assert } from 'chai';
import React from 'react';
import UserInput from './UserInput';
import sinon from 'sinon';


describe('UserInput', () => {
    let server;
    beforeEach(() => {
        server = sinon.createFakeServer();
    });

    afterEach(() => {
        server.restore();
    });

    it('should display an error message when the input is a float', () => {
        render(<UserInput />);
        const input = screen.getByLabelText('Enter a number');
        fireEvent.change(input, { target: { value: '3.14' } });
        assert.equal(screen.getByText('Please enter a positive integer.').textContent, 'Please enter a positive integer.');
    });

    it('should display an error message when the input is a string', () => {
        render(<UserInput />);
        const input = screen.getByLabelText('Enter a number');
        fireEvent.change(input, { target: { value: 'abc' } });
        assert.equal(screen.getByText('Please enter a positive integer.').textContent, 'Please enter a positive integer.');
    });

    it('should get valid response when the input is a number', async() => {
        server.respondWith('GET', `http://localhost:3000/api/medianprime/10`,
            [200,
                { 'Content-Type': 'application/json' },
                JSON.stringify([3, 5])
            ]);
        render(<UserInput />);
        const input = screen.getByLabelText('Enter a number');
        const button = screen.getByText('Find Median');
    
        fireEvent.change(input, { target: { value: '10' } });
        fireEvent.click(button);
        server.respond();
        
        const responseText = await screen.findByText('3 5');
        const responseStatusCode = server.firstRequest.status;

        assert.equal(responseText.textContent, '3 5');
        assert.equal(responseStatusCode, 200);
    });

});
