

const getMedianPrimes = (n) => {
    if(!Number.isInteger(n)){
        throw new Error("Incorrect input type")
    }
    const primes =  getPrimes(n)
    const medianprime =  getMedian(primes)
    return medianprime      
}

function getPrimes(n){
    let isPrime = new Array(n+1).fill(true);

    for(let i = 2; i*i<=n; i++){
        if(isPrime[i]){
            for (let j = i*i; j<=n; j += i){
                isPrime[j] = false;
            }
        }
    }

    let primes = []
    for(let i = 2; i<=n; i++){
        if(isPrime[i]) {
            primes.push(i);
        }
    }
    return primes
}

function getMedian(primes){
    let median =[];
    if(primes.length === 0){
        return []
    }
    if(primes.length % 2 === 0){
        let mid = primes.length/2
        median.push(primes[mid-1])
        median.push(primes[mid])
    } else {
        median.push(primes[Math.floor(primes.length/2)])
    }

    return median
}

export default getMedianPrimes;
